# Poultry Marketplace Setup Guide

This guide will help you set up the complete poultry marketplace with authentication and products functionality.

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Firebase project (for authentication)

## 1. Database Setup

### 1.1 Install PostgreSQL
- Install PostgreSQL on your system
- Create a new database for the project

### 1.2 Configure Database Connection
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/poultry_marketplace"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# Backend
PORT=5001
NODE_ENV=development
```

### 1.3 Run Database Migrations
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate
```

## 2. Firebase Setup

### 2.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google sign-in
4. Get your configuration:
   - Go to Project Settings
   - Add a web app
   - Copy the configuration values

### 2.2 Configure Firebase in Frontend
Create a `.env.local` file in `apps/frontend/`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5001
```

## 3. Install Dependencies

```bash
# Install all dependencies
npm install
```

## 4. Seed Sample Data

```bash
# Seed the database with sample products
npm run seed:products
```

This will create:
- A sample seller user (email: seller@example.com, password: password123)
- 10 sample products (eggs and hens)

## 5. Start the Application

```bash
# Start both frontend and backend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3001
- Backend API: http://localhost:5001

## 6. Available Features

### Authentication
- **Login Page**: `/auth/login`
  - Email/password authentication
  - Google authentication
  - Forgot password link

- **Signup Page**: `/auth/signup`
  - User registration with email/password
  - Google signup
  - Form validation

- **Forgot Password**: `/auth/forgot-password`
  - Password reset via email

### Products
- **Products Page**: `/products`
  - Browse all products
  - Filter by category (Live Poultry, Eggs)
  - Filter by subcategory (Laying Hens, Chicken Eggs, etc.)
  - Search functionality
  - Sort by price, rating, name
  - Product cards with images, prices, stock status

- **Dashboard**: `/dashboard` (requires authentication)
  - User statistics
  - Quick actions
  - Recent activity
  - Sign out functionality

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user

#### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (authenticated)
- `PUT /api/products/:id` - Update product (authenticated)
- `DELETE /api/products/:id` - Delete product (authenticated)
- `GET /api/products/categories/list` - Get categories

## 7. Sample Data

The seed script creates the following products:

### Eggs
- Fresh Farm Eggs ($4.99/dozen)
- Jumbo Eggs ($5.99/dozen)
- Organic Eggs ($7.99/dozen)
- Duck Eggs ($8.99/dozen)
- Quail Eggs ($12.99/dozen)

### Live Poultry
- Brown Laying Hens ($25.00/each)
- White Leghorn Hens ($28.00/each)
- Rhode Island Red Hens ($30.00/each)
- Baby Chicks ($3.50/each)
- Broiler Chickens ($15.00/each)

## 8. Testing the Application

1. **Visit the homepage**: http://localhost:3001
2. **Browse products**: Click "Browse Products" or go to `/products`
3. **Test authentication**:
   - Go to `/auth/signup` to create an account
   - Or use Google authentication
   - Login at `/auth/login`
4. **Access dashboard**: After login, you'll be redirected to `/dashboard`

## 9. Development

### Frontend Structure
```
apps/frontend/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── dashboard/page.tsx
│   ├── products/page.tsx
│   └── page.tsx (home)
├── lib/
│   └── firebase.ts
└── components/
```

### Backend Structure
```
apps/backend/
├── src/
│   ├── routes/
│   │   ├── auth.ts
│   │   └── products.ts
│   ├── middleware/
│   │   └── auth.ts
│   └── index.ts
```

## 10. Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your DATABASE_URL in `.env`
   - Ensure PostgreSQL is running
   - Verify database exists

2. **Firebase Authentication Not Working**
   - Check Firebase configuration in `.env.local`
   - Ensure Google sign-in is enabled in Firebase console
   - Verify domain is authorized

3. **Products Not Loading**
   - Run the seed script: `npm run seed:products`
   - Check backend logs for errors
   - Verify database has data

4. **Port Already in Use**
   - Change ports in package.json scripts
   - Kill existing processes on ports 3001/5001

### Logs
- Frontend logs: Check browser console
- Backend logs: Check terminal where `npm run dev:backend` is running

## 11. Next Steps

To extend the application, consider adding:
- Shopping cart functionality
- Order management
- Payment integration (Stripe)
- Real-time bidding system
- Image upload for products
- User reviews and ratings
- Admin panel
- Email notifications

## Support

If you encounter any issues, check the logs and ensure all prerequisites are properly configured. 