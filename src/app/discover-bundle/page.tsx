"use client";

import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Package, Gift, Sparkles, Heart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

// Bundle data
const BUNDLES = [
    {
        id: "bundle-1",
        name: "The Gentleman's Collection",
        description: "A curated trio of our most sophisticated men's fragrances",
        price: 38000,
        originalPrice: 45000,
        savings: 7000,
        image: "/midnight-oud.jpg",
        perfumes: [
            { id: "1", name: "Midnight Oud", price: 10500, image: "/midnight-oud.jpg", category: "Signature Collection", notes: "Oud, Rose, Amber" },
            { id: "7", name: "Noir Leather", price: 16000, image: "/noir-leather.jpg", category: "Signature Collection", notes: "Leather, Tobacco, Vetiver" },
            { id: "4", name: "Velvet Santal", price: 12500, image: "/velvet-santal.jpg", category: "Signature Collection", notes: "Sandalwood, Cedar, Leather" },
        ],
        icon: Package,
        gradient: "from-blue-900 to-purple-900",
    },
    {
        id: "bundle-2",
        name: "Floral Romance",
        description: "Three enchanting floral fragrances for the elegant woman",
        price: 35000,
        originalPrice: 41000,
        savings: 6000,
        image: "/perfume-2.jpg",
        perfumes: [
            { id: "2", name: "Royal Rose", price: 12000, image: "/royal-rose.jpg", category: "Floral Collection", notes: "Rose, Peony, Musk" },
            { id: "9", name: "Crimson Velvet", price: 14000, image: "/crimson-velvet.jpg", category: "Floral Collection", notes: "Red Rose, Patchouli, Vanilla" },
            { id: "15", name: "Desert Rose", price: 14500, image: "/desert-rose.jpg", category: "Oriental Collection", notes: "Damask Rose, Myrrh, Frankincense" },
        ],
        icon: Heart,
        gradient: "from-pink-900 to-rose-900",
    },
    {
        id: "bundle-3",
        name: "Oud Luxury Trio",
        description: "Experience the richness of premium oud in three masterpieces",
        price: 45000,
        originalPrice: 53000,
        savings: 8000,
        image: "/perfume-14.jpg",
        perfumes: [
            { id: "10", name: "Platinum Essence", price: 17500, image: "/platinum-essence.jpg", category: "Oud Collection", notes: "Oud, Saffron, Ambergris" },
            { id: "3", name: "Golden Amber", price: 15000, image: "/golden-amber.jpg", category: "Oud Collection", notes: "Amber, Vanilla, Sandalwood" },
            { id: "1", name: "Midnight Oud", price: 10500, image: "/midnight-oud.jpg", category: "Signature Collection", notes: "Oud, Rose, Amber" },
        ],
        icon: Sparkles,
        gradient: "from-amber-900 to-yellow-900",
    },
    {
        id: "bundle-4",
        name: "Fresh & Free",
        description: "Light, vibrant scents perfect for everyday wear",
        price: 28000,
        originalPrice: 33000,
        savings: 5000,
        image: "/perfume-12.jpg",
        perfumes: [
            { id: "8", name: "Azure Dreams", price: 11500, image: "/azure-dreams.jpg", category: "Fresh Collection", notes: "Sea Salt, Jasmine, Driftwood" },
            { id: "5", name: "Imperial Citrus", price: 9500, image: "/perfume-1.jpg", category: "Fresh Collection", notes: "Bergamot, Lemon, Neroli" },
            { id: "13", name: "Ocean Mist", price: 10800, image: "/ocean-mist.jpg", category: "Fresh Collection", notes: "Marine Accord, Mint, Cedar" },
        ],
        icon: Package,
        gradient: "from-cyan-900 to-blue-900",
    },
    {
        id: "bundle-5",
        name: "Gift of Elegance",
        description: "The perfect gift set featuring our bestselling fragrances",
        price: 42000,
        originalPrice: 49800,
        savings: 7800,
        image: "/perfume-8.jpg",
        perfumes: [
            { id: "14", name: "Black Orchid", price: 16800, image: "/black-orchid.jpg", category: "Oriental Collection", notes: "Black Orchid, Plum, Dark Chocolate" },
            { id: "7", name: "Noir Leather", price: 16000, image: "/noir-leather.jpg", category: "Signature Collection", notes: "Leather, Tobacco, Vetiver" },
            { id: "2", name: "Royal Rose", price: 12000, image: "/royal-rose.jpg", category: "Floral Collection", notes: "Rose, Peony, Musk" },
        ],
        icon: Gift,
        gradient: "from-purple-900 to-fuchsia-900",
    },
    {
        id: "bundle-6",
        name: "Signature Classics",
        description: "Timeless fragrances that define sophistication",
        price: 37500,
        originalPrice: 44000,
        savings: 6500,
        image: "/perfume-6.jpg",
        perfumes: [
            { id: "12", name: "Spiced Ember", price: 12500, image: "/spiced-ember.jpg", category: "Spice Collection", notes: "Cardamom, Cinnamon, Incense" },
            { id: "11", name: "Silk Gardenia", price: 13000, image: "/perfume-4.jpg", category: "Floral Collection", notes: "Gardenia, White Tea, Cashmere" },
            { id: "6", name: "Mystic Musk", price: 11000, image: "/mystic-musk.jpg", category: "Signature Collection", notes: "Musk, Iris, Tonka" },
        ],
        icon: Sparkles,
        gradient: "from-orange-900 to-red-900",
    },
];

export default function DiscoverBundlePage() {
    const { addToCart } = useCart();
    const [addedBundles, setAddedBundles] = useState<Record<string, boolean>>({});

    const handleAddBundle = (bundle: typeof BUNDLES[0]) => {
        // Add all perfumes in the bundle to cart
        bundle.perfumes.forEach((perfume) => {
            addToCart({
                product: {
                    id: perfume.id,
                    name: perfume.name,
                    slug: perfume.id,
                    price: perfume.price,
                    images: [perfume.image],
                    description: `${perfume.category} - ${perfume.notes}`,
                    stock: 100,
                },
            });
        });

        // Show feedback
        setAddedBundles(prev => ({ ...prev, [bundle.id]: true }));
        setTimeout(() => {
            setAddedBundles(prev => ({ ...prev, [bundle.id]: false }));
        }, 2000);
    };
    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-900/20 via-black to-purple-900/20" />
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/30 px-4 py-2 rounded-full mb-6">
                            <Package className="w-4 h-4 text-gold-400" />
                            <span className="text-gold-400 text-sm uppercase tracking-widest">Exclusive Bundles</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif text-cream-100 mb-6">
                            Discover Our
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-300 block mt-2">
                                Curated Collections
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Save up to ₹8,000 with our handpicked perfume bundles. Each set tells a unique story.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Bundles Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {BUNDLES.map((bundle, index) => (
                        <motion.div
                            key={bundle.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group bg-gradient-to-br ${bundle.gradient} rounded-2xl overflow-hidden border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300`}
                        >
                            {/* Savings Badge */}
                            <div className="absolute top-4 right-4 z-10 bg-gold-400 text-black px-4 py-2 rounded-full font-bold text-sm">
                                Save ₹{bundle.savings.toLocaleString()}
                            </div>

                            <div className="p-8">
                                {/* Header */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                                        <bundle.icon className="w-6 h-6 text-gold-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-serif text-cream-100 mb-2">{bundle.name}</h2>
                                        <p className="text-gray-300 text-sm">{bundle.description}</p>
                                    </div>
                                </div>

                                {/* Perfumes Grid */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {bundle.perfumes.map((perfume) => (
                                        <div key={perfume.id} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-gold-400/30 transition-all">
                                            <div className="aspect-square relative mb-2 rounded-lg overflow-hidden bg-white/5">
                                                <Image
                                                    src={perfume.image}
                                                    alt={perfume.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <h4 className="text-cream-100 text-xs font-medium truncate">{perfume.name}</h4>
                                            <p className="text-gray-400 text-xs truncate">{perfume.notes.split(",")[0]}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Pricing */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-3xl font-bold text-gold-400">₹{bundle.price.toLocaleString()}</span>
                                            <span className="text-lg text-gray-400 line-through">₹{bundle.originalPrice.toLocaleString()}</span>
                                        </div>
                                        <p className="text-sm text-green-400 mt-1">You save {Math.round((bundle.savings / bundle.originalPrice) * 100)}%</p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={() => handleAddBundle(bundle)}
                                    className={`w-full font-semibold py-4 rounded-xl transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center gap-2 ${addedBundles[bundle.id]
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gold-400 hover:bg-gold-500 text-black'
                                        }`}
                                >
                                    <Gift className="w-5 h-5" />
                                    {addedBundles[bundle.id] ? '✓ Bundle Added!' : 'Add Bundle to Cart'}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-gradient-to-br from-gold-900/20 to-purple-900/20 rounded-2xl border border-gold-400/20 p-8 md:p-12">
                    <h2 className="text-3xl font-serif text-center text-cream-100 mb-8">Why Choose Our Bundles?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-400/10 rounded-full mb-4">
                                <Sparkles className="w-8 h-8 text-gold-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-cream-100 mb-2">Curated by Experts</h3>
                            <p className="text-gray-400">Each bundle is carefully crafted by our fragrance specialists</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-400/10 rounded-full mb-4">
                                <Gift className="w-8 h-8 text-gold-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-cream-100 mb-2">Premium Packaging</h3>
                            <p className="text-gray-400">Beautifully packaged, perfect for gifting or personal indulgence</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-400/10 rounded-full mb-4">
                                <Package className="w-8 h-8 text-gold-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-cream-100 mb-2">Best Value</h3>
                            <p className="text-gray-400">Save up to 15% compared to buying individually</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
