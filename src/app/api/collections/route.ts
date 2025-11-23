import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/collections - Get all collections
export async function GET() {
    try {
        const collections = await prisma.collection.findMany({
            include: {
                products: {
                    take: 8, // Limit products per collection
                },
            },
        });

        return NextResponse.json(collections);
    } catch (error) {
        console.error('Error fetching collections:', error);
        return NextResponse.json(
            { error: 'Failed to fetch collections' },
            { status: 500 }
        );
    }
}

// POST /api/collections - Create a new collection (Admin only)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, slug, description, image } = body;

        if (!name || !slug) {
            return NextResponse.json(
                { error: 'Name and slug are required' },
                { status: 400 }
            );
        }

        const collection = await prisma.collection.create({
            data: {
                name,
                slug,
                description,
                image,
            },
        });

        return NextResponse.json(collection, { status: 201 });
    } catch (error) {
        console.error('Error creating collection:', error);
        return NextResponse.json(
            { error: 'Failed to create collection' },
            { status: 500 }
        );
    }
}
