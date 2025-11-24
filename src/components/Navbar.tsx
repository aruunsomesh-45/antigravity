"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { CartDropdown } from "./CartDropdown";
import { SearchBar } from "./SearchBar";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { getTotalItems } = useCart();
    const cartCount = getTotalItems();

    return (
        <>
            <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 text-cream-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Left: Logo */}
                        <div className="flex-shrink-0 w-[200px]">
                            <Link href="/" className="text-2xl font-serif tracking-widest text-gold-400" suppressHydrationWarning>
                                ZOKU
                            </Link>
                        </div>

                        {/* Center: Desktop Menu */}
                        <div className="hidden lg:flex items-center justify-center flex-1">
                            <div className="flex items-baseline space-x-8">
                                <NavLink href="/shop">Shop</NavLink>
                                <NavLink href="/collections">Collections</NavLink>
                                <NavLink href="/royal-combos">Royal Combos</NavLink>
                                <NavLink href="/new-arrivals">New Arrivals</NavLink>
                                <NavLink href="/discover-bundle">Discover Bundle</NavLink>
                                <NavLink href="/contact">Contact</NavLink>
                            </div>
                        </div>

                        {/* Right: Search & Icons */}
                        <div className="flex items-center justify-end gap-6 w-[200px]">
                            {/* Desktop Search */}
                            <div className="hidden md:block w-48">
                                <SearchBar />
                            </div>

                            {/* Cart Icon */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative hover:text-gold-400 transition-colors"
                                suppressHydrationWarning
                            >
                                <ShoppingBag className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-gold-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu Toggle */}
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="text-cream-100 hover:text-gold-400 p-2"
                                    suppressHydrationWarning
                                >
                                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-black border-b border-white/10"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {/* Mobile Search Bar */}
                                <div className="px-3 pb-3 md:hidden">
                                    <SearchBar />
                                </div>
                                <MobileNavLink href="/shop" onClick={() => setIsOpen(false)}>Shop</MobileNavLink>
                                <MobileNavLink href="/collections" onClick={() => setIsOpen(false)}>Collections</MobileNavLink>
                                <MobileNavLink href="/royal-combos" onClick={() => setIsOpen(false)}>Royal Combos</MobileNavLink>
                                <MobileNavLink href="/new-arrivals" onClick={() => setIsOpen(false)}>New Arrivals</MobileNavLink>
                                <MobileNavLink href="/discover-bundle" onClick={() => setIsOpen(false)}>Discover Bundle</MobileNavLink>
                                <MobileNavLink href="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Cart Dropdown */}
            <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-xs uppercase tracking-widest hover:text-gold-400 transition-colors duration-300"
            suppressHydrationWarning
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block px-3 py-4 text-base font-medium text-cream-100 hover:text-gold-400 hover:bg-white/5 border-b border-white/5 last:border-0"
            suppressHydrationWarning
        >
            {children}
        </Link>
    );
}
