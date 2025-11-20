import { ProductCard } from "@/components/ProductCard";

const COMBOS = [
    { id: "combo1", name: "The Royal Pair", price: 249.00, image: "/images/c1.jpg", category: "Royal Combo", description: "Midnight Oud + Royal Rose" },
    { id: "combo2", name: "The Oud Trilogy", price: 399.00, image: "/images/c2.jpg", category: "Royal Combo", description: "Midnight Oud + Golden Amber + Mystic Musk" },
];

export default function RoyalCombosPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif text-gold-400 mb-6">Royal Combos</h1>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Experience the art of layering with our curated sets.
                    Designed to complement each other, these combinations offer a unique olfactory journey.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {COMBOS.map((combo) => (
                    <div key={combo.id} className="bg-white/5 border border-white/10 p-8 rounded-sm hover:border-gold-400/50 transition-colors group">
                        <div className="aspect-video bg-black/50 mb-6 flex items-center justify-center text-gray-600">
                            <span className="uppercase tracking-widest">Combo Image</span>
                        </div>

                        <div className="text-center space-y-4">
                            <h3 className="text-2xl font-serif text-cream-100">{combo.name}</h3>
                            <p className="text-gold-400 text-sm uppercase tracking-widest">{combo.description}</p>
                            <p className="text-xl text-white">${combo.price.toFixed(2)}</p>

                            <button className="w-full bg-gold-400 text-black py-3 font-medium uppercase tracking-widest hover:bg-gold-300 transition-colors mt-4">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
