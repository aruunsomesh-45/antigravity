"use client";

import { ProductCard } from "@/components/ProductCard";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PerfumeFilter, type FilterState } from "@/components/PerfumeFilter";

// Mock Data
const PRODUCTS = [
    { id: "1", name: "Midnight Oud", price: 10500, image: "/midnight-oud.jpg", category: "Signature Collection", notes: "Oud, Rose, Amber", gender: "Men", design: "Classic", tags: ["Royal"] },
    { id: "2", name: "Royal Rose", price: 12000, image: "/images/eclaire-cgi.jpg", category: "Floral Collection", notes: "Rose, Peony, Musk", gender: "Women", design: "Classic", tags: ["Elegant"] },
    { id: "3", name: "Golden Amber", price: 15000, image: "/golden-amber-new.jpg", category: "Oud Collection", notes: "Amber, Vanilla, Sandalwood", gender: "Men", design: "Modern", tags: ["New Launch"] },
    { id: "4", name: "Velvet Santal", price: 12500, image: "/velvet-santal.jpg", category: "Signature Collection", notes: "Sandalwood, Cedar, Leather", gender: "Men", design: "Minimal", tags: ["Elegant"] },
    { id: "5", name: "Imperial Citrus", price: 9500, image: "/imperial-citrus.jpg", category: "Fresh Collection", notes: "Bergamot, Lemon, Neroli", gender: "Kids", design: "Minimal", tags: ["New Arrival"] },
    { id: "6", name: "Mystic Musk", price: 11000, image: "/mystic-musk.jpg", category: "Signature Collection", notes: "Musk, Iris, Tonka", gender: "Women", design: "Modern", tags: ["On Sale"] },
    { id: "7", name: "Noir Leather", price: 16000, image: "/noir-leather.jpg", category: "Signature Collection", notes: "Leather, Tobacco, Vetiver", gender: "Men", design: "Classic", tags: ["Royal"] },
    { id: "8", name: "Azure Dreams", price: 11500, image: "/azure-dreams.jpg", category: "Fresh Collection", notes: "Sea Salt, Jasmine, Driftwood", gender: "Women", design: "Minimal", tags: ["New Arrival"] },
    { id: "9", name: "Crimson Velvet", price: 14000, image: "/crimson-velvet.jpg", category: "Floral Collection", notes: "Red Rose, Patchouli, Vanilla", gender: "Women", design: "Classic", tags: ["Elegant"] },
    { id: "10", name: "Platinum Essence", price: 17500, image: "/platinum-essence.jpg", category: "Oud Collection", notes: "Oud, Saffron, Ambergris", gender: "Men", design: "Modern", tags: ["New Launch"] },
    { id: "11", name: "Silk Gardenia", price: 13000, image: "/silk-gardenia.jpg", category: "Floral Collection", notes: "Gardenia, White Tea, Cashmere", gender: "Women", design: "Minimal", tags: ["Elegant"] },
    { id: "12", name: "Spiced Ember", price: 12500, image: "/spiced-ember.jpg", category: "Spice Collection", notes: "Cardamom, Cinnamon, Incense", gender: "Men", design: "Classic", tags: ["New Arrival"] },
    { id: "13", name: "Ocean Mist", price: 10800, image: "/ocean-mist.jpg", category: "Fresh Collection", notes: "Marine Accord, Mint, Cedar", gender: "Kids", design: "Modern", tags: ["On Sale"] },
    { id: "14", name: "Black Orchid", price: 16800, image: "/black-orchid.jpg", category: "Oriental Collection", notes: "Black Orchid, Plum, Dark Chocolate", gender: "Women", design: "Modern", tags: ["Royal"] },
    { id: "15", name: "Desert Rose", price: 14500, image: "/desert-rose.jpg", category: "Oriental Collection", notes: "Damask Rose, Myrrh, Frankincense", gender: "Women", design: "Classic", tags: ["Elegant"] },
];

// Perfume bottle images for the animated marquee
const PERFUME_IMAGES = [
    "/midnight-oud.jpg",
    "/royal-rose.jpg",
    "/golden-amber-new.jpg",
    "/velvet-santal.jpg",
    "/mystic-musk.jpg",
    "/noir-leather.jpg",
    "/azure-dreams.jpg",
    "/crimson-velvet.jpg",
    "/platinum-essence.jpg",
    "/silk-gardenia.jpg",
    "/black-orchid.jpg",
    "/desert-rose.jpg",
    "/ocean-mist.jpg",
    "/spiced-ember.jpg",
    "/imperial-citrus.jpg",
];

export default function ShopPage() {
    const [filters, setFilters] = useState<FilterState>({
        priceRange: [0, 50000],
        collection: "All",
        category: "All",
        design: "All"
    });

    const filteredProducts = PRODUCTS.filter(product => {
        // Filter by Collection
        if (filters.collection !== "All") {
            // Map "Luxury", "Premium", "Everyday" to actual collections if needed
            // For now, let's assume "Luxury" maps to Signature/Oud, "Premium" to Floral/Oriental, "Everyday" to Fresh/Spice
            // Or simply match exact string if we updated product categories to match.
            // Since product categories are "Signature Collection" etc, and filter is "Luxury" etc., we need a mapping.
            // Let's map for demonstration:
            const luxury = ["Signature Collection", "Oud Collection"];
            const premium = ["Floral Collection", "Oriental Collection"];
            const everyday = ["Fresh Collection", "Spice Collection"];

            if (filters.collection === "Luxury" && !luxury.includes(product.category)) return false;
            if (filters.collection === "Premium" && !premium.includes(product.category)) return false;
            if (filters.collection === "Everyday" && !everyday.includes(product.category)) return false;
        }

        // Filter by Category (Gender)
        if (filters.category !== "All" && product.gender !== filters.category) return false;

        // Filter by Design
        if (filters.design !== "All" && product.design !== filters.design) return false;

        // Filter by Price
        if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;

        return true;
    });

    return (
        <>
            {/* Hero Section */}
            <AnimatedMarqueeHero
                tagline="Discover Luxury Fragrances"
                title={
                    <>
                        Elevate Your Essence
                        <br />
                        with Zoku Perfumes
                    </>
                }
                description="Experience the art of fine perfumery. Our curated collection of luxury fragrances captures elegance, sophistication, and timeless beauty in every bottle."
                ctaText="Explore Collection"
                images={PERFUME_IMAGES}
                className="bg-black"
            />

            {/* Shop Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-72 shrink-0">
                        <div className="sticky top-24">
                            <PerfumeFilter onFilterChange={setFilters} />
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-serif text-cream-100">Shop All</h1>
                            <span className="text-gray-400 text-sm">{filteredProducts.length} Products</span>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={{ ...product, price: product.price }} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-400">
                                <p className="text-lg">No products match your filters.</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-4 text-gold-400 hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
