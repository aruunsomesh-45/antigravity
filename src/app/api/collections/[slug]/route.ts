import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/collections/[slug] - Get a single collection with all products
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const collection = await prisma.collection.findUnique({
            where: { slug },
            include: {
                products: true,
            },
        });

        if (!collection) {
            return NextResponse.json(
                { error: 'Collection not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(collection);
    } catch (error) {
        console.error('Error fetching collection:', error);
        return NextResponse.json(
            { error: 'Failed to fetch collection' },
            { status: 500 }
        );
    }
}

// PUT /api/collections/[slug] - Update a collection (Admin only)
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const body = await request.json();

        const collection = await prisma.collection.update({
            where: { slug },
            data: body,
        });

        return NextResponse.json(collection);
    } catch (error) {
        console.error('Error updating collection:', error);
        return NextResponse.json(
            { error: 'Failed to update collection' },
            { status: 500 }
        );
    }
}

// DELETE /api/collections/[slug] - Delete a collection (Admin only)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        await prisma.collection.delete({
            where: { slug },
        });

        return NextResponse.json({ message: 'Collection deleted successfully' });
    } catch (error) {
        console.error('Error deleting collection:', error);
        return NextResponse.json(
            { error: 'Failed to delete collection' },
            { status: 500 }
        );
    }
}
