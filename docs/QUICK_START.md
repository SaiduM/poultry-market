# 🚀 Quick Start Guide

Get the Poultry Marketplace up and running in minutes!

## 📋 Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm 9+** - Comes with Node.js
- **PostgreSQL 14+** - [Download here](https://www.postgresql.org/download/)
- **Git** - [Download here](https://git-scm.com/)

## ⚡ Quick Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd poultry-marketplace
```

### 2. Run the Setup Script
```bash
./scripts/setup.sh
```

This script will:
- ✅ Check prerequisites
- ✅ Install all dependencies
- ✅ Set up environment files
- ✅ Create necessary directories
- ✅ Configure Git hooks
- ✅ Build shared packages

### 3. Configure Environment
```bash
# Copy the example environment file
cp env.example .env

# Edit the environment file with your settings
nano .env
```

**Required Environment Variables:**
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/poultry_marketplace"

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 4. Set Up Database
```bash
# Create PostgreSQL database
createdb poultry_marketplace

# Run database setup
npm run db:setup
```

### 5. Start Development Servers
```bash
# Start both frontend and backend
npm run dev
```

## 🌐 Access Your Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **Prisma Studio**: http://localhost:5555 (run `npm run db:studio`)

## 🛠️ Development Commands

### Root Level Commands
```bash
npm run dev              # Start all development servers
npm run build            # Build all packages
npm run lint             # Run linting across all packages
npm run test             # Run tests across all packages
npm run clean            # Clean all build artifacts
```

### Frontend Commands
```bash
npm run dev:frontend     # Start frontend only
npm run build:frontend   # Build frontend
npm run start:frontend   # Start production frontend
```

### Backend Commands
```bash
npm run dev:backend      # Start backend only
npm run build:backend    # Build backend
npm run start:backend    # Start production backend
```

### Database Commands
```bash
npm run db:setup         # Set up database schema
npm run db:migrate       # Run database migrations
npm run db:generate      # Generate Prisma client
npm run db:seed          # Seed database with sample data
npm run db:studio        # Open Prisma Studio
```

## 📱 Mobile Responsiveness Testing

### Browser DevTools
1. Open Chrome DevTools (F12)
2. Click the device toggle button
3. Test different device sizes:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - Desktop (1024px+)

### Real Device Testing
- Test on actual mobile devices
- Check touch interactions
- Verify loading performance
- Test different browsers

## 🔧 Configuration Options

### Authentication
Choose between Firebase Auth or JWT:

**Firebase Auth:**
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

**JWT Auth:**
```env
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
```

### File Upload
Choose between Cloudinary or AWS S3:

**Cloudinary:**
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**AWS S3:**
```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

### Payments
```env
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
```

## 🧪 Testing

### Run All Tests
```bash
npm run test
```

### Run Specific Tests
```bash
# Frontend tests
cd apps/frontend && npm test

# Backend tests
cd apps/backend && npm test
```

### E2E Testing
```bash
# Install Playwright
npx playwright install

# Run E2E tests
npx playwright test
```

## 📦 Building for Production

### Build All Packages
```bash
npm run build
```

### Deploy Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/frontend
vercel
```

### Deploy Backend (Railway/Render)
```bash
# Build backend
cd apps/backend
npm run build

# Deploy to your preferred platform
```

## 🔍 Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**Database Connection Issues:**
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Start PostgreSQL
brew services start postgresql
```

**Node Modules Issues:**
```bash
# Clean and reinstall
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
npm install
```

**Prisma Issues:**
```bash
# Reset Prisma
cd packages/database
npx prisma generate
npx prisma db push
```

### Getting Help

1. Check the [Project Plan](PROJECT_PLAN.md) for detailed information
2. Review the [README](../README.md) for project overview
3. Check the logs for error messages
4. Ensure all environment variables are set correctly

## 🎯 Next Steps

After successful setup:

1. **Explore the Codebase**
   - Check out the project structure
   - Review the database schema
   - Understand the API endpoints

2. **Start Development**
   - Create your first component
   - Add a new API endpoint
   - Implement a new feature

3. **Customize**
   - Update the design system
   - Modify the database schema
   - Add new payment methods

4. **Deploy**
   - Set up CI/CD pipelines
   - Configure production environment
   - Deploy to your preferred platform

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

Happy coding! 🐔✨ 