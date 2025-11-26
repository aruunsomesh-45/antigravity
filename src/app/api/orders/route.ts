import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { OrderSchema } from '@/lib/validation';
import Decimal from 'decimal.js';

// GET /api/orders - Get all orders (Admin only)
// TODO: Add authentication middleware to protect this route
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
        console.error('[API_ORDERS_GET]', error);

        // Log full error in development only
        if (process.env.NODE_ENV === 'development') {
            console.error(error);
        }

        return NextResponse.json(
            {
                error: 'An error occurred while fetching orders',
                code: 'ORDERS_FETCH_ERROR'
            },
            { status: 500 }
        );
    }
}

// POST /api/orders - Create a new order
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input with Zod schema
        const validatedData = OrderSchema.parse(body);
        const { items, customerName, customerEmail, address, userId } = validatedData;

        // Use Prisma transaction for atomicity to prevent race conditions
        const order = await prisma.$transaction(async (tx) => {
            let total = new Decimal(0);
            const orderItems = [];

            for (const item of items) {
                // Atomic read and update with pessimistic locking
                const product = await tx.product.findUnique({
                    where: { id: item.productId },
                });

                if (!product) {
                    throw new Error(`Product ${item.productId} not found`);
                }

                if (product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`);
                }

                // Atomic decrement with constraint check to prevent negative stock.
                // Note: If the WHERE condition (including stock constraint) does not match,
                // Prisma will throw a PrismaClientKnownRequestError; it will NOT return null/undefined.
                const updated = await tx.product.update({
                    where: {
                        id: item.productId,
                        stock: { gte: item.quantity } // Ensures stock is sufficient
                    },
                    data: {
                        stock: { decrement: item.quantity }
                    },
                });

                // Use Decimal.js for precise currency calculations
                const itemTotal = new Decimal(product.price.toString()).times(item.quantity);
                total = total.plus(itemTotal);

                orderItems.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                });
            }

            // Create order within same transaction
            return await tx.order.create({
                data: {
                    userId,
                    total: total.toNumber(),
                    customerName,
                    customerEmail,
                    address,
                    items: { create: orderItems },
                },
                include: {
                    items: { include: { product: true } },
                },
            });
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error('[API_ORDERS_POST]', error);

        if (process.env.NODE_ENV === 'development') {
            console.error(error);
        }

        // Handle validation errors
        if (error instanceof Error) {
            // Check if it's a Zod validation error
            if (error.name === 'ZodError') {
                return NextResponse.json(
                    {
                        error: 'Invalid input data',
                        code: 'VALIDATION_ERROR',
                        details: error.message
                    },
                    { status: 400 }
                );
            }

            // Handle stock-related errors
            if (error.message.includes('stock') || error.message.includes('Concurrent')) {
                return NextResponse.json(
                    { error: error.message, code: 'STOCK_ERROR' },
                    { status: 400 }
                );
            }

            // Handle not found errors
            if (error.message.includes('not found')) {
                return NextResponse.json(
                    { error: error.message, code: 'NOT_FOUND' },
                    { status: 404 }
                );
            }
        }

        return NextResponse.json(
            {
                error: 'An error occurred while creating the order',
                code: 'ORDER_CREATE_ERROR'
            },
            { status: 500 }
        );
    }
}
