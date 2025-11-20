import Image from "next/image";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";

const FEATURED_PRODUCTS = [
  { id: "1", name: "Midnight Oud", price: 129.00, image: "/images/p1.jpg", category: "Signature Collection" },
  { id: "2", name: "Royal Rose", price: 149.00, image: "/images/p2.jpg", category: "Floral Collection" },
  { id: "3", name: "Golden Amber", price: 189.00, image: "/images/p3.jpg", category: "Oud Collection" },
  { id: "4", name: "Velvet Santal", price: 159.00, image: "/images/p4.jpg", category: "Signature Collection" },
];

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      <Hero />

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-cream-100 mb-4">Featured Collections</h2>
          <div className="w-24 h-[1px] bg-gold-400 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Royal Combos Highlight */}
      <section className="bg-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-gold-400 mb-6">Royal Combos</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10">
            Curated sets for the ultimate fragrance experience. Perfect for gifting or personal indulgence.
          </p>
          <a href="/collections/royal-combos" className="inline-block border-b border-gold-400 text-gold-400 pb-1 hover:text-cream-100 hover:border-cream-100 transition-colors">
            Explore Sets
          </a>
        </div>
      </section>
    </div>
  );
}
