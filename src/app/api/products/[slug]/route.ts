import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/products/[slug] - Get a single product by slug
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { error: 'Failed to fetch product' },
            { status: 500 }
        );
    }
}

// PUT /api/products/[slug] - Update a product (Admin only)
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const body = await request.json();

        const product = await prisma.product.update({
            where: { slug },
            data: body,
            include: {
                category: true,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 }
        );
    }
}

// DELETE /api/products/[slug] - Delete a product (Admin only)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        await prisma.product.delete({
            where: { slug },
        });

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 }
        );
    }
}
