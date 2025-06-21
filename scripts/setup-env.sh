#!/bin/bash

# Environment Setup Script for Poultry Marketplace
# This script helps set up the .env file with default values

echo "🔧 Setting up environment variables..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Generate a random JWT secret
generate_jwt_secret() {
    openssl rand -base64 32 2>/dev/null || echo "your-super-secret-jwt-key-$(date +%s)"
}

# Get PostgreSQL username
get_postgres_username() {
    # Try to get the current user
    if command -v whoami &> /dev/null; then
        whoami
    else
        echo "postgres"
    fi
}

# Create .env file with default values
create_env_file() {
    print_status "Creating .env file with default values..."
    
    # Get current user for PostgreSQL
    PG_USER=$(get_postgres_username)
    
    # Generate JWT secret
    JWT_SECRET=$(generate_jwt_secret)
    
    cat > .env << EOF
# Application
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://${PG_USER}@localhost:5432/poultry_marketplace"

# JWT Authentication
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=${JWT_SECRET}-refresh
JWT_REFRESH_EXPIRES_IN=30d

# Firebase Authentication (Optional - uncomment and configure if using Firebase)
# FIREBASE_PROJECT_ID=your-firebase-project-id
# FIREBASE_PRIVATE_KEY=your-firebase-private-key
# FIREBASE_CLIENT_EMAIL=your-firebase-client-email

# Cloudinary (Optional - uncomment and configure if using Cloudinary)
# CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
# CLOUDINARY_API_KEY=your-cloudinary-api-key
# CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Stripe (Optional - uncomment and configure if using Stripe)
# STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
# STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
# STRIPE_WEBHOOK_SECRET=whsec_your-stripe-webhook-secret

# Redis (Optional - uncomment and configure if using Redis)
# REDIS_URL=redis://localhost:6379

# Email (Optional - uncomment and configure if using email)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# SMTP_FROM=noreply@poultrymarketplace.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=${JWT_SECRET}-session

# Development
DEBUG=true
ENABLE_SWAGGER=true
ENABLE_CORS=true
EOF

    print_success ".env file created successfully!"
}

# Instructions for PostgreSQL setup
show_postgres_instructions() {
    echo ""
    echo "📋 PostgreSQL Setup Instructions:"
    echo "=================================="
    echo ""
    echo "1. Start PostgreSQL service:"
    echo "   brew services start postgresql"
    echo ""
    echo "2. Create the database:"
    echo "   createdb poultry_marketplace"
    echo ""
    echo "3. If you get permission errors, try:"
    echo "   sudo -u postgres createdb poultry_marketplace"
    echo ""
    echo "4. Or create a user and database:"
    echo "   createuser -s your_username"
    echo "   createdb -O your_username poultry_marketplace"
    echo ""
    echo "5. Update DATABASE_URL in .env if needed:"
    echo "   DATABASE_URL=\"postgresql://username:password@localhost:5432/poultry_marketplace\""
    echo ""
}

# Main function
main() {
    echo "🐔 Poultry Marketplace Environment Setup"
    echo "========================================"
    echo ""
    
    # Check if .env already exists
    if [ -f .env ]; then
        print_warning ".env file already exists!"
        read -p "Do you want to overwrite it? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_status "Keeping existing .env file"
            show_postgres_instructions
            exit 0
        fi
    fi
    
    # Create .env file
    create_env_file
    
    # Show PostgreSQL instructions
    show_postgres_instructions
    
    echo ""
    print_success "Environment setup completed!"
    echo ""
    echo "Next steps:"
    echo "1. Start PostgreSQL: brew services start postgresql"
    echo "2. Create database: createdb poultry_marketplace"
    echo "3. Setup database: npm run db:setup"
    echo "4. Start development: npm run dev"
    echo ""
    echo "Your .env file is ready with default values for local development."
    echo "Update the values as needed for your specific setup."
}

# Run main function
main "$@" 