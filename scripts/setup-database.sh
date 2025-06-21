#!/bin/bash

echo "🐘 Setting up PostgreSQL database for Poultry Marketplace..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    echo "   Visit: https://www.postgresql.org/download/"
    exit 1
fi

# Check if PostgreSQL service is running
if ! pg_isready -q; then
    echo "❌ PostgreSQL service is not running. Please start PostgreSQL first."
    echo "   On macOS: brew services start postgresql"
    echo "   On Ubuntu: sudo systemctl start postgresql"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Create database
echo "📦 Creating database 'poultry_marketplace'..."
createdb poultry_marketplace 2>/dev/null || echo "Database already exists"

# Create .env file with database configuration
echo "🔧 Creating .env file..."
cat > .env << 'EOF'
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/poultry_marketplace"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here-change-this-in-production"

# Backend
PORT=5001
NODE_ENV=development
EOF

echo "✅ Database setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update the DATABASE_URL in .env if your PostgreSQL credentials are different"
echo "2. Run: npm run db:generate"
echo "3. Run: npm run db:migrate"
echo "4. Run: npm run seed:products"
echo "5. Start the app: npm run dev" 