"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export function ProductCard({ product }: { product: Product }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative"
        >
            <Link href={`/product/${product.id}`} suppressHydrationWarning>
                <div className="aspect-[3/4] relative overflow-hidden bg-white/5">
                    {/* Image Placeholder - In real app, use actual images */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10" />
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
                        {/* Replace with Next/Image when real images are available */}
                        <span className="text-xs uppercase tracking-widest">Product Image</span>
                    </div>

                    {/* Quick Add Button */}
                    <button className="absolute bottom-0 left-0 right-0 bg-gold-400 text-black py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-medium uppercase tracking-widest z-20" suppressHydrationWarning>
                        Add to Cart
                    </button>
                </div>

                <div className="mt-4 text-center space-y-1">
                    <p className="text-xs text-gold-400 uppercase tracking-widest">{product.category}</p>
                    <h3 className="text-lg font-serif text-cream-100 group-hover:text-gold-400 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-gray-400">${product.price.toFixed(2)}</p>
                </div>
            </Link>
        </motion.div>
    );
}
