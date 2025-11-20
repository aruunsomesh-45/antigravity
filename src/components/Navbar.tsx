"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 text-cream-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-serif tracking-widest text-gold-400" suppressHydrationWarning>
                            ZOKU
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <NavLink href="/shop">Shop</NavLink>
                            <NavLink href="/collections">Collections</NavLink>
                            <NavLink href="/royal-combos">Royal Combos</NavLink>
                            <NavLink href="/new-arrivals">New Arrivals</NavLink>
                            <NavLink href="/contact">Contact</NavLink>
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center gap-6">
                        <button className="hover:text-gold-400 transition-colors" suppressHydrationWarning>
                            <ShoppingBag className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
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

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-b border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <MobileNavLink href="/shop" onClick={() => setIsOpen(false)}>Shop</MobileNavLink>
                            <MobileNavLink href="/collections" onClick={() => setIsOpen(false)}>Collections</MobileNavLink>
                            <MobileNavLink href="/royal-combos" onClick={() => setIsOpen(false)}>Royal Combos</MobileNavLink>
                            <MobileNavLink href="/new-arrivals" onClick={() => setIsOpen(false)}>New Arrivals</MobileNavLink>
                            <MobileNavLink href="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-sm uppercase tracking-widest hover:text-gold-400 transition-colors duration-300"
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
