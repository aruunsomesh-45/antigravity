"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    tags?: string[];
}

export function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation();

        addToCart({
            product: {
                id: product.id,
                name: product.name,
                slug: product.id,
                price: product.price,
                images: [product.image],
                description: product.category,
                stock: 100,
                category: {
                    id: product.category,
                    name: product.category,
                    slug: product.category.toLowerCase().replace(/\s+/g, '-'),
                },
            },
        });

        // Show feedback
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    // Map tags to colors
    const getTagColor = (tag: string) => {
        switch (tag.toLowerCase()) {
            case "new arrival":
                return "bg-green-600/90";
            case "on sale":
                return "bg-red-600/90";
            case "royal":
                return "bg-purple-600/90";
            case "elegant":
                return "bg-gold-600/90";
            case "new launch":
                return "bg-blue-600/90";
            default:
                return "bg-gray-600/90";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative"
        >
            <Link href={`/product/${product.id}`} suppressHydrationWarning>
                <div className="aspect-[3/4] relative overflow-hidden bg-white/5">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10" />

                    {/* Tags */}
                    {product.tags && product.tags.length > 0 && (
                        <div className="absolute top-3 left-3 z-20">
                            <span
                                className={`${getTagColor(product.tags[0])} text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider backdrop-blur-sm`}
                            >
                                {product.tags[0]}
                            </span>
                        </div>
                    )}

                    {/* Product Image */}
                    {!imageError ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
                            <span className="text-xs uppercase tracking-widest">Product Image</span>
                        </div>
                    )}

                    {/* Quick Add Button */}
                    <button
                        onClick={handleAddToCart}
                        className={`absolute bottom-0 left-0 right-0 py-4 translate-y-full group-hover:translate-y-0 transition-all duration-300 font-medium uppercase tracking-widest z-20 ${isAdded
                            ? "bg-green-500 text-white"
                            : "bg-gold-400 text-black hover:bg-gold-300"
                            }`}
                        suppressHydrationWarning
                    >
                        {isAdded ? "Added to Cart ✓" : "Add to Cart"}
                    </button>
                </div>

                <div className="mt-4 text-center space-y-1">
                    <p className="text-xs text-gold-400 uppercase tracking-widest">{product.category}</p>
                    <h3 className="text-lg font-serif text-cream-100 group-hover:text-gold-400 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-gray-400">₹{product.price.toLocaleString('en-IN')}</p>
                </div>
            </Link>
        </motion.div>
    );
}
