"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Truck, ShieldCheck } from "lucide-react";

// Mock Data (In real app, fetch from API)
const PRODUCTS = {
    "1": {
        id: "1",
        name: "Midnight Oud",
        price: 129.00,
        description: "A mysterious and captivating fragrance that embodies the essence of the night. Rich oud notes blend seamlessly with velvety rose and warm amber to create a scent that is both powerful and elegant.",
        notes: { top: "Bergamot, Saffron", heart: "Rose, Oud", base: "Amber, Musk" },
        images: ["/images/p1.jpg"]
    },
    "2": { id: "2", name: "Royal Rose", price: 149.00, description: "An ode to the queen of flowers.", notes: { top: "Peony", heart: "Rose", base: "Musk" }, images: ["/images/p2.jpg"] },
    // Add more mock data as needed
};

export default function ProductPage() {
    const params = useParams();
    const id = params.id as string;
    const product = PRODUCTS[id as keyof typeof PRODUCTS] || PRODUCTS["1"]; // Fallback to first product

    const [quantity, setQuantity] = useState(1);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="aspect-[3/4] bg-white/5 relative overflow-hidden rounded-sm"
                >
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                        <span className="uppercase tracking-widest">Product Image</span>
                    </div>
                </motion.div>

                {/* Details Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif text-cream-100 mb-4">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-2xl text-gold-400">${product.price.toFixed(2)}</span>
                            <div className="flex text-gold-400">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-lg font-light">
                            {product.description}
                        </p>
                    </div>

                    {/* Notes */}
                    <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-6">
                        <div className="text-center">
                            <h4 className="text-gold-400 text-xs uppercase tracking-widest mb-2">Top Notes</h4>
                            <p className="text-sm text-gray-300">{product.notes.top}</p>
                        </div>
                        <div className="text-center border-x border-white/10">
                            <h4 className="text-gold-400 text-xs uppercase tracking-widest mb-2">Heart Notes</h4>
                            <p className="text-sm text-gray-300">{product.notes.heart}</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-gold-400 text-xs uppercase tracking-widest mb-2">Base Notes</h4>
                            <p className="text-sm text-gray-300">{product.notes.base}</p>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-white/20">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 text-cream-100 min-w-[3rem] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <button className="flex-1 bg-gold-400 text-black py-3 px-8 font-medium uppercase tracking-widest hover:bg-gold-300 transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-3">
                            <Truck className="w-5 h-5 text-gold-400" />
                            <span>Free Shipping over $200</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-gold-400" />
                            <span>Authenticity Guaranteed</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
