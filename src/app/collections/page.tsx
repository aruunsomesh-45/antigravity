"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const COLLECTIONS = [
    {
        id: "1",
        name: "Signature Collection",
        slug: "signature-collection",
        description: "Our most iconic scents, crafted for the discerning individual.",
        backstory: "Born from the desire to create a scent that defines a legacy. Our master perfumers spent years perfecting the balance of rare ingredients to create a signature that is unmistakably yours.",
        image: "/collection-amouage-white.jpg"
    },
    {
        id: "2",
        name: "Oud Collection",
        slug: "oud-collection",
        description: "Deep, woody, and mysterious. The essence of the Orient.",
        backstory: "A journey to the heart of the Orient. We source the finest Agarwood from sustainable forests in Southeast Asia, aging it to perfection to release its deep, resinous, and spiritual aroma.",
        image: "/collection-woody.jpg"
    },
    {
        id: "3",
        name: "Floral Collection",
        slug: "floral-collection",
        description: "A bouquet of nature's finest blooms, captured in a bottle.",
        backstory: "Inspired by the royal gardens of Europe at full bloom. We hand-pick petals at dawn when their scent is most potent, capturing the ephemeral beauty of nature in every bottle.",
        image: "/collection-chloe.jpg"
    },
    {
        id: "4",
        name: "Royal Combos",
        slug: "royal-combos",
        description: "Exclusive sets curated for the ultimate luxury experience.",
        backstory: "Curated for the elite. These combinations are designed to layer perfectly, creating a unique and personalized scent profile that commands attention and respect.",
        image: "/collection-amouage-stairs.jpg"
    },
];

const CAROUSEL_IMAGES = [
    "/collection-amouage-white.jpg",
    "/collection-woody.jpg",
    "/collection-chloe.jpg",
    "/collection-amouage-stairs.jpg"
];

function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);

    return (
        <div className="relative h-[70vh] w-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={CAROUSEL_IMAGES[currentIndex]}
                        alt="Collection Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-5xl md:text-7xl font-serif text-cream-100 mb-6"
                >
                    The Collections
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-xl text-gray-200 max-w-2xl font-light tracking-wide"
                >
                    Discover the stories behind our masterpieces
                </motion.p>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition-all z-20"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition-all z-20"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {CAROUSEL_IMAGES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-gold-400" : "bg-white/50 hover:bg-white"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function CollectionsPage() {
    return (
        <div className="min-h-screen bg-black">
            <HeroCarousel />

            {/* Collections Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 gap-20">
                    {COLLECTIONS.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
                        >
                            {/* Image Side */}
                            <div className="w-full md:w-1/2 relative h-[500px] group overflow-hidden rounded-lg shadow-2xl shadow-gold-900/10">
                                <Image
                                    src={collection.image}
                                    alt={collection.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                                <h2 className="text-4xl md:text-5xl font-serif text-gold-400">
                                    {collection.name}
                                </h2>
                                <div className="w-24 h-[1px] bg-white/20 mx-auto md:mx-0" />
                                <p className="text-xl text-cream-100 font-light italic">
                                    "{collection.description}"
                                </p>
                                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                                    <h3 className="text-sm uppercase tracking-widest text-gold-400 mb-3">The Backstory</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {collection.backstory}
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <Link
                                        href={collection.slug === "royal-combos" ? "/royal-combos" : `/shop?collection=${collection.name}`}
                                        className="inline-block px-8 py-4 bg-transparent border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-semibold"
                                    >
                                        Explore Collection
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
