"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ImageMarqueeProps {
    images: string[];
    note?: string;
}

export function ImageMarquee({ images, note }: ImageMarqueeProps) {
    // Ensure we have enough images for a smooth loop
    const displayImages = images.length < 10 ? [...images, ...images, ...images] : [...images, ...images];

    return (
        <div className="w-full py-16 overflow-hidden bg-black border-y border-white/10">
            {note && (
                <div className="text-center mb-10">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-gold-400 uppercase tracking-[0.3em] text-sm font-medium"
                    >
                        {note}
                    </motion.p>
                </div>
            )}

            <div className="flex">
                <motion.div
                    className="flex gap-8 pr-8"
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        ease: "linear",
                        duration: 60,
                        repeat: Infinity,
                    }}
                >
                    {displayImages.map((src, index) => (
                        <div
                            key={index}
                            className="relative w-64 h-80 flex-shrink-0 rounded-sm overflow-hidden border border-white/10 group grayscale hover:grayscale-0 transition-all duration-500"
                        >
                            <Image
                                src={src}
                                alt={`Marquee Image ${index}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
