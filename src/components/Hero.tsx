"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Gradient/Image Placeholder */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-600/20 via-black to-black opacity-50" />

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-gold-400 text-sm md:text-base uppercase tracking-[0.3em] mb-4">
                        The Essence of Royalty
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream-100 mb-8 tracking-tight">
                        ZOKU <span className="text-gold-400">PERFUME</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Discover a collection of scents crafted for those who command the room.
                        Timeless elegance, bottled.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/shop"
                            className="px-8 py-4 bg-gold-400 text-black font-medium uppercase tracking-widest hover:bg-gold-300 transition-all duration-300 transform hover:scale-105"
                        >
                            Shop Collection
                        </Link>
                        <Link
                            href="/collections/royal-combos"
                            className="px-8 py-4 border border-gold-400 text-gold-400 font-medium uppercase tracking-widest hover:bg-gold-400/10 transition-all duration-300"
                        >
                            View Royal Combos
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="absolute bottom-10 left-0 right-0 text-center"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-gold-400 to-transparent mx-auto" />
            </motion.div>
        </section>
    );
}
