'use client';

import { useState } from 'react';
import { productAPI, collectionAPI, formatPrice } from '@/lib/api';

export default function APITestPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [collections, setCollections] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const testProductsAPI = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productAPI.getAll();
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const testCollectionsAPI = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await collectionAPI.getAll();
            setCollections(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-cream p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-gold">Backend API Test</h1>

                <div className="mb-8 p-6 bg-cream/5 border border-gold/20 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Test API Endpoints</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={testProductsAPI}
                            disabled={loading}
                            className="px-6 py-3 bg-gold text-black font-semibold rounded hover:bg-gold/90 transition-colors disabled:opacity-50"
                        >
                            Test Products API
                        </button>
                        <button
                            onClick={testCollectionsAPI}
                            disabled={loading}
                            className="px-6 py-3 bg-gold text-black font-semibold rounded hover:bg-gold/90 transition-colors disabled:opacity-50"
                        >
                            Test Collections API
                        </button>
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
                        <p className="mt-4 text-cream/60">Loading...</p>
                    </div>
                )}

                {error && (
                    <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <h3 className="text-xl font-bold text-red-500 mb-2">Error</h3>
                        <p className="text-red-400">{error}</p>
                        <div className="mt-4 p-4 bg-black/50 rounded">
                            <p className="text-sm text-cream/60">
                                Make sure you have:
                            </p>
                            <ul className="list-disc list-inside text-sm text-cream/60 mt-2">
                                <li>Set up your DATABASE_URL in .env file</li>
                                <li>Run: npm run db:generate</li>
                                <li>Run: npm run db:push</li>
                                <li>Run: npm run db:seed</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Products Results */}
                {products.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-gold">
                            Products ({products.length})
                        </h2>
                        <div className="grid gap-4">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="p-6 bg-cream/5 border border-gold/20 rounded-lg"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gold mb-2">
                                                {product.name}
                                            </h3>
                                            <p className="text-cream/70 mb-2">{product.description}</p>
                                            <div className="flex gap-4 text-sm">
                                                <span className="text-cream/60">
                                                    Price:{' '}
                                                    <span className="text-gold font-semibold">
                                                        {formatPrice(Number(product.price))}
                                                    </span>
                                                </span>
                                                <span className="text-cream/60">
                                                    Stock:{' '}
                                                    <span className="text-gold font-semibold">
                                                        {product.stock}
                                                    </span>
                                                </span>
                                                {product.category && (
                                                    <span className="text-cream/60">
                                                        Category:{' '}
                                                        <span className="text-gold font-semibold">
                                                            {product.category.name}
                                                        </span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {product.isFeatured && (
                                                <span className="px-2 py-1 bg-gold/20 text-gold rounded text-xs">
                                                    Featured
                                                </span>
                                            )}
                                            {product.isNew && (
                                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                                                    New
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Collections Results */}
                {collections.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-gold">
                            Collections ({collections.length})
                        </h2>
                        <div className="grid gap-4">
                            {collections.map((collection) => (
                                <div
                                    key={collection.id}
                                    className="p-6 bg-cream/5 border border-gold/20 rounded-lg"
                                >
                                    <h3 className="text-xl font-semibold text-gold mb-2">
                                        {collection.name}
                                    </h3>
                                    <p className="text-cream/70 mb-2">{collection.description}</p>
                                    <p className="text-sm text-cream/60">
                                        Products:{' '}
                                        <span className="text-gold font-semibold">
                                            {collection.products?.length || 0}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* API Endpoints Documentation */}
                <div className="mt-12 p-6 bg-cream/5 border border-gold/20 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gold">Available API Endpoints</h2>
                    <div className="space-y-4 text-sm">
                        <div>
                            <h3 className="font-bold text-gold mb-2">Products</h3>
                            <ul className="space-y-1 text-cream/70 font-mono">
                                <li>GET /api/products</li>
                                <li>GET /api/products/[slug]</li>
                                <li>POST /api/products (Admin)</li>
                                <li>PUT /api/products/[slug] (Admin)</li>
                                <li>DELETE /api/products/[slug] (Admin)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-gold mb-2">Collections</h3>
                            <ul className="space-y-1 text-cream/70 font-mono">
                                <li>GET /api/collections</li>
                                <li>GET /api/collections/[slug]</li>
                                <li>POST /api/collections (Admin)</li>
                                <li>PUT /api/collections/[slug] (Admin)</li>
                                <li>DELETE /api/collections/[slug] (Admin)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-gold mb-2">Orders</h3>
                            <ul className="space-y-1 text-cream/70 font-mono">
                                <li>GET /api/orders (Admin)</li>
                                <li>GET /api/orders/[id]</li>
                                <li>POST /api/orders</li>
                                <li>PUT /api/orders/[id] (Admin)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
