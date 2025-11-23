"use client";

import Image from "next/image";
import { Hero } from "@/components/Hero";
import { DiscoverSection } from "@/components/DiscoverSection";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";

const FEATURED_PRODUCTS = [
  { id: "1", name: "Midnight Oud", price: 129.00, image: "/midnight-oud.jpg", category: "Signature Collection" },
  { id: "2", name: "Royal Rose", price: 149.00, image: "/royal-rose.jpg", category: "Floral Collection" },
  { id: "3", name: "Golden Amber", price: 189.00, image: "/golden-amber-new.jpg", category: "Oud Collection" },
  { id: "4", name: "Velvet Santal", price: 159.00, image: "/velvet-santal.jpg", category: "Signature Collection" },
];

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      <Hero />

      <DiscoverSection />

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif text-cream-100 mb-4"
          >
            Featured Collections
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "6rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-24 h-[1px] bg-gold-400 mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Royal Combos Highlight */}
      <section className="bg-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif text-gold-400 mb-6"
          >
            Royal Combos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Curated sets for the ultimate fragrance experience. Perfect for gifting or personal indulgence.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            href="/collections/royal-combos"
            className="inline-block border-b border-gold-400 text-gold-400 pb-1 hover:text-cream-100 hover:border-cream-100 transition-colors"
            suppressHydrationWarning
          >
            Explore Sets
          </motion.a>
        </div>
      </section>
    </div>
  );
}
