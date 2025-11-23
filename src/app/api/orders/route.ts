import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/orders - Get all orders (Admin only)
export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}

// POST /api/orders - Create a new order
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, customerName, customerEmail, address, userId } = body;

        // Validate required fields
        if (!items || !customerName || !customerEmail || !address) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Calculate total from items
        let total = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
            });

            if (!product) {
                return NextResponse.json(
                    { error: `Product ${item.productId} not found` },
                    { status: 404 }
                );
            }

            if (product.stock < item.quantity) {
                return NextResponse.json(
                    { error: `Insufficient stock for ${product.name}` },
                    { status: 400 }
                );
            }

            const itemTotal = Number(product.price) * item.quantity;
            total += itemTotal;

            orderItems.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
            });
        }

        // Create order with items
        const order = await prisma.order.create({
            data: {
                userId,
                total,
                customerName,
                customerEmail,
                address,
                items: {
                    create: orderItems,
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        // Update product stock
        for (const item of items) {
            await prisma.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        decrement: item.quantity,
                    },
                },
            });
        }

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}
