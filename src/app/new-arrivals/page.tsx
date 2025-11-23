"use client";

import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageMarquee } from "@/components/ImageMarquee";

const MARQUEE_IMAGES = [
    "/azure-dreams.jpg",
    "/imperial-citrus.jpg",
    "/ocean-mist.jpg",
    "/spiced-ember.jpg",
    "/perfume-1.jpg",
    "/perfume-2.jpg",
    "/perfume-3.jpg",
    "/perfume-4.jpg",
];

const NEW_ARRIVALS = [
    {
        id: "5",
        name: "Ethereal Mist",
        price: 13500,
        image: "/perfume-1.jpg",
        category: "Fresh Collection",
        backstory: "Born from the morning dew on high-altitude blossoms. This scent captures the fleeting moment of dawn, offering a crisp, airy freshness that lingers like a memory."
    },
    {
        id: "6",
        name: "Crimson Spice",
        price: 15500,
        image: "/perfume-2.jpg",
        category: "Spice Collection",
        backstory: "A fiery tribute to the ancient spice routes. Warm saffron and fiery cinnamon dance with deep red roses, creating a fragrance that is both comforting and dangerously seductive."
    },
    {
        id: "7",
        name: "Oceanic Breeze",
        price: 12500,
        image: "/perfume-3.jpg",
        category: "Aqua Collection",
        backstory: "The spirit of the open sea. Salty air, driftwood, and a hint of citrus combine to transport you to a secluded coastline where the waves meet the sky."
    },
    {
        id: "8",
        name: "Noir Leather",
        price: 17500,
        image: "/noir-leather.jpg",
        category: "Signature Collection",
        backstory: "Dark, mysterious, and undeniably masculine. Rich leather accords blend with smoky tobacco and vetiver for a scent that commands attention and respect."
    },
];

export default function NewArrivalsPage() {
    const { addToCart } = useCart();
    const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

    const handleAddToCart = (product: typeof NEW_ARRIVALS[0]) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
        });

        setAddedItems(prev => new Set(prev).add(product.id));
        setTimeout(() => {
            setAddedItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(product.id);
                return newSet;
            });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black text-cream-100">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/azure-dreams.jpg"
                    alt="New Arrivals Hero"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black" />

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-serif text-gold-400 mb-6 drop-shadow-lg"
                    >
                        New Arrivals
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light drop-shadow-md"
                    >
                        Explore our latest masterpieces. Freshly crafted scents that define modern luxury.
                    </motion.p>
                </div>
            </div>

            <ImageMarquee images={MARQUEE_IMAGES} note="Fresh from the Atelier" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-10">
                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {NEW_ARRIVALS.map((product, index) => {
                        const isAdded = addedItems.has(product.id);

                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-gold-400/50 transition-all duration-500 flex flex-col md:flex-row h-full"
                            >
                                {/* Image Section */}
                                <div className="w-full md:w-1/2 relative aspect-[3/4] md:aspect-auto overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />
                                </div>

                                {/* Content Section */}
                                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-serif text-gold-400 pointer-events-none">
                                        0{index + 1}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-gold-400 text-xs uppercase tracking-[0.2em] mb-2">{product.category}</p>
                                            <h3 className="text-3xl font-serif text-cream-100 mb-2">{product.name}</h3>
                                            <p className="text-2xl text-white font-light">₹{product.price.toLocaleString()}</p>
                                        </div>

                                        <div className="w-12 h-[1px] bg-gold-400/50" />

                                        <div className="space-y-4">
                                            <h4 className="text-sm font-bold text-gold-400 uppercase tracking-widest">The Backstory</h4>
                                            <p className="text-gray-300 leading-relaxed italic font-light">
                                                "{product.backstory}"
                                            </p>
                                        </div>

                                        <div className="pt-6 flex flex-col gap-3">
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className={`w-full py-3 px-6 font-medium uppercase tracking-widest transition-all duration-300 text-sm ${isAdded
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gold-400 text-black hover:bg-gold-300"
                                                    }`}
                                            >
                                                {isAdded ? "Added" : "Add to Cart"}
                                            </button>
                                            <Link
                                                href={`/product/${product.id}`}
                                                className="w-full py-3 px-6 border border-white/20 text-white font-medium uppercase tracking-widest hover:bg-white/10 transition-all duration-300 text-center text-sm"
                                            >
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
