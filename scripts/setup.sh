#!/bin/bash

# Poultry Marketplace Setup Script
# This script sets up the monorepo with all necessary dependencies and configurations

set -e

echo "🐔 Setting up Poultry Marketplace..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        print_error "Visit: https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node -v)"
        print_error "Please upgrade Node.js to version 18 or higher."
        exit 1
    fi
    
    print_success "Node.js version: $(node -v)"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_success "npm version: $(npm -v)"
}

# Check if PostgreSQL is installed
check_postgres() {
    if ! command -v psql &> /dev/null; then
        print_warning "PostgreSQL is not installed. You'll need to install it manually."
        print_warning "Visit: https://www.postgresql.org/download/"
        print_warning "For macOS: brew install postgresql"
        print_warning "For Ubuntu: sudo apt-get install postgresql postgresql-contrib"
    else
        print_success "PostgreSQL is installed"
    fi
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    
    # Create frontend directories
    mkdir -p apps/frontend/components
    mkdir -p apps/frontend/lib
    mkdir -p apps/frontend/hooks
    mkdir -p apps/frontend/types
    mkdir -p apps/frontend/utils
    mkdir -p apps/frontend/styles
    mkdir -p apps/frontend/app/sections
    mkdir -p apps/frontend/app/auth
    mkdir -p apps/frontend/app/products
    mkdir -p apps/frontend/app/auctions
    mkdir -p apps/frontend/app/dashboard
    mkdir -p apps/frontend/app/admin
    
    # Create backend directories
    mkdir -p apps/backend/src/controllers
    mkdir -p apps/backend/src/middleware
    mkdir -p apps/backend/src/models
    mkdir -p apps/backend/src/routes
    mkdir -p apps/backend/src/services
    mkdir -p apps/backend/src/utils
    mkdir -p apps/backend/src/types
    mkdir -p apps/backend/src/config
    
    # Create shared directories
    mkdir -p packages/shared/src/utils
    mkdir -p packages/shared/src/constants
    
    # Create database directories
    mkdir -p packages/database/prisma/migrations
    
    print_success "Directories created"
}

# Install root dependencies
install_root_deps() {
    print_status "Installing root dependencies..."
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in root directory"
        exit 1
    fi
    
    # Install dependencies with error handling
    if ! npm install; then
        print_error "Failed to install root dependencies"
        print_warning "Trying with --legacy-peer-deps..."
        if ! npm install --legacy-peer-deps; then
            print_error "Failed to install dependencies even with --legacy-peer-deps"
            exit 1
        fi
    fi
    
    print_success "Root dependencies installed"
}

# Install workspace dependencies
install_workspace_deps() {
    print_status "Installing workspace dependencies..."
    
    # Install frontend dependencies
    if [ -f "apps/frontend/package.json" ]; then
        print_status "Installing frontend dependencies..."
        cd apps/frontend
        if ! npm install; then
            print_warning "Frontend dependencies installation failed, trying with --legacy-peer-deps..."
            npm install --legacy-peer-deps || print_error "Frontend dependencies installation failed"
        fi
        cd ../..
        print_success "Frontend dependencies installed"
    else
        print_warning "Frontend package.json not found"
    fi
    
    # Install backend dependencies
    if [ -f "apps/backend/package.json" ]; then
        print_status "Installing backend dependencies..."
        cd apps/backend
        if ! npm install; then
            print_warning "Backend dependencies installation failed, trying with --legacy-peer-deps..."
            npm install --legacy-peer-deps || print_error "Backend dependencies installation failed"
        fi
        cd ../..
        print_success "Backend dependencies installed"
    else
        print_warning "Backend package.json not found"
    fi
    
    # Install database dependencies
    if [ -f "packages/database/package.json" ]; then
        print_status "Installing database dependencies..."
        cd packages/database
        if ! npm install; then
            print_warning "Database dependencies installation failed, trying with --legacy-peer-deps..."
            npm install --legacy-peer-deps || print_error "Database dependencies installation failed"
        fi
        cd ../..
        print_success "Database dependencies installed"
    else
        print_warning "Database package.json not found"
    fi
    
    # Install shared dependencies
    if [ -f "packages/shared/package.json" ]; then
        print_status "Installing shared dependencies..."
        cd packages/shared
        if ! npm install; then
            print_warning "Shared dependencies installation failed, trying with --legacy-peer-deps..."
            npm install --legacy-peer-deps || print_error "Shared dependencies installation failed"
        fi
        cd ../..
        print_success "Shared dependencies installed"
    else
        print_warning "Shared package.json not found"
    fi
}

# Setup environment file
setup_env() {
    print_status "Setting up environment file..."
    
    if [ ! -f .env ]; then
        if [ -f env.example ]; then
            cp env.example .env
            print_success "Environment file created from template"
            print_warning "Please update .env with your actual configuration values"
        else
            print_warning "env.example not found, creating basic .env file"
            cat > .env << EOF
# Application
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/poultry_marketplace"

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000
EOF
            print_success "Basic environment file created"
        fi
    else
        print_warning "Environment file already exists"
    fi
}

# Build shared packages
build_shared() {
    print_status "Building shared packages..."
    
    if [ -f "packages/shared/package.json" ]; then
        cd packages/shared
        
        # Check if TypeScript is installed
        if ! npx tsc --version &> /dev/null; then
            print_warning "TypeScript not found, installing..."
            npm install typescript --save-dev
        fi
        
        # Try to build
        if ! npm run build; then
            print_warning "Shared package build failed, checking for issues..."
            
            # Check if source files exist
            if [ ! -f "src/index.ts" ]; then
                print_error "src/index.ts not found in shared package"
                cd ../..
                return 1
            fi
            
            # Try building with verbose output
            print_status "Trying to build with verbose output..."
            npx tsc --listFiles || print_error "TypeScript compilation failed"
            cd ../..
            return 1
        fi
        
        cd ../..
        print_success "Shared packages built"
    else
        print_warning "Shared package.json not found"
    fi
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    if [ -f "packages/database/package.json" ]; then
        cd packages/database
        
        # Generate Prisma client
        if command -v npx &> /dev/null; then
            if npx prisma generate; then
                print_success "Prisma client generated"
            else
                print_warning "Failed to generate Prisma client"
            fi
        else
            print_warning "npx not available, skipping Prisma client generation"
        fi
        
        cd ../..
        
        print_warning "To set up the database, run: npm run db:setup"
        print_warning "Make sure your DATABASE_URL is configured in .env"
    else
        print_warning "Database package.json not found"
    fi
}

# Setup Git hooks (optional)
setup_git_hooks() {
    print_status "Setting up Git hooks..."
    
    if [ -d .git ]; then
        # Create pre-commit hook for linting
        mkdir -p .git/hooks
        cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "Running pre-commit checks..."
npm run lint
if [ $? -ne 0 ]; then
    echo "Linting failed. Please fix the issues before committing."
    exit 1
fi
echo "Pre-commit checks passed!"
EOF
        
        chmod +x .git/hooks/pre-commit
        print_success "Git hooks configured"
    else
        print_warning "Not a Git repository. Skipping Git hooks setup."
    fi
}

# Check for common issues
check_common_issues() {
    print_status "Checking for common issues..."
    
    # Check for missing files
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in root directory"
        return 1
    fi
    
    if [ ! -f "apps/frontend/package.json" ]; then
        print_error "Frontend package.json not found"
        return 1
    fi
    
    if [ ! -f "apps/backend/package.json" ]; then
        print_error "Backend package.json not found"
        return 1
    fi
    
    # Check for missing dependencies
    if [ ! -d "node_modules" ]; then
        print_warning "node_modules not found, dependencies may not be installed"
    fi
    
    print_success "Common issues check completed"
}

# Display next steps
show_next_steps() {
    echo ""
    echo "🎉 Setup completed successfully!"
    echo "=================================="
    echo ""
    echo "Next steps:"
    echo "1. Update .env file with your configuration"
    echo "2. Set up PostgreSQL database"
    echo "3. Run: npm run db:setup"
    echo "4. Start development servers: npm run dev"
    echo ""
    echo "Development URLs:"
    echo "- Frontend: http://localhost:3000"
    echo "- Backend: http://localhost:5000"
    echo "- Health check: http://localhost:5000/health"
    echo ""
    echo "Useful commands:"
    echo "- npm run dev          # Start all development servers"
    echo "- npm run build        # Build all packages"
    echo "- npm run lint         # Run linting"
    echo "- npm run test         # Run tests"
    echo ""
    echo "Troubleshooting:"
    echo "- If you encounter issues, check the error messages above"
    echo "- Make sure PostgreSQL is running"
    echo "- Verify your .env configuration"
    echo "- Try running: npm run clean && npm install"
    echo ""
    echo "Documentation:"
    echo "- Project plan: docs/PROJECT_PLAN.md"
    echo "- Quick start: docs/QUICK_START.md"
    echo "- README: README.md"
    echo ""
}

# Main setup function
main() {
    echo "Starting Poultry Marketplace setup..."
    echo ""
    
    # Run all setup steps with error handling
    check_node || exit 1
    check_npm || exit 1
    check_postgres
    create_directories
    install_root_deps || exit 1
    install_workspace_deps
    setup_env
    build_shared || print_warning "Shared package build failed, but continuing..."
    setup_database
    setup_git_hooks
    check_common_issues || print_warning "Some issues detected, but setup can continue"
    
    show_next_steps
}

# Run main function
main "$@" 