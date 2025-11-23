"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

const ADS = [
    {
        id: 1,
        title: "Royal Arrival",
        subtitle: "Experience The New Collection",
        image: "/royal-rose.jpg",
        offer: "15% OFF",
        description: "Unlock an exclusive discount on your first purchase when you join our elite members club.",
        buttonText: "Unlock 15% Off"
    },
    {
        id: 2,
        title: "Summer Breeze",
        subtitle: "Freshness Redefined",
        image: "/azure-dreams.jpg",
        offer: "Free Shipping",
        description: "Enjoy complimentary shipping on all orders over ₹5000. Limited time summer offer.",
        buttonText: "Shop Summer Scents"
    },
    {
        id: 3,
        title: "Midnight Mystery",
        subtitle: "Dark & Sensual",
        image: "/midnight-oud.jpg",
        offer: "Buy 1 Get 1 50% Off",
        description: "Purchase any Oud Collection perfume and get the second one at half price.",
        buttonText: "Explore Oud"
    }
];

export function PromotionalPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentAdIndex, setCurrentAdIndex] = useState(0);

    useEffect(() => {
        // Determine which ad to show
        const lastAdIndex = localStorage.getItem("lastAdIndex");
        let nextIndex = 0;

        if (lastAdIndex !== null) {
            nextIndex = (parseInt(lastAdIndex) + 1) % ADS.length;
        }

        setCurrentAdIndex(nextIndex);
        localStorage.setItem("lastAdIndex", nextIndex.toString());

        // Show popup after a small delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    const ad = ADS[currentAdIndex];

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative w-full max-w-4xl bg-black border border-gold-400/30 shadow-2xl overflow-hidden flex flex-col md:flex-row rounded-lg"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-20 p-2 text-white/60 hover:text-gold-400 transition-colors bg-black/20 rounded-full backdrop-blur-md"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Image Section */}
                        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                            <Image
                                src={ad.image}
                                alt={ad.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r" />

                            {/* Badge */}
                            <div className="absolute top-6 left-6 bg-gold-400 text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
                                Limited Time
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-center md:text-left bg-zinc-900/90">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="text-3xl md:text-4xl font-serif text-gold-400 mb-2">
                                    {ad.title}
                                </h2>
                                <p className="text-white/60 uppercase tracking-[0.2em] text-sm mb-6">
                                    {ad.subtitle}
                                </p>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-gray-300 mb-8 leading-relaxed font-light"
                            >
                                <span className="text-white font-medium block mb-2 text-lg">{ad.offer}</span>
                                {ad.description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-4"
                            >
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400 transition-colors"
                                    />
                                </div>
                                <button className="w-full bg-gold-400 text-black font-semibold py-3 uppercase tracking-widest hover:bg-gold-300 transition-colors">
                                    {ad.buttonText}
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-wider mt-4"
                                >
                                    No thanks, I prefer full price
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
