"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Product type
export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    notes: string;
    gender: string;
    design: string;
}

// All products data
const ALL_PRODUCTS: Product[] = [
    { id: "1", name: "Midnight Oud", price: 10500, image: "/midnight-oud.jpg", category: "Signature Collection", notes: "Oud, Rose, Amber", gender: "Men", design: "Classic" },
    { id: "2", name: "Royal Rose", price: 12000, image: "/royal-rose.jpg", category: "Floral Collection", notes: "Rose, Peony, Musk", gender: "Women", design: "Classic" },
    { id: "3", name: "Golden Amber", price: 15000, image: "/golden-amber-new.jpg", category: "Oud Collection", notes: "Amber, Vanilla, Sandalwood", gender: "Men", design: "Modern" },
    { id: "4", name: "Velvet Santal", price: 12500, image: "/velvet-santal.jpg", category: "Signature Collection", notes: "Sandalwood, Cedar, Leather", gender: "Men", design: "Minimal" },
    { id: "5", name: "Imperial Citrus", price: 9500, image: "/imperial-citrus.jpg", category: "Fresh Collection", notes: "Bergamot, Lemon, Neroli", gender: "Kids", design: "Minimal" },
    { id: "6", name: "Mystic Musk", price: 11000, image: "/mystic-musk.jpg", category: "Signature Collection", notes: "Musk, Iris, Tonka", gender: "Women", design: "Modern" },
    { id: "7", name: "Noir Leather", price: 16000, image: "/noir-leather.jpg", category: "Signature Collection", notes: "Leather, Tobacco, Vetiver", gender: "Men", design: "Classic" },
    { id: "8", name: "Azure Dreams", price: 11500, image: "/azure-dreams.jpg", category: "Fresh Collection", notes: "Sea Salt, Jasmine, Driftwood", gender: "Women", design: "Minimal" },
    { id: "9", name: "Crimson Velvet", price: 14000, image: "/crimson-velvet.jpg", category: "Floral Collection", notes: "Red Rose, Patchouli, Vanilla", gender: "Women", design: "Classic" },
    { id: "10", name: "Platinum Essence", price: 17500, image: "/platinum-essence.jpg", category: "Oud Collection", notes: "Oud, Saffron, Ambergris", gender: "Men", design: "Modern" },
    { id: "11", name: "Silk Gardenia", price: 13000, image: "/silk-gardenia.jpg", category: "Floral Collection", notes: "Gardenia, White Tea, Cashmere", gender: "Women", design: "Minimal" },
    { id: "12", name: "Spiced Ember", price: 12500, image: "/spiced-ember.jpg", category: "Spice Collection", notes: "Cardamom, Cinnamon, Incense", gender: "Men", design: "Classic" },
    { id: "13", name: "Ocean Mist", price: 10800, image: "/ocean-mist.jpg", category: "Fresh Collection", notes: "Marine Accord, Mint, Cedar", gender: "Kids", design: "Modern" },
    { id: "14", name: "Black Orchid", price: 16800, image: "/black-orchid.jpg", category: "Oriental Collection", notes: "Black Orchid, Plum, Dark Chocolate", gender: "Women", design: "Modern" },
    { id: "15", name: "Desert Rose", price: 14500, image: "/desert-rose.jpg", category: "Oriental Collection", notes: "Damask Rose, Myrrh, Frankincense", gender: "Women", design: "Classic" },
];

interface SearchBarProps {
    className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<Product[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);

    // Search logic
    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const searchQuery = query.toLowerCase();
        const filtered = ALL_PRODUCTS.filter((product) => {
            return (
                product.name.toLowerCase().includes(searchQuery) ||
                product.notes.toLowerCase().includes(searchQuery) ||
                product.category.toLowerCase().includes(searchQuery) ||
                product.gender.toLowerCase().includes(searchQuery)
            );
        });

        setResults(filtered);
        setIsOpen(filtered.length > 0);
    }, [query]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClear = () => {
        setQuery("");
        setResults([]);
        setIsOpen(false);
    };

    return (
        <div ref={searchRef} className={cn("relative", className)}>
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query && results.length > 0 && setIsOpen(true)}
                    placeholder="Search perfumes..."
                    className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-lg text-cream-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                    suppressHydrationWarning
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cream-100 transition-colors"
                        suppressHydrationWarning
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
                {isOpen && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 w-full bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto"
                    >
                        <div className="p-2">
                            <div className="text-xs uppercase tracking-wider text-gray-400 px-3 py-2">
                                {results.length} {results.length === 1 ? "Result" : "Results"}
                            </div>
                            {results.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    onClick={() => {
                                        setIsOpen(false);
                                        setQuery("");
                                    }}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                                >
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-cream-100 group-hover:text-gold-400 transition-colors truncate">
                                            {product.name}
                                        </h4>
                                        <p className="text-xs text-gray-400 truncate">
                                            {product.category} • {product.notes.split(",")[0]}
                                        </p>
                                    </div>
                                    <div className="text-sm font-semibold text-gold-400">
                                        ₹{product.price.toLocaleString()}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* View All Link */}
                        <Link
                            href={`/shop?search=${query}`}
                            onClick={() => {
                                setIsOpen(false);
                                setQuery("");
                            }}
                            className="block border-t border-white/10 px-4 py-3 text-sm text-center text-gold-400 hover:bg-white/5 transition-colors"
                        >
                            View All Results
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* No Results */}
            <AnimatePresence>
                {isOpen && query && results.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 w-full bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-6 z-50 text-center"
                    >
                        <p className="text-gray-400">No perfumes found for "{query}"</p>
                        <Link
                            href="/shop"
                            onClick={() => {
                                setIsOpen(false);
                                setQuery("");
                            }}
                            className="inline-block mt-3 text-gold-400 hover:underline text-sm"
                        >
                            Browse All Perfumes
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
