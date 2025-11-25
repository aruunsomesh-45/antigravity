import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// GET /api/products - Get all products with optional filters
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');
        const isNew = searchParams.get('new');
        const search = searchParams.get('search');

        const where: Prisma.ProductWhereInput = {};

        if (category) {
            where.category = {
                slug: category,
            };
        }

        if (featured === 'true') {
            where.isFeatured = true;
        }

        if (isNew === 'true') {
            where.isNew = true;
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' as any } },
                { description: { contains: search, mode: 'insensitive' as any } },
            ];
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                category: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

// POST /api/products - Create a new product (Admin only)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            slug,
            description,
            price,
            images,
            stock,
            notes,
            isFeatured,
            isNew,
            categoryId,
        } = body;

        // Validate required fields
        if (!name || !slug || !description || !price) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const product = await prisma.product.create({
            data: {
                name,
                slug,
                description,
                price,
                images: images || [],
                stock: stock || 0,
                notes,
                isFeatured: isFeatured || false,
                isNew: isNew || false,
                categoryId,
            },
            include: {
                category: true,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}
