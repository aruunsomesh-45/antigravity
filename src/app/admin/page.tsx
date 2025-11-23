'use client';

import { useState, useEffect } from 'react';
import { productAPI, collectionAPI, orderAPI, formatPrice } from '@/lib/api';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'products' | 'collections' | 'orders'>('products');
    const [products, setProducts] = useState<any[]>([]);
    const [collections, setCollections] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [activeTab]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'products') {
                const data = await productAPI.getAll();
                setProducts(data);
            } else if (activeTab === 'collections') {
                const data = await collectionAPI.getAll();
                setCollections(data);
            } else if (activeTab === 'orders') {
                const data = await orderAPI.getAll();
                setOrders(data);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: string, status: string) => {
        try {
            await orderAPI.updateStatus(orderId, status);
            loadData();
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-cream">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8 text-gold">Admin Dashboard</h1>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gold/20">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'products'
                                ? 'text-gold border-b-2 border-gold'
                                : 'text-cream/60 hover:text-cream'
                            }`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab('collections')}
                        className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'collections'
                                ? 'text-gold border-b-2 border-gold'
                                : 'text-cream/60 hover:text-cream'
                            }`}
                    >
                        Collections
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'orders'
                                ? 'text-gold border-b-2 border-gold'
                                : 'text-cream/60 hover:text-cream'
                            }`}
                    >
                        Orders
                    </button>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
                    </div>
                ) : (
                    <>
                        {/* Products Tab */}
                        {activeTab === 'products' && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Products ({products.length})</h2>
                                </div>
                                <div className="grid gap-4">
                                    {products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="bg-cream/5 border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-colors"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-gold mb-2">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-cream/70 mb-2">{product.description}</p>
                                                    <div className="flex gap-4 text-sm">
                                                        <span className="text-cream/60">
                                                            Price: <span className="text-gold font-semibold">{formatPrice(Number(product.price))}</span>
                                                        </span>
                                                        <span className="text-cream/60">
                                                            Stock: <span className="text-gold font-semibold">{product.stock}</span>
                                                        </span>
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
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Collections Tab */}
                        {activeTab === 'collections' && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Collections ({collections.length})</h2>
                                </div>
                                <div className="grid gap-4">
                                    {collections.map((collection) => (
                                        <div
                                            key={collection.id}
                                            className="bg-cream/5 border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-colors"
                                        >
                                            <h3 className="text-xl font-semibold text-gold mb-2">
                                                {collection.name}
                                            </h3>
                                            <p className="text-cream/70 mb-2">{collection.description}</p>
                                            <p className="text-sm text-cream/60">
                                                Products: <span className="text-gold font-semibold">{collection.products?.length || 0}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Orders ({orders.length})</h2>
                                </div>
                                <div className="grid gap-4">
                                    {orders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="bg-cream/5 border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-colors"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gold mb-1">
                                                        Order #{order.id.slice(0, 8)}
                                                    </h3>
                                                    <p className="text-cream/70">{order.customerName}</p>
                                                    <p className="text-sm text-cream/60">{order.customerEmail}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-gold">
                                                        {formatPrice(Number(order.total))}
                                                    </p>
                                                    <p className="text-sm text-cream/60">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-cream/60">
                                                    {order.items?.length || 0} item(s)
                                                </div>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    className="bg-cream/10 border border-gold/20 rounded px-3 py-1 text-sm text-cream focus:outline-none focus:border-gold"
                                                >
                                                    <option value="PENDING">Pending</option>
                                                    <option value="PAID">Paid</option>
                                                    <option value="SHIPPED">Shipped</option>
                                                    <option value="DELIVERED">Delivered</option>
                                                    <option value="CANCELLED">Cancelled</option>
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
