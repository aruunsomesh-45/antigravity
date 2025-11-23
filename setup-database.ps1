# Quick Database Setup Script for Zoku Perfume Backend

Write-Host "🌟 Zoku Perfume - Database Setup" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
    Write-Host "`nCreating .env file template..." -ForegroundColor Yellow
    
    $envContent = @"
# Database Configuration
# Replace with your actual database URL
DATABASE_URL="postgresql://username:password@localhost:5432/zoku_perfume?schema=public"

# For cloud databases (Neon, Supabase, Railway), use their connection string
# Example: DATABASE_URL="postgresql://user:pass@host.region.provider.com/dbname?sslmode=require"

# NextAuth Configuration (optional)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="change-this-to-a-random-secret-in-production"
"@
    
    Set-Content -Path ".env" -Value $envContent
    Write-Host "✅ Created .env file template" -ForegroundColor Green
    Write-Host "`n⚠️  IMPORTANT: Please edit .env file and add your DATABASE_URL" -ForegroundColor Yellow
    Write-Host "   You can use a free PostgreSQL database from:" -ForegroundColor Yellow
    Write-Host "   - Neon: https://neon.tech" -ForegroundColor Cyan
    Write-Host "   - Supabase: https://supabase.com" -ForegroundColor Cyan
    Write-Host "   - Railway: https://railway.app`n" -ForegroundColor Cyan
    
    $continue = Read-Host "Have you updated the DATABASE_URL in .env? (y/n)"
    if ($continue -ne "y") {
        Write-Host "`n❌ Please update .env file and run this script again" -ForegroundColor Red
        exit
    }
}

Write-Host "`n📦 Step 1: Installing dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit
}
Write-Host "✅ Dependencies installed`n" -ForegroundColor Green

Write-Host "🔧 Step 2: Generating Prisma Client..." -ForegroundColor Cyan
npm run db:generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma Client" -ForegroundColor Red
    Write-Host "   Please check your DATABASE_URL in .env file" -ForegroundColor Yellow
    exit
}
Write-Host "✅ Prisma Client generated`n" -ForegroundColor Green

Write-Host "🗄️  Step 3: Pushing database schema..." -ForegroundColor Cyan
npm run db:push
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push database schema" -ForegroundColor Red
    Write-Host "   Please check your database connection" -ForegroundColor Yellow
    exit
}
Write-Host "✅ Database schema created`n" -ForegroundColor Green

Write-Host "🌱 Step 4: Seeding database with sample data..." -ForegroundColor Cyan
npm run db:seed
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to seed database" -ForegroundColor Red
    exit
}
Write-Host "✅ Database seeded with sample data`n" -ForegroundColor Green

Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "==================`n" -ForegroundColor Green

Write-Host "Your backend is ready! Here's what was created:" -ForegroundColor Cyan
Write-Host "  • 3 Collections (Men's, Women's, Unisex)" -ForegroundColor White
Write-Host "  • 8 Sample Products" -ForegroundColor White
Write-Host "  • 1 Admin User (email: admin@zokuperfume.com, password: admin123)`n" -ForegroundColor White

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Start dev server: npm run dev" -ForegroundColor White
Write-Host "  2. Visit: http://localhost:3000" -ForegroundColor White
Write-Host "  3. Admin dashboard: http://localhost:3000/admin" -ForegroundColor White
Write-Host "  4. API docs: See BACKEND_SETUP.md`n" -ForegroundColor White

Write-Host "Optional: Open Prisma Studio to view/edit database:" -ForegroundColor Yellow
Write-Host "  npm run db:studio`n" -ForegroundColor White
