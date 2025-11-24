"use client";

import { useCart } from "@/contexts/CartContext";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";

interface CartDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
    const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
    const total = getTotalPrice();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Cart Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-black border-l border-white/10 z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="text-xl font-serif text-gold-400">Shopping Cart</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <p className="text-gray-400 mb-4">Your cart is empty</p>
                                    <Link
                                        href="/shop"
                                        onClick={onClose}
                                        className="px-6 py-3 bg-gold-400 text-black font-medium uppercase tracking-widest hover:bg-gold-300 transition-colors"
                                    >
                                        Start Shopping
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            className="bg-white/5 p-4 rounded-sm border border-white/10"
                                        >
                                            <div className="flex gap-4">
                                                {/* Product Image */}
                                                <div className="relative w-20 h-20 bg-gray-800 flex-shrink-0 overflow-hidden rounded-sm">
                                                    <NextImage
                                                        src={item.product.images?.[0] || "/images/placeholder.jpg"}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-serif text-cream-100 truncate">
                                                        {item.product.name}
                                                    </h3>
                                                    <p className="text-xs text-gold-400 mt-1">
                                                        {item.product.category?.name || 'Perfume'}
                                                    </p>
                                                    <p className="text-sm text-white mt-2">
                                                        ₹{item.product.price.toLocaleString()}
                                                    </p>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-2 mt-3">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            className="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-sm text-white w-8 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={() => removeFromCart(item.product.id)}
                                                            className="ml-auto text-red-400 hover:text-red-300 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Clear Cart Button */}
                                    {cart.length > 0 && (
                                        <button
                                            onClick={clearCart}
                                            className="w-full py-2 text-sm text-red-400 hover:text-red-300 transition-colors border border-red-400/30 hover:border-red-400/50"
                                        >
                                            Clear Cart
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="border-t border-white/10 p-6 space-y-4">
                                {/* Total */}
                                <div className="flex items-center justify-between text-lg">
                                    <span className="text-gray-300">Total:</span>
                                    <span className="text-gold-400 font-serif">₹{total.toLocaleString()}</span>
                                </div>

                                {/* Checkout Button */}
                                <button className="w-full py-4 bg-gold-400 text-black font-medium uppercase tracking-widest hover:bg-gold-300 transition-colors">
                                    Checkout
                                </button>

                                {/* Continue Shopping */}
                                <Link
                                    href="/shop"
                                    onClick={onClose}
                                    className="block text-center text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
