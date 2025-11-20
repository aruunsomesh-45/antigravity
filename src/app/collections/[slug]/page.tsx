"use client";

import { useParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";

// Mock Data
const PRODUCTS = [
    { id: "1", name: "Midnight Oud", price: 129.00, image: "/images/p1.jpg", category: "Signature Collection" },
    { id: "2", name: "Royal Rose", price: 149.00, image: "/images/p2.jpg", category: "Floral Collection" },
    { id: "3", name: "Golden Amber", price: 189.00, image: "/images/p3.jpg", category: "Oud Collection" },
    { id: "4", name: "Velvet Santal", price: 159.00, image: "/images/p4.jpg", category: "Signature Collection" },
];

export default function CollectionDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    // Format slug to title
    const title = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    // Filter products based on slug (mock logic)
    const filteredProducts = PRODUCTS.filter(p =>
        p.category.toLowerCase().includes(slug.split("-")[0])
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-serif text-cream-100 mb-4">{title}</h1>
                <div className="w-24 h-[1px] bg-gold-400 mx-auto" />
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-400">No products found in this collection.</p>
                </div>
            )}
        </div>
    );
}
