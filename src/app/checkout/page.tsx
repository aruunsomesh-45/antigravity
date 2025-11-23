'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { orderAPI, formatPrice } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India',
    });

    const total = cart.reduce((sum, item) => {
        return sum + Number(item.product.price) * item.quantity;
    }, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                items: cart.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                })),
                customerName: formData.customerName,
                customerEmail: formData.customerEmail,
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                },
            };

            const order = await orderAPI.create(orderData);
            clearCart();
            router.push(`/order-confirmation/${order.id}`);
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-black text-cream flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
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
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-gold">Checkout</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Order Form */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-cream/10 border border-gold/20 rounded focus:outline-none focus:border-gold text-cream"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Email *</label>
                                <input
                                    type="email"
                                    name="customerEmail"
                                    value={formData.customerEmail}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-cream/10 border border-gold/20 rounded focus:outline-none focus:border-gold text-cream"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-cream/10 border border-gold/20 rounded focus:outline-none focus:border-gold text-cream"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Street Address *</label>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-cream/10 border border-gold/20 rounded focus:outline-none focus:border-gold text-cream"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-cream/10 border border-gold/20 rounded focus:outline-none focus:border-gold text-cream"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">State *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-cream/10 border border-gold/20 rounded focus:outline-none focus:border-gold text-cream"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">ZIP Code *</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-cream/10 border border-gold/20 rounded focus:outline-none focus:border-gold text-cream"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Country *</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-cream/10 border border-gold/20 rounded focus:outline-none focus:border-gold text-cream"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-6 px-6 py-3 bg-gold text-black font-semibold rounded hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : 'Place Order'}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        <div className="bg-cream/5 border border-gold/20 rounded-lg p-6">
                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div key={item.product.id} className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{item.product.name}</h3>
                                            <p className="text-sm text-cream/60">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-gold">
                                            {formatPrice(Number(item.product.price) * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gold/20 pt-4">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-gold text-2xl">{formatPrice(total)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-gold/10 border border-gold/20 rounded-lg">
                            <p className="text-sm text-cream/80">
                                <strong>Note:</strong> This is a demo checkout. No actual payment will be processed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
