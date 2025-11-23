# 🚀 Zoku Perfume Backend - Quick Reference

## ⚡ Quick Start (5 Minutes)

### 1. Get Free Database
Visit: https://neon.tech (or https://supabase.com)
- Sign up (free)
- Create new project
- Copy connection string

### 2. Run Setup
```powershell
.\setup-database.ps1
```
Paste your database URL when prompted

### 3. Start Server
```bash
npm run dev
```

## 🔗 Important URLs

| Page | URL | Purpose |
|------|-----|---------|
| **Home** | http://localhost:3000 | Main website |
| **API Test** | http://localhost:3000/api-test | Test backend |
| **Admin** | http://localhost:3000/admin | Manage products/orders |
| **Checkout** | http://localhost:3000/checkout | Place orders |
| **Prisma Studio** | http://localhost:5555 | Database GUI |

## 📡 API Endpoints Cheat Sheet

### Products
```
GET    /api/products              # List all
GET    /api/products?featured=true # Featured only
GET    /api/products?new=true      # New only
GET    /api/products?category=slug # By collection
GET    /api/products/[slug]        # Single product
POST   /api/products               # Create (Admin)
PUT    /api/products/[slug]        # Update (Admin)
DELETE /api/products/[slug]        # Delete (Admin)
```

### Collections
```
GET    /api/collections        # List all
GET    /api/collections/[slug] # Single collection
POST   /api/collections        # Create (Admin)
PUT    /api/collections/[slug] # Update (Admin)
DELETE /api/collections/[slug] # Delete (Admin)
```

### Orders
```
GET    /api/orders     # List all (Admin)
GET    /api/orders/[id] # Single order
POST   /api/orders      # Create new order
PUT    /api/orders/[id] # Update status (Admin)
```

## 💻 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma Client
npm run db:push          # Push schema to database
npm run db:migrate       # Create migration
npm run db:seed          # Add sample data
npm run db:studio        # Open database GUI

# Other
npm run lint             # Check code quality
```

## 🗄️ Database Schema Quick View

```
Product
├── id, name, slug
├── description, price
├── images[], stock
├── notes (JSON)
├── isFeatured, isNew
└── categoryId → Collection

Collection
├── id, name, slug
├── description, image
└── products[]

Order
├── id, userId, total, status
├── customerName, customerEmail
├── address (JSON)
└── items[] → OrderItem

OrderItem
├── id, orderId, productId
├── quantity, price
└── product → Product

User
├── id, email, password
└── role (USER/ADMIN)
```

## 🎯 Sample Data Included

**Collections:**
- Men's Collection
- Women's Collection
- Unisex Collection

**Products (8 total):**
- Midnight Oud (₹12,500)
- Rose Noir (₹11,000)
- Citrus Breeze (₹9,500)
- Velvet Vanilla (₹10,500)
- Leather & Tobacco (₹13,000)
- Jasmine Dream (₹10,000)
- Aqua Marine (₹9,000)
- Spice Bazaar (₹11,500)

**Admin User:**
- Email: admin@zokuperfume.com
- Password: admin123

## 🔧 Frontend API Usage

```typescript
// Import utilities
import { productAPI, orderAPI, formatPrice } from '@/lib/api';

// Get all products
const products = await productAPI.getAll();

// Get featured products
const featured = await productAPI.getAll({ featured: 'true' });

// Get single product
const product = await productAPI.getBySlug('midnight-oud');

// Create order
const order = await orderAPI.create({
  items: [{ productId: 'xxx', quantity: 2 }],
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

// Format price
const formatted = formatPrice(12500); // "₹12,500"
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Prisma Client error | Run `npm run db:generate` |
| Database connection error | Check DATABASE_URL in .env |
| No data showing | Run `npm run db:seed` |
| Migration error | Run `npx prisma migrate reset` |
| Port 3000 in use | Kill process or use different port |

## 📁 Key Files

```
prisma/
├── schema.prisma          # Database schema
└── seed.ts                # Sample data

src/app/api/
├── products/route.ts      # Products API
├── collections/route.ts   # Collections API
└── orders/route.ts        # Orders API

src/lib/
├── prisma.ts              # Database client
└── api.ts                 # API utilities

src/types/
└── index.ts               # TypeScript types

.env                       # Environment variables
BACKEND_SETUP.md           # Full documentation
setup-database.ps1         # Quick setup script
```

## 🎨 Order Status Values

- `PENDING` - Order placed, awaiting payment
- `PAID` - Payment received
- `SHIPPED` - Order shipped
- `DELIVERED` - Order delivered
- `CANCELLED` - Order cancelled

## 🔐 Environment Variables

```env
# Required
DATABASE_URL="postgresql://..."

# Optional (for future features)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

## 📚 Documentation Files

1. **BACKEND_COMPLETE.md** - Complete overview
2. **BACKEND_SETUP.md** - Detailed setup guide
3. **QUICK_REFERENCE.md** - This file
4. **README.md** - Project overview

## 🎉 Testing Checklist

- [ ] Run `npm run dev`
- [ ] Visit http://localhost:3000/api-test
- [ ] Click "Test Products API"
- [ ] Click "Test Collections API"
- [ ] Visit http://localhost:3000/admin
- [ ] View products and collections
- [ ] Add item to cart
- [ ] Complete checkout
- [ ] View order confirmation
- [ ] Check order in admin dashboard

## 💡 Pro Tips

1. Use Prisma Studio to view/edit data visually
2. Check `/api-test` page first to verify backend
3. Admin dashboard shows real-time data
4. All prices are in paise (multiply by 100)
5. Stock automatically decreases on order
6. Use meaningful slugs for SEO

## 🚀 Deployment (Production)

**Recommended: Vercel + Neon**

1. Push code to GitHub
2. Import to Vercel
3. Add DATABASE_URL to environment variables
4. Deploy!

**Database Options:**
- Neon (PostgreSQL) - Free tier
- Supabase - Free tier
- Railway - Free tier
- PlanetScale - Free tier

---

**Need Help?** Check BACKEND_SETUP.md for detailed instructions!
