// API utility functions for making requests to the backend
import { Product, Collection, Order, CartItem, CreateOrderInput } from '@/types';

const API_BASE_URL = '/api';

// Generic fetch wrapper
async function fetchAPI<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || 'Request failed');
    }

    return response.json();
}

// Product API
export const productAPI = {
    getAll: (filters?: Record<string, string>) => {
        const params = new URLSearchParams(filters);
        return fetchAPI<Product[]>(`/products?${params}`);
    },

    getBySlug: (slug: string) => {
        return fetchAPI<Product>(`/products/${slug}`);
    },

    create: (data: Partial<Product>) => {
        return fetchAPI<Product>('/products', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    update: (slug: string, data: Partial<Product>) => {
        return fetchAPI<Product>(`/products/${slug}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    delete: (slug: string) => {
        return fetchAPI<void>(`/products/${slug}`, {
            method: 'DELETE',
        });
    },
};

// Collection API
export const collectionAPI = {
    getAll: () => {
        return fetchAPI<Collection[]>('/collections');
    },

    getBySlug: (slug: string) => {
        return fetchAPI<Collection>(`/collections/${slug}`);
    },

    create: (data: Partial<Collection>) => {
        return fetchAPI<Collection>('/collections', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    update: (slug: string, data: Partial<Collection>) => {
        return fetchAPI<Collection>(`/collections/${slug}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    delete: (slug: string) => {
        return fetchAPI<void>(`/collections/${slug}`, {
            method: 'DELETE',
        });
    },
};

// Order API
export const orderAPI = {
    getAll: () => {
        return fetchAPI<Order[]>('/orders');
    },

    getById: (id: string) => {
        return fetchAPI<Order>(`/orders/${id}`);
    },

    create: (data: CreateOrderInput) => {
        return fetchAPI<Order>('/orders', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    updateStatus: (id: string, status: string) => {
        return fetchAPI<Order>(`/orders/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
    },
};

// Helper function to format price
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    }).format(price);
}

// Helper function to calculate cart total
export function calculateCartTotal(items: CartItem[]): number {
    return items.reduce((total, item) => {
        return total + (Number(item.product?.price || 0) * item.quantity);
    }, 0);
}
