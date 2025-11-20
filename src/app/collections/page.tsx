import Link from "next/link";

const COLLECTIONS = [
    { id: "1", name: "Signature Collection", slug: "signature-collection", description: "Our most iconic scents, crafted for the discerning individual.", image: "/images/c1.jpg" },
    { id: "2", name: "Oud Collection", slug: "oud-collection", description: "Deep, woody, and mysterious. The essence of the Orient.", image: "/images/c2.jpg" },
    { id: "3", name: "Floral Collection", slug: "floral-collection", description: "A bouquet of nature's finest blooms, captured in a bottle.", image: "/images/c3.jpg" },
    { id: "4", name: "Royal Combos", slug: "royal-combos", description: "Exclusive sets curated for the ultimate luxury experience.", image: "/images/c4.jpg" },
];

export default function CollectionsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-serif text-cream-100 text-center mb-16">Our Collections</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {COLLECTIONS.map((collection) => (
                    <Link
                        href={collection.slug === "royal-combos" ? "/royal-combos" : `/collections/${collection.slug}`}
                        key={collection.id}
                        className="group relative aspect-video overflow-hidden block"
                    >
                        <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-700">
                            {/* Placeholder for image */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                        </div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                            <h2 className="text-3xl font-serif text-cream-100 mb-2">{collection.name}</h2>
                            <p className="text-gray-300 max-w-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                {collection.description}
                            </p>
                            <span className="mt-6 px-6 py-2 border border-gold-400 text-gold-400 uppercase tracking-widest text-sm hover:bg-gold-400 hover:text-black transition-colors">
                                Explore
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
