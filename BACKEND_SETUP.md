# Zoku Perfume - Backend Setup Guide

## 🚀 Backend Overview

This backend is built with:
- **Next.js 16** API Routes
- **Prisma ORM** for database management
- **PostgreSQL** database
- **TypeScript** for type safety

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **PostgreSQL** database (local or cloud)
3. **npm** or **yarn**

## 🛠️ Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Database

You have two options:

#### Option A: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a new database:
```sql
CREATE DATABASE zoku_perfume;
```

#### Option B: Cloud Database (Recommended)

Use a free PostgreSQL database from:
- **Neon** (https://neon.tech) - Free tier available
- **Supabase** (https://supabase.com) - Free tier available
- **Railway** (https://railway.app) - Free tier available

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/zoku_perfume?schema=public"

# For cloud database, use the connection string provided by your service
# Example for Neon:
# DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# NextAuth (optional - for future authentication)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
```

### Step 4: Generate Prisma Client

```bash
npm run db:generate
```

### Step 5: Push Database Schema

```bash
npm run db:push
```

This will create all the tables in your database.

### Step 6: Seed the Database

```bash
npm run db:seed
```

This will populate your database with:
- 3 Collections (Men's, Women's, Unisex)
- 8 Sample Products
- 1 Admin User (email: admin@zokuperfume.com, password: admin123)

### Step 7: Start Development Server

```bash
npm run dev
```

Your backend API will be available at `http://localhost:3000/api`

## 📡 API Endpoints

### Products

- `GET /api/products` - Get all products (with optional filters)
  - Query params: `category`, `featured`, `new`, `search`
- `GET /api/products/[slug]` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/[slug]` - Update product (Admin)
- `DELETE /api/products/[slug]` - Delete product (Admin)

### Collections

- `GET /api/collections` - Get all collections
- `GET /api/collections/[slug]` - Get single collection with products
- `POST /api/collections` - Create collection (Admin)
- `PUT /api/collections/[slug]` - Update collection (Admin)
- `DELETE /api/collections/[slug]` - Delete collection (Admin)

### Orders

- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/[id]` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/[id]` - Update order status (Admin)

## 🎨 Admin Dashboard

Access the admin dashboard at: `http://localhost:3000/admin`

Features:
- View all products
- View all collections
- Manage orders
- Update order status

## 🗄️ Database Schema

### Product
- id, name, slug, description, price
- images (array), stock, notes (JSON)
- isFeatured, isNew
- categoryId (relation to Collection)

### Collection
- id, name, slug, description, image
- products (relation)

### Order
- id, userId, total, status
- customerName, customerEmail, address (JSON)
- items (relation to OrderItem)

### OrderItem
- id, orderId, productId, quantity, price

### User
- id, email, password, role

## 🔧 Useful Commands

```bash
# Generate Prisma Client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and apply migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed

# Open Prisma Studio (Database GUI)
npm run db:studio
```

## 🌐 Using the API from Frontend

Example usage:

```typescript
import { productAPI } from '@/lib/api';

// Get all products
const products = await productAPI.getAll();

// Get featured products
const featured = await productAPI.getAll({ featured: 'true' });

// Get single product
const product = await productAPI.getBySlug('midnight-oud');

// Create order
const order = await orderAPI.create({
  items: [
    { productId: 'xxx', quantity: 2 }
  ],
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  address: {
    street: '123 Main St',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001',
    country: 'India'
  }
});
```

## 🚨 Troubleshooting

### Prisma Client not generated
```bash
npm run db:generate
```

### Database connection error
- Check your DATABASE_URL in .env
- Ensure PostgreSQL is running
- Verify database credentials

### Migration errors
```bash
# Reset database (WARNING: This will delete all data)
npx prisma migrate reset
```

## 📝 Notes

- The seed data includes sample products with placeholder images
- Admin credentials: admin@zokuperfume.com / admin123
- Change admin password in production
- Add authentication middleware for protected routes in production

## 🔐 Security Recommendations for Production

1. Use strong DATABASE_URL with SSL
2. Set strong NEXTAUTH_SECRET
3. Implement proper authentication
4. Add rate limiting
5. Validate all inputs
6. Use environment variables for sensitive data
7. Enable CORS only for trusted domains
8. Hash passwords properly (use bcrypt)

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
