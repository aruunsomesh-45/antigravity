"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const DISCOVER_ITEMS = [
    {
        id: 1,
        title: "Floral Elegance",
        image: "/perfume-1.jpg",
        link: "/shop?category=Floral Collection",
        description: "Bloom with grace"
    },
    {
        id: 2,
        title: "Golden Luxury",
        image: "/golden-amber.jpg",
        link: "/shop?category=Oud Collection",
        description: "The essence of royalty"
    },
    {
        id: 3,
        title: "Pure Serenity",
        image: "/perfume-4.jpg",
        link: "/shop?category=Fresh Collection",
        description: "Calm your senses"
    },
    {
        id: 4,
        title: "Midnight Mystery",
        image: "/midnight-oud.jpg",
        link: "/shop?category=Signature Collection",
        description: "Embrace the night"
    },
    {
        id: 5,
        title: "Ocean Breeze",
        image: "/ocean-mist.jpg",
        link: "/shop?category=Fresh Collection",
        description: "Fresh as the sea"
    },
    {
        id: 6,
        title: "Spiced Warmth",
        image: "/spiced-ember.jpg",
        link: "/shop?category=Spice Collection",
        description: "Ignite your passion"
    },
    {
        id: 7,
        title: "Velvet Touch",
        image: "/velvet-santal.jpg",
        link: "/shop?category=Signature Collection",
        description: "Soft sophistication"
    },
    {
        id: 8,
        title: "Royal Rose",
        image: "/royal-rose.jpg",
        link: "/shop?category=Floral Collection",
        description: "Queen of flowers"
    },
    {
        id: 9,
        title: "Azure Dreams",
        image: "/azure-dreams.jpg",
        link: "/shop?category=Fresh Collection",
        description: "Dream in blue"
    },
    {
        id: 10,
        title: "Black Orchid",
        image: "/black-orchid.jpg",
        link: "/shop?category=Oriental Collection",
        description: "Dark & mysterious"
    },
    {
        id: 11,
        title: "Crimson Velvet",
        image: "/crimson-velvet.jpg",
        link: "/shop?category=Floral Collection",
        description: "Passionate red"
    },
    {
        id: 12,
        title: "Desert Rose",
        image: "/desert-rose.jpg",
        link: "/shop?category=Oriental Collection",
        description: "Sands of time"
    },
    {
        id: 13,
        title: "Mystic Musk",
        image: "/mystic-musk.jpg",
        link: "/shop?category=Signature Collection",
        description: "Enchanting aura"
    },
    {
        id: 14,
        title: "Noir Leather",
        image: "/noir-leather.jpg",
        link: "/shop?category=Signature Collection",
        description: "Bold & rebellious"
    },
    {
        id: 15,
        title: "Platinum Essence",
        image: "/platinum-essence.jpg",
        link: "/shop?category=Oud Collection",
        description: "Rare & precious"
    }
];

// Duplicate items for seamless infinite scroll
const CAROUSEL_ITEMS = [...DISCOVER_ITEMS, ...DISCOVER_ITEMS];

export function DiscoverSection() {
    return (
        <section className="w-full overflow-hidden py-20 bg-black relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-serif text-cream-100 mb-4"
                    >
                        Discover Your Perfume
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: "6rem" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="h-[1px] bg-gold-400/50 w-24 mx-auto"
                    />
                </div>
            </div>

            {/* Infinite Marquee Container */}
            <div className="relative w-full">
                <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

                <motion.div
                    className="flex gap-6 md:gap-8 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40, // Adjust speed here (higher = slower)
                    }}
                    whileHover={{ animationPlayState: "paused" }} // Pause on hover
                >
                    {CAROUSEL_ITEMS.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="relative min-w-[300px] md:min-w-[400px] h-[500px] md:h-[600px] group rounded-none overflow-hidden cursor-pointer"
                        >
                            {/* Image Container with Grayscale Effect */}
                            <div className="absolute inset-0 transition-all duration-700 filter grayscale group-hover:grayscale-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-gold-400 text-xs tracking-[0.2em] uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Collection
                                </span>
                                <h3 className="text-3xl font-serif text-white mb-2">{item.title}</h3>
                                <p className="text-white/60 text-sm mb-8 max-w-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                    {item.description}
                                </p>

                                <Link
                                    href={item.link}
                                    className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-1 w-fit hover:border-gold-400 hover:text-gold-400 transition-colors"
                                >
                                    <span className="text-sm uppercase tracking-wider">Discover</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
