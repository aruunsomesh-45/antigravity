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

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        // Check if we're in the browser environment
        if (typeof window === "undefined") return;

        try {
            const savedCart = localStorage.getItem("zoku-cart");
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                // Validate that parsedCart is an array
                if (Array.isArray(parsedCart)) {
                    setCart(parsedCart);
                }
            }
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
            localStorage.setItem("zoku-cart", JSON.stringify(cart));
        } catch (error) {
            console.error("Error saving cart to localStorage:", error);
        }
    }, [cart, isLoaded]);

    const addToCart = (item: Omit<CartItem, "quantity">) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.product.id === item.product.id);

            if (existingItem) {
                // Item already in cart, increase quantity
                return prevCart.map((cartItem) =>
                    cartItem.product.id === item.product.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // New item, add to cart with quantity 1
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.product.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.product.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + Number(item.product.price) * item.quantity, 0);
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
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
