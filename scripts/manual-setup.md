# Manual Setup Guide

If the automated setup script fails, follow these manual steps:

## 1. Prerequisites Check

### Check Node.js
```bash
node --version  # Should be 18+
npm --version   # Should be 9+
```

### Check PostgreSQL
```bash
psql --version  # Should be 14+
```

## 2. Install Dependencies Manually

### Root Dependencies
```bash
# From the project root
npm install
```

### Frontend Dependencies
```bash
cd apps/frontend
npm install
cd ../..
```

### Backend Dependencies
```bash
cd apps/backend
npm install
cd ../..
```

### Database Dependencies
```bash
cd packages/database
npm install
cd ../..
```

### Shared Dependencies
```bash
cd packages/shared
npm install
cd ../..
```

## 3. Build Shared Package

```bash
cd packages/shared
npm run build
cd ../..
```

## 4. Setup Environment

```bash
# Copy environment template
cp env.example .env

# Edit the .env file with your settings
nano .env
```

## 5. Setup Database

```bash
# Create PostgreSQL database
createdb poultry_marketplace

# Generate Prisma client
cd packages/database
npx prisma generate
cd ../..

# Setup database schema
npm run db:setup
```

## 6. Start Development

```bash
# Start both frontend and backend
npm run dev
```

## Common Issues and Solutions

### Issue: "Cannot find module" errors
**Solution:**
```bash
# Clean and reinstall
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
npm install
```

### Issue: TypeScript compilation errors
**Solution:**
```bash
# Install TypeScript globally
npm install -g typescript

# Rebuild shared package
cd packages/shared
npm run build
cd ../..
```

### Issue: PostgreSQL connection errors
**Solution:**
```bash
# Start PostgreSQL service
# macOS:
brew services start postgresql

# Ubuntu:
sudo systemctl start postgresql

# Check if PostgreSQL is running
psql -l
```

### Issue: Port already in use
**Solution:**
```bash
# Kill processes on ports 3000 and 5000
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

### Issue: Permission errors
**Solution:**
```bash
# Fix permissions
chmod +x scripts/setup.sh
chmod -R 755 .
```

## Alternative: Step-by-Step Setup

If you're still having issues, try this minimal setup:

### 1. Basic Setup
```bash
# Install only root dependencies
npm install

# Create .env file manually
cat > .env << EOF
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
DATABASE_URL="postgresql://username:password@localhost:5432/poultry_marketplace"
JWT_SECRET=your-secret-key-here
EOF
```

### 2. Start Frontend Only
```bash
cd apps/frontend
npm install
npm run dev
```

### 3. Start Backend Only (in another terminal)
```bash
cd apps/backend
npm install
npm run dev
```

## Verification

After setup, verify everything is working:

1. **Frontend**: http://localhost:3000
2. **Backend**: http://localhost:5000/health
3. **Database**: Run `npm run db:studio` and visit http://localhost:5555

## Getting Help

If you're still experiencing issues:

1. Check the error messages carefully
2. Ensure all prerequisites are installed
3. Try the manual setup steps above
4. Check the project documentation in `docs/`
5. Verify your environment configuration

## Quick Commands Reference

```bash
# Development
npm run dev              # Start all servers
npm run dev:frontend     # Frontend only
npm run dev:backend      # Backend only

# Database
npm run db:setup         # Setup database
npm run db:generate      # Generate Prisma client
npm run db:studio        # Open database viewer

# Build
npm run build            # Build all packages
npm run clean            # Clean build artifacts

# Linting
npm run lint             # Run linting
npm run lint:fix         # Fix linting issues
``` 