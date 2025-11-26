import { z } from 'zod';

// Product validation schema
export const ProductSchema = z.object({
    name: z.string().min(1).max(200).trim(),
    slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
    description: z.string().min(10).max(2000).trim(),
    price: z.number().positive().max(1000000),
    stock: z.number().int().nonnegative().max(100000),
    images: z.array(z.string().url()).max(10),
    notes: z.object({
        top: z.array(z.string()),
        heart: z.array(z.string()),
        base: z.array(z.string()),
    }).optional(),
    categoryId: z.string().cuid().optional().nullable(),
    isFeatured: z.boolean().optional().default(false),
    isNew: z.boolean().optional().default(false),
});

// Order validation schema
export const OrderSchema = z.object({
    items: z.array(z.object({
        productId: z.string().cuid(),
        quantity: z.number().int().positive().max(100),
    })).min(1).max(50),
    customerName: z.string().min(2).max(100).trim(),
    customerEmail: z.string().email(),
    address: z.object({
        street: z.string().min(5).max(200),
        city: z.string().min(2).max(100),
        state: z.string().min(2).max(100),
        zipCode: z.string().regex(/^\d{5,10}$/),
        country: z.string().min(2).max(100),
    }),
    userId: z.string().cuid().optional().nullable(),
});

// Collection validation schema
export const CollectionSchema = z.object({
    name: z.string().min(1).max(200).trim(),
    slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
    description: z.string().max(2000).trim().optional().nullable(),
    image: z.string().url().optional().nullable(),
});
