"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Truck, ShieldCheck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

// Mock Data (In real app, fetch from API)
const PRODUCTS = {
    "1": {
        id: "1",
        name: "Midnight Oud",
        price: 10500,
        description: "A mysterious and captivating fragrance that embodies the essence of the night. Rich oud notes blend seamlessly with velvety rose and warm amber to create a scent that is both powerful and elegant.",
        notes: { top: "Bergamot, Saffron", heart: "Rose, Oud", base: "Amber, Musk" },
        images: ["/midnight-oud.jpg"]
    },
    "2": {
        id: "2",
        name: "Royal Rose",
        price: 12000,
        description: "An ode to the queen of flowers. A timeless blend of fresh petals and warm musk.",
        notes: { top: "Peony", heart: "Rose", base: "Musk" },
        images: ["/images/eclaire-cgi.jpg"]
    },
    "3": {
        id: "3",
        name: "Golden Amber",
        price: 15000,
        description: "A warm and inviting scent that captures the glow of sunset. Rich amber and vanilla create a comforting embrace.",
        notes: { top: "Amber", heart: "Vanilla", base: "Sandalwood" },
        images: ["/golden-amber-new.jpg"]
    },
    "4": {
        id: "4",
        name: "Velvet Santal",
        price: 12500,
        description: "Smooth, woody, and sophisticated. A modern classic for the discerning individual.",
        notes: { top: "Sandalwood", heart: "Cedar", base: "Leather" },
        images: ["/velvet-santal.jpg"]
    },
    "5": {
        id: "5",
        name: "Imperial Citrus",
        price: 9500,
        description: "A burst of freshness that invigorates the senses. Bright citrus notes dance with delicate florals.",
        notes: { top: "Bergamot", heart: "Lemon", base: "Neroli" },
        images: ["/imperial-citrus.jpg"]
    },
    "6": {
        id: "6",
        name: "Mystic Musk",
        price: 11000,
        description: "Enigmatic and alluring. A soft, powdery musk that lingers on the skin like a secret.",
        notes: { top: "Musk", heart: "Iris", base: "Tonka" },
        images: ["/mystic-musk.jpg"]
    },
    "7": {
        id: "7",
        name: "Noir Leather",
        price: 16000,
        description: "Dark, intense, and undeniably masculine. A bold statement of confidence and power.",
        notes: { top: "Leather", heart: "Tobacco", base: "Vetiver" },
        images: ["/noir-leather.jpg"]
    },
    "8": {
        id: "8",
        name: "Azure Dreams",
        price: 11500,
        description: "Fresh as the ocean breeze. A revitalizing scent that transports you to the coast.",
        notes: { top: "Sea Salt", heart: "Jasmine", base: "Driftwood" },
        images: ["/azure-dreams.jpg"]
    },
    "9": {
        id: "9",
        name: "Crimson Velvet",
        price: 14000,
        description: "Passionate and romantic. A deep red rose scent enriched with earthy patchouli.",
        notes: { top: "Red Rose", heart: "Patchouli", base: "Vanilla" },
        images: ["/crimson-velvet.jpg"]
    },
    "10": {
        id: "10",
        name: "Platinum Essence",
        price: 17500,
        description: "The epitome of luxury. Rare oud and precious saffron combine for a truly opulent experience.",
        notes: { top: "Oud", heart: "Saffron", base: "Ambergris" },
        images: ["/platinum-essence.jpg"]
    },
    "11": {
        id: "11",
        name: "Silk Gardenia",
        price: 13000,
        description: "Soft, creamy, and elegant. The delicate scent of gardenia wrapped in smooth cashmere.",
        notes: { top: "Gardenia", heart: "White Tea", base: "Cashmere" },
        images: ["/silk-gardenia.jpg"]
    },
    "12": {
        id: "12",
        name: "Spiced Ember",
        price: 12500,
        description: "Warm and spicy. A cozy fragrance that ignites the spirit with notes of cardamom and incense.",
        notes: { top: "Cardamom", heart: "Cinnamon", base: "Incense" },
        images: ["/spiced-ember.jpg"]
    },
    "13": {
        id: "13",
        name: "Ocean Mist",
        price: 10800,
        description: "Cool and refreshing. A light, airy scent perfect for everyday wear.",
        notes: { top: "Marine Accord", heart: "Mint", base: "Cedar" },
        images: ["/ocean-mist.jpg"]
    },
    "14": {
        id: "14",
        name: "Black Orchid",
        price: 16800,
        description: "Exotic and mysterious. A dark floral fragrance with a hint of gourmand sweetness.",
        notes: { top: "Black Orchid", heart: "Plum", base: "Dark Chocolate" },
        images: ["/black-orchid.jpg"]
    },
    "15": {
        id: "15",
        name: "Desert Rose",
        price: 14500,
        description: "A rose blooming in the desert. Spicy and resinous notes add depth to this classic floral.",
        notes: { top: "Damask Rose", heart: "Myrrh", base: "Frankincense" },
        images: ["/desert-rose.jpg"]
    },
};

export default function ProductPage() {
    const params = useParams();
    const id = params.id as string;
    const product = PRODUCTS[id as keyof typeof PRODUCTS] || PRODUCTS["1"]; // Fallback to first product

    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        // Add each quantity as separate items
        for (let i = 0; i < quantity; i++) {
            addToCart({
                product: {
                    id: product.id,
                    name: product.name,
                    slug: product.id,
                    price: product.price,
                    images: product.images,
                    description: product.description,
                    stock: 100,
                },
            });
        }

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="aspect-[3/4] bg-white/5 relative overflow-hidden rounded-sm"
                >
                    {product.images && product.images.length > 0 ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                            <span className="uppercase tracking-widest">Product Image</span>
                        </div>
                    )}
                </motion.div>

                {/* Details Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif text-cream-100 mb-4">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-2xl text-gold-400">₹{product.price.toLocaleString()}</span>
                            <div className="flex text-gold-400">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-lg font-light">
                            {product.description}
                        </p>
                    </div>

                    {/* Notes */}
                    <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-6">
                        <div className="text-center">
                            <h4 className="text-gold-400 text-xs uppercase tracking-widest mb-2">Top Notes</h4>
                            <p className="text-sm text-gray-300">{product.notes.top}</p>
                        </div>
                        <div className="text-center border-x border-white/10">
                            <h4 className="text-gold-400 text-xs uppercase tracking-widest mb-2">Heart Notes</h4>
                            <p className="text-sm text-gray-300">{product.notes.heart}</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-gold-400 text-xs uppercase tracking-widest mb-2">Base Notes</h4>
                            <p className="text-sm text-gray-300">{product.notes.base}</p>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-white/20">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 text-cream-100 min-w-[3rem] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 py-3 px-8 font-medium uppercase tracking-widest transition-all ${isAdded
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gold-400 text-black hover:bg-gold-300'
                                    }`}
                            >
                                {isAdded ? '✓ Added to Cart!' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-3">
                            <Truck className="w-5 h-5 text-gold-400" />
                            <span>Free Shipping over $200</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-gold-400" />
                            <span>Authenticity Guaranteed</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
