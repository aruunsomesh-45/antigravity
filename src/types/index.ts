// Product Types
export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string[];
    stock: number;
    notes?: {
        top: string[];
        heart: string[];
        base: string[];
    };
    isFeatured: boolean;
    isNew: boolean;
    categoryId?: string;
    category?: Collection;
    createdAt: Date;
    updatedAt: Date;
}

// Collection Types
export interface Collection {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    products?: Product[];
}

// Order Types
export interface Order {
    id: string;
    userId?: string;
    total: number;
    status: OrderStatus;
    customerName: string;
    customerEmail: string;
    address: Address;
    items: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    product?: Product;
    quantity: number;
    price: number;
}

export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

// User Types
export interface User {
    id: string;
    email: string;
    role: 'USER' | 'ADMIN';
    createdAt: Date;
    updatedAt: Date;
}

// Cart Types
export interface CartItem {
    productId: string;
    product?: Product;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    total: number;
}

// API Response Types
export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

// Filter Types
export interface ProductFilters {
    category?: string;
    featured?: boolean;
    isNew?: boolean;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
}
