"use client";

import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";

const NEW_ARRIVALS = [
    { id: "5", name: "Ethereal Mist", price: 135.00, image: "/images/featured-sauvage.jpg", category: "Fresh Collection" },
    { id: "6", name: "Crimson Spice", price: 155.00, image: "/images/featured-sauvage.jpg", category: "Spice Collection" },
    { id: "7", name: "Oceanic Breeze", price: 125.00, image: "/images/featured-sauvage.jpg", category: "Aqua Collection" },
    { id: "8", name: "Noir Leather", price: 175.00, image: "/images/featured-sauvage.jpg", category: "Signature Collection" },
];

export default function NewArrivalsPage() {
    return (
        <div className="min-h-screen bg-black text-cream-100 pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif text-gold-400 mb-6"
                    >
                        New Arrivals
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "6rem" }}
                        transition={{ delay: 0.3 }}
                        className="h-[1px] bg-cream-100 mx-auto mb-6"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-300 max-w-2xl mx-auto"
                    >
                        Explore our latest masterpieces. Freshly crafted scents that define modern luxury.
                    </motion.p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {NEW_ARRIVALS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
