'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { orderAPI, formatPrice } from '@/lib/api';
import { Order, OrderItem } from '@/types';

export default function OrderConfirmationPage() {
    const params = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrder = async () => {
            try {
                const orderId = params.id as string;
                const data = await orderAPI.getById(orderId);
                setOrder(data);
            } catch (error) {
                console.error('Error loading order:', error);
            } finally {
                setLoading(false);
            }
        };

        loadOrder();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-cream flex items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-black text-cream flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Order not found</h1>
                    <button
                        onClick={() => router.push('/shop')}
                        className="px-6 py-3 bg-gold text-black font-semibold rounded hover:bg-gold/90 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-cream py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Success Message */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                        <svg
                            className="w-10 h-10 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-gold">Order Confirmed!</h1>
                    <p className="text-lg text-cream/70">
                        Thank you for your purchase. Your order has been received.
                    </p>
                </div>

                {/* Order Details */}
                <div className="bg-cream/5 border border-gold/20 rounded-lg p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-gold">Order Information</h2>
                            <div className="space-y-2 text-sm">
                                <p>
                                    <span className="text-cream/60">Order ID:</span>{' '}
                                    <span className="font-mono">{order.id}</span>
                                </p>
                                <p>
                                    <span className="text-cream/60">Date:</span>{' '}
                                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                                <p>
                                    <span className="text-cream/60">Status:</span>{' '}
                                    <span className="px-2 py-1 bg-gold/20 text-gold rounded text-xs">
                                        {order.status}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold mb-4 text-gold">Shipping Address</h2>
                            <div className="text-sm text-cream/80">
                                <p className="font-semibold">{order.customerName}</p>
                                <p>{order.address.street}</p>
                                <p>
                                    {order.address.city}, {order.address.state} {order.address.zipCode}
                                </p>
                                <p>{order.address.country}</p>
                                <p className="mt-2">{order.customerEmail}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-gold">Order Items</h2>
                        <div className="space-y-4">
                            {order.items?.map((item: OrderItem) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-start pb-4 border-b border-gold/10 last:border-0"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{item.product?.name || 'Product'}</h3>
                                        <p className="text-sm text-cream/60">Quantity: {item.quantity}</p>
                                        <p className="text-sm text-cream/60">
                                            Price: {formatPrice(Number(item.price))}
                                        </p>
                                    </div>
                                    <p className="font-semibold text-gold">
                                        {formatPrice(Number(item.price) * item.quantity)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gold/20">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold">Total</span>
                                <span className="text-3xl font-bold text-gold">
                                    {formatPrice(Number(order.total))}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => router.push('/shop')}
                        className="px-8 py-3 bg-gold text-black font-semibold rounded hover:bg-gold/90 transition-colors"
                    >
                        Continue Shopping
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="px-8 py-3 border border-gold text-gold font-semibold rounded hover:bg-gold/10 transition-colors"
                    >
                        Print Order
                    </button>
                </div>

                {/* Additional Info */}
                <div className="mt-12 p-6 bg-gold/10 border border-gold/20 rounded-lg">
                    <h3 className="font-bold mb-2">What's Next?</h3>
                    <ul className="space-y-2 text-sm text-cream/80">
                        <li>• You will receive an email confirmation shortly</li>
                        <li>• We'll send you tracking information once your order ships</li>
                        <li>• Estimated delivery: 3-5 business days</li>
                        <li>• For questions, contact us at support@zokuperfume.com</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
