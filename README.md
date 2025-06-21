# 🐔 Poultry Marketplace

A modern bidding and e-commerce platform for poultry products (hens, chickens, eggs) built with Next.js, Node.js, and PostgreSQL.

## 🚀 Features

- **Real-time Bidding System**: Live auctions with automatic bid validation
- **E-commerce Integration**: Direct purchase options alongside bidding
- **User Authentication**: Secure login with Firebase Auth or JWT
- **Mobile Responsive**: Optimized for all device sizes
- **Admin Dashboard**: Complete product and user management
- **Real-time Notifications**: Live updates for bids and auctions
- **Payment Integration**: Secure payment processing with Stripe

## 🏗️ Project Structure

```
poultry-marketplace/
├── apps/
│   ├── frontend/          # Next.js frontend application
│   └── backend/           # Node.js Express backend API
├── packages/
│   ├── database/          # Database schema and migrations
│   ├── shared/            # Shared types and utilities
│   └── ui/               # Reusable UI components
├── docs/                 # Documentation
└── scripts/              # Build and deployment scripts
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Firebase Auth / JWT
- **Real-time**: Socket.io
- **Payment**: Stripe
- **File Upload**: Cloudinary
- **Deployment**: Vercel + Railway

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn
- Git

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd poultry-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   npm run db:setup
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Mobile phones (320px - 768px)
- Tablets (768px - 1024px)
- Desktop (1024px+)

## 🔐 Authentication

Choose between:
- **Firebase Auth**: Google, email/password, phone authentication
- **JWT**: Custom JWT-based authentication system

## 💳 Payment Integration

- Stripe for secure payment processing
- Support for credit cards, digital wallets
- Automated invoice generation

## 📊 Database Schema

Key entities:
- Users (buyers, sellers, admins)
- Products (hens, chickens, eggs)
- Auctions (bidding sessions)
- Bids (bid history)
- Orders (purchases)
- Payments (transaction records)

## 🚀 Deployment

- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Railway or Render
- **Database**: Managed PostgreSQL service

## 📝 License

MIT License - see LICENSE file for details 