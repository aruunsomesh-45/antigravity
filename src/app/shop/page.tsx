"use client";

import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock Data
const PRODUCTS = [
    { id: "1", name: "Midnight Oud", price: 129.00, image: "/images/p1.jpg", category: "Signature Collection", notes: "Oud, Rose, Amber" },
    { id: "2", name: "Royal Rose", price: 149.00, image: "/images/p2.jpg", category: "Floral Collection", notes: "Rose, Peony, Musk" },
    { id: "3", name: "Golden Amber", price: 189.00, image: "/images/p3.jpg", category: "Oud Collection", notes: "Amber, Vanilla, Sandalwood" },
    { id: "4", name: "Velvet Santal", price: 159.00, image: "/images/p4.jpg", category: "Signature Collection", notes: "Sandalwood, Cedar, Leather" },
    { id: "5", name: "Imperial Citrus", price: 119.00, image: "/images/p5.jpg", category: "Fresh Collection", notes: "Bergamot, Lemon, Neroli" },
    { id: "6", name: "Mystic Musk", price: 139.00, image: "/images/p6.jpg", category: "Signature Collection", notes: "Musk, Iris, Tonka" },
];

const FILTERS = {
    categories: ["All", "Signature Collection", "Oud Collection", "Floral Collection", "Fresh Collection"],
    price: ["All", "Under $100", "$100 - $150", "$150+"],
};

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [activePrice, setActivePrice] = useState("All");

    const filteredProducts = PRODUCTS.filter(product => {
        if (activeCategory !== "All" && product.category !== activeCategory) return false;
        // Price logic would go here
        return true;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 space-y-8">
                    <div>
                        <h3 className="text-lg font-serif text-gold-400 mb-4">Collections</h3>
                        <ul className="space-y-2">
                            {FILTERS.categories.map((category) => (
                                <li key={category}>
                                    <button
                                        onClick={() => setActiveCategory(category)}
                                        className={cn(
                                            "text-sm transition-colors hover:text-gold-400 text-left w-full",
                                            activeCategory === category ? "text-gold-400 font-medium" : "text-gray-400"
                                        )}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-serif text-gold-400 mb-4">Price</h3>
                        <ul className="space-y-2">
                            {FILTERS.price.map((price) => (
                                <li key={price}>
                                    <button
                                        onClick={() => setActivePrice(price)}
                                        className={cn(
                                            "text-sm transition-colors hover:text-gold-400 text-left w-full",
                                            activePrice === price ? "text-gold-400 font-medium" : "text-gray-400"
                                        )}
                                    >
                                        {price}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-serif text-cream-100">Shop All</h1>
                        <span className="text-gray-400 text-sm">{filteredProducts.length} Products</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
