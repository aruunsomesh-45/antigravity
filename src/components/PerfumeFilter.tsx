"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Filter } from "lucide-react";

export interface FilterState {
    priceRange: [number, number];
    collection: string;
    category: string;
    design: string;
}

interface PerfumeFilterProps {
    onFilterChange: (filters: FilterState) => void;
    className?: string;
}

const COLLECTIONS = ["All", "Luxury", "Premium", "Everyday"];
const CATEGORIES = ["Men", "Women", "Kids"];
const DESIGNS = ["All", "Minimal", "Classic", "Modern"];

export function PerfumeFilter({ onFilterChange, className }: PerfumeFilterProps) {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
    const [collection, setCollection] = useState("All");
    const [category, setCategory] = useState<string | null>(null);
    const [design, setDesign] = useState("All");
    const [isOpen, setIsOpen] = useState(false);

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // Debounce filter updates to avoid excessive re-renders
    useEffect(() => {
        const timer = setTimeout(() => {
            onFilterChange({
                priceRange,
                collection,
                category: category || "All",
                design
            });
        }, 300);
        return () => clearTimeout(timer);
    }, [priceRange, collection, category, design, onFilterChange]);

    const handleClearFilters = () => {
        setPriceRange([0, 50000]);
        setCollection("All");
        setCategory(null);
        setDesign("All");
    };

    return (
        <div className={className}>
            {/* Mobile Toggle */}
            <div className="md:hidden mb-4">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    variant="outline"
                    className="w-full flex items-center gap-2"
                >
                    <Filter size={16} />
                    {isOpen ? "Hide Filters" : "Show Filters"}
                </Button>
            </div>

            <AnimatePresence>
                <motion.div
                    initial={false}
                    animate={{ height: isOpen || isDesktop ? "auto" : 0, opacity: isOpen || isDesktop ? 1 : 0 }}
                    className="overflow-hidden md:overflow-visible md:h-auto md:opacity-100"
                >
                    <Card className="p-6 space-y-8 bg-black/40 backdrop-blur-md border-white/10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-serif text-gold-400">Filters</h3>
                            {(category || collection !== "All" || design !== "All" || priceRange[0] > 0 || priceRange[1] < 50000) && (
                                <button
                                    onClick={handleClearFilters}
                                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                                >
                                    <X size={12} /> Clear All
                                </button>
                            )}
                        </div>

                        {/* Price Filter */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm text-gray-300">
                                <span>Price Range</span>
                                <span className="text-gold-400 font-medium">₹{priceRange[0]} - ₹{priceRange[1]}</span>
                            </div>
                            <Slider
                                min={0}
                                max={50000}
                                step={100}
                                value={priceRange}
                                onValueChange={(val) => setPriceRange(val as [number, number])}
                                className="py-4"
                            />
                        </div>

                        {/* Collection Filter */}
                        <div className="space-y-3">
                            <label className="text-sm text-gray-300 block">Collection</label>
                            <div className="relative">
                                <select
                                    value={collection}
                                    onChange={(e) => setCollection(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-cream-100 focus:outline-none focus:border-gold-400 transition-colors appearance-none cursor-pointer hover:bg-white/10"
                                >
                                    {COLLECTIONS.map(c => (
                                        <option key={c} value={c} className="bg-gray-900">{c}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    ▼
                                </div>
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="space-y-3">
                            <label className="text-sm text-gray-300 block">Category</label>
                            <div className="grid grid-cols-3 gap-2">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(category === cat ? null : cat)}
                                        className={`
                                            px-2 py-2 text-xs font-medium rounded-md transition-all duration-200
                                            ${category === cat
                                                ? "bg-gold-400 text-black shadow-[0_0_10px_rgba(250,204,21,0.3)]"
                                                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
                                            }
                                        `}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Design Filter */}
                        <div className="space-y-3">
                            <label className="text-sm text-gray-300 block">Design</label>
                            <div className="relative">
                                <select
                                    value={design}
                                    onChange={(e) => setDesign(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-cream-100 focus:outline-none focus:border-gold-400 transition-colors appearance-none cursor-pointer hover:bg-white/10"
                                >
                                    {DESIGNS.map(d => (
                                        <option key={d} value={d} className="bg-gray-900">{d}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    ▼
                                </div>
                            </div>
                        </div>

                        <Button className="w-full mt-4" onClick={() => {
                            onFilterChange({
                                priceRange,
                                collection,
                                category: category || "All",
                                design
                            });
                        }}>
                            Apply Filters
                        </Button>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
