"use client";

import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import Image from "next/image";
import { ImageMarquee } from "@/components/ImageMarquee";

const MARQUEE_IMAGES = [
    "/midnight-oud.jpg",
    "/images/eclaire-cgi.jpg",
    "/golden-amber-new.jpg",
    "/velvet-santal.jpg",
    "/mystic-musk.jpg",
    "/noir-leather.jpg",
    "/platinum-essence.jpg",
    "/black-orchid.jpg",
];

const COMBOS = [
    {
        id: "combo1",
        name: "The Royal Pair",
        price: 20000,
        image: "/perfume-1.jpg",
        category: "Royal Combo",
        description: "Midnight Oud + Royal Rose",
        backstory: "A union of strength and grace. The deep, resinous notes of Midnight Oud provide a powerful foundation, while Royal Rose adds a velvet-soft floral heart. Together, they create a scent of commanding elegance.",
        savings: 2500
    },
    {
        id: "combo2",
        name: "The Oud Trilogy",
        price: 35000,
        image: "/perfume-3.jpg",
        category: "Royal Combo",
        description: "Midnight Oud + Golden Amber + Mystic Musk",
        backstory: "A journey through the desert's most precious treasures. From the dark intensity of Midnight Oud to the warm glow of Golden Amber and the ethereal touch of Mystic Musk. A complete olfactory wardrobe for the connoisseur.",
        savings: 5000
    },
    {
        id: "combo3",
        name: "The Luxury Collection",
        price: 45000,
        image: "/perfume-4.jpg",
        category: "Royal Combo",
        description: "All 4 Signature Scents",
        backstory: "The ultimate expression of Zoku's artistry. This collection brings together our four most iconic signatures, allowing you to wear a different masterpiece for every mood and occasion.",
        savings: 8000
    },
];

export default function RoyalCombosPage() {
    const { addToCart } = useCart();
    const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
    const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

    const handleAddToCart = (combo: typeof COMBOS[0]) => {
        addToCart({
            id: combo.id,
            name: combo.name,
            price: combo.price,
            image: combo.image,
            category: combo.category,
        });

        // Show feedback
        setAddedItems(prev => new Set(prev).add(combo.id));
        setTimeout(() => {
            setAddedItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(combo.id);
                return newSet;
            });
        }, 2000);
    };

    const handleImageError = (comboId: string) => {
        setImageErrors(prev => new Set(prev).add(comboId));
    };

    return (
        <div className="min-h-screen bg-black text-cream-100">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/collection-amouage-stairs.jpg"
                    alt="Royal Combos Hero"
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
                        Royal Combos
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light drop-shadow-md"
                    >
                        Experience the art of layering with our curated sets.
                        Designed to complement each other, these combinations offer a unique olfactory journey.
                    </motion.p>
                </div>
            </div>

            <ImageMarquee images={MARQUEE_IMAGES} note="The Art of Layering" />

            {/* Combos Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {COMBOS.map((combo, index) => {
                        const isAdded = addedItems.has(combo.id);
                        const hasImageError = imageErrors.has(combo.id);

                        return (
                            <motion.div
                                key={combo.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-sm overflow-hidden hover:border-gold-400/50 transition-all duration-300 group flex flex-col"
                            >
                                {/* Image */}
                                <div className="aspect-[4/3] relative overflow-hidden bg-black/50">
                                    {!hasImageError ? (
                                        <Image
                                            src={combo.image}
                                            alt={combo.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={() => handleImageError(combo.id)}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                                            <span className="uppercase tracking-widest text-sm">Combo Image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                    {/* Savings Badge */}
                                    <div className="absolute top-4 right-4 bg-gold-400 text-black px-3 py-1 text-xs font-bold uppercase tracking-wider">
                                        Save ₹{combo.savings.toLocaleString()}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4 flex-1 flex flex-col">
                                    <div className="text-center space-y-2">
                                        <p className="text-xs text-gold-400 uppercase tracking-widest">{combo.category}</p>
                                        <h3 className="text-2xl font-serif text-cream-100">{combo.name}</h3>
                                        <p className="text-sm text-gray-400 font-medium">{combo.description}</p>
                                        <div className="w-12 h-[1px] bg-white/20 mx-auto my-3" />
                                        <p className="text-sm text-gray-300 italic leading-relaxed">"{combo.backstory}"</p>
                                    </div>

                                    <div className="flex-1" /> {/* Spacer */}

                                    <div className="flex items-center justify-center gap-2 pt-4">
                                        <p className="text-2xl font-bold text-white">₹{combo.price.toLocaleString()}</p>
                                    </div>

                                    <div className="flex flex-col gap-3 mt-4">
                                        <button
                                            onClick={() => handleAddToCart(combo)}
                                            className={`w-full py-3 font-medium uppercase tracking-widest transition-all duration-300 ${isAdded
                                                ? "bg-green-500 text-white"
                                                : "bg-gold-400 text-black hover:bg-gold-300 hover:shadow-lg"
                                                }`}
                                        >
                                            {isAdded ? "Added to Cart ✓" : "Add to Cart"}
                                        </button>
                                        <button className="w-full py-3 border border-white/20 text-white font-medium uppercase tracking-widest hover:bg-white/10 transition-all duration-300">
                                            View Details
                                        </button>
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
