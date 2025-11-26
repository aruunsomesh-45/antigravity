"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
    description: string;
    stock: number;
    category?: {
        id: string;
        name: string;
        slug: string;
    };
}

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const MAX_CART_SIZE = 50; // Maximum number of unique items
const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        // Check if we're in the browser environment
        if (typeof window === "undefined") return;

        try {
            const savedCart = localStorage.getItem("zoku-cart");
            if (!savedCart) {
                setIsLoaded(true);
                return;
            }

            const parsedCart = JSON.parse(savedCart);

            // Validate structure
            if (!Array.isArray(parsedCart)) {
                throw new Error('Invalid cart format');
            }

            // Validate each item
            const validatedCart = parsedCart.filter(item =>
                item.product?.id &&
                item.product?.price > 0 &&
                item.quantity > 0 &&
                item.quantity <= 100
            ).slice(0, MAX_CART_SIZE);

            setCart(validatedCart);
        } catch (error) {
            console.error("Error loading cart from localStorage:", error);
            // Clear corrupted data
            localStorage.removeItem("zoku-cart");
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        // Only save after initial load and in browser environment
        if (!isLoaded || typeof window === "undefined") return;

        try {
            // Check storage size limit
            const cartString = JSON.stringify(cart);
            const size = new Blob([cartString]).size;

            if (size > MAX_STORAGE_SIZE) {
                console.error("Cart exceeds maximum storage size");
                return;
            }

            localStorage.setItem("zoku-cart", cartString);
        } catch (error) {
            console.error("Error saving cart to localStorage:", error);
        }
    }, [cart, isLoaded]);

    const addToCart = (item: Omit<CartItem, "quantity">) => {
        setCart((prevCart => {
            const existingItem = prevCart.find((cartItem) => cartItem.product.id === item.product.id);

            if (existingItem) {
                // Check stock before adding more
                const newQuantity = existingItem.quantity + 1;

                if (newQuantity > item.product.stock) {
                    // Don't add more than available stock
                    alert(`Cannot add more. Only ${item.product.stock} in stock.`);
                    return prevCart;
                }

                if (newQuantity > 100) {
                    alert(`Maximum quantity per item is 100.`);
                    return prevCart;
                }

                // Item already in cart, increase quantity
                return prevCart.map((cartItem) =>
                    cartItem.product.id === item.product.id
                        ? { ...cartItem, quantity: newQuantity }
                        : cartItem
                );
            } else {
                // Check cart size limit
                if (prevCart.length >= MAX_CART_SIZE) {
                    alert(`Maximum ${MAX_CART_SIZE} different items allowed in cart.`);
                    return prevCart;
                }

                // Check if product is in stock
                if (item.product.stock < 1) {
                    alert(`${item.product.name} is out of stock.`);
                    return prevCart;
                }

                // New item, add to cart with quantity 1
                return [...prevCart, { ...item, quantity: 1 }];
            }
        }));
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.product.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }

        // Validate quantity limits
        if (quantity > 100) {
            alert("Maximum quantity per item is 100.");
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.product.id === id) {
                    // Check stock before updating
                    if (quantity > item.product.stock) {
                        alert(`Cannot add more. Only ${item.product.stock} in stock.`);
                        return item;
                    }
                    return { ...item, quantity };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        // Use proper number calculation
        return cart.reduce((total, item) => {
            const itemTotal = Number(item.product.price) * item.quantity;
            return total + itemTotal;
        }, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalItems,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must use within a CartProvider");
    }
    return context;
}
