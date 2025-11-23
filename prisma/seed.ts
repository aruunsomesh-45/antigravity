import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create Collections
    const collections = await Promise.all([
        prisma.collection.upsert({
            where: { slug: 'mens-collection' },
            update: {},
            create: {
                name: "Men's Collection",
                slug: 'mens-collection',
                description: 'Bold and sophisticated fragrances for the modern gentleman',
                image: '/images/collections/mens.jpg',
            },
        }),
        prisma.collection.upsert({
            where: { slug: 'womens-collection' },
            update: {},
            create: {
                name: "Women's Collection",
                slug: 'womens-collection',
                description: 'Elegant and timeless scents for the refined woman',
                image: '/images/collections/womens.jpg',
            },
        }),
        prisma.collection.upsert({
            where: { slug: 'unisex-collection' },
            update: {},
            create: {
                name: 'Unisex Collection',
                slug: 'unisex-collection',
                description: 'Versatile fragrances that transcend gender boundaries',
                image: '/images/collections/unisex.jpg',
            },
        }),
    ]);

    console.log('✅ Created collections');

    // Create Products
    const products = [
        {
            name: 'Midnight Oud',
            slug: 'midnight-oud',
            description: 'A rich, woody fragrance with notes of oud, amber, and sandalwood. Perfect for evening wear.',
            price: 12500,
            images: ['/images/products/midnight-oud.jpg'],
            stock: 50,
            notes: {
                top: ['Bergamot', 'Cardamom'],
                heart: ['Oud', 'Rose'],
                base: ['Amber', 'Sandalwood', 'Musk'],
            },
            isFeatured: true,
            isNew: false,
            categoryId: collections[0].id,
        },
        {
            name: 'Rose Noir',
            slug: 'rose-noir',
            description: 'An intoxicating blend of dark rose and patchouli, creating a mysterious and alluring scent.',
            price: 11000,
            images: ['/images/products/rose-noir.jpg'],
            stock: 45,
            notes: {
                top: ['Black Pepper', 'Pink Pepper'],
                heart: ['Turkish Rose', 'Violet'],
                base: ['Patchouli', 'Vetiver', 'Leather'],
            },
            isFeatured: true,
            isNew: true,
            categoryId: collections[1].id,
        },
        {
            name: 'Citrus Breeze',
            slug: 'citrus-breeze',
            description: 'A fresh and invigorating scent with citrus notes and marine accords.',
            price: 9500,
            images: ['/images/products/citrus-breeze.jpg'],
            stock: 60,
            notes: {
                top: ['Lemon', 'Bergamot', 'Grapefruit'],
                heart: ['Sea Salt', 'Jasmine'],
                base: ['Cedarwood', 'Musk'],
            },
            isFeatured: false,
            isNew: true,
            categoryId: collections[2].id,
        },
        {
            name: 'Velvet Vanilla',
            slug: 'velvet-vanilla',
            description: 'A warm and comforting fragrance with vanilla, tonka bean, and caramel.',
            price: 10500,
            images: ['/images/products/velvet-vanilla.jpg'],
            stock: 40,
            notes: {
                top: ['Orange Blossom', 'Almond'],
                heart: ['Vanilla', 'Tonka Bean'],
                base: ['Caramel', 'Sandalwood', 'Benzoin'],
            },
            isFeatured: true,
            isNew: false,
            categoryId: collections[1].id,
        },
        {
            name: 'Leather & Tobacco',
            slug: 'leather-tobacco',
            description: 'A bold and masculine scent combining leather, tobacco, and spices.',
            price: 13000,
            images: ['/images/products/leather-tobacco.jpg'],
            stock: 35,
            notes: {
                top: ['Cinnamon', 'Clove'],
                heart: ['Tobacco Leaf', 'Leather'],
                base: ['Amber', 'Vanilla', 'Patchouli'],
            },
            isFeatured: false,
            isNew: true,
            categoryId: collections[0].id,
        },
        {
            name: 'Jasmine Dream',
            slug: 'jasmine-dream',
            description: 'An ethereal floral fragrance centered around jasmine and white flowers.',
            price: 10000,
            images: ['/images/products/jasmine-dream.jpg'],
            stock: 55,
            notes: {
                top: ['Neroli', 'Mandarin'],
                heart: ['Jasmine', 'Tuberose', 'Ylang-Ylang'],
                base: ['White Musk', 'Sandalwood'],
            },
            isFeatured: true,
            isNew: false,
            categoryId: collections[1].id,
        },
        {
            name: 'Aqua Marine',
            slug: 'aqua-marine',
            description: 'A refreshing aquatic fragrance reminiscent of ocean breezes.',
            price: 9000,
            images: ['/images/products/aqua-marine.jpg'],
            stock: 70,
            notes: {
                top: ['Sea Spray', 'Mint'],
                heart: ['Lavender', 'Rosemary'],
                base: ['Driftwood', 'Amber'],
            },
            isFeatured: false,
            isNew: false,
            categoryId: collections[2].id,
        },
        {
            name: 'Spice Bazaar',
            slug: 'spice-bazaar',
            description: 'An exotic blend of oriental spices and precious woods.',
            price: 11500,
            images: ['/images/products/spice-bazaar.jpg'],
            stock: 30,
            notes: {
                top: ['Saffron', 'Nutmeg', 'Cardamom'],
                heart: ['Cinnamon', 'Clove', 'Rose'],
                base: ['Agarwood', 'Amber', 'Frankincense'],
            },
            isFeatured: true,
            isNew: true,
            categoryId: collections[2].id,
        },
    ];

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: product,
        });
    }

    console.log('✅ Created products');

    // Create admin user
    await prisma.user.upsert({
        where: { email: 'admin@zokuperfume.com' },
        update: {},
        create: {
            email: 'admin@zokuperfume.com',
            password: 'admin123', // In production, this should be hashed
            role: 'ADMIN',
        },
    });

    console.log('✅ Created admin user');
    console.log('🎉 Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
