# Poultry Marketplace Frontend

This is the frontend application for the Poultry Marketplace, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🔐 Authentication with Firebase (Email/Password + Google)
- 🛍️ Product browsing and filtering
- 🐔 Specialized categories for hens and eggs
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Setup Instructions

### 1. Firebase Configuration

Create a `.env.local` file in the `apps/frontend` directory with your Firebase configuration:

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

### 2. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google sign-in
4. Get your configuration:
   - Go to Project Settings
   - Scroll down to "Your apps"
   - Add a web app if you haven't already
   - Copy the configuration values to your `.env.local` file

### 3. Running the Application

```bash
# Install dependencies (from root directory)
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3001`

## Available Pages

- `/` - Home page with navigation
- `/auth/login` - Login page
- `/auth/signup` - Signup page
- `/auth/forgot-password` - Password reset page
- `/products` - Products browsing page
- `/dashboard` - User dashboard (requires authentication)

## Authentication Flow

1. Users can sign up with email/password or Google
2. After successful authentication, users are redirected to `/dashboard`
3. The dashboard shows user stats and quick actions
4. Users can sign out from the dashboard

## Product Categories

- **Live Poultry**: Laying hens, broilers, baby chicks
- **Eggs**: Chicken eggs, duck eggs, quail eggs

## Development

The application uses:
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Firebase for authentication
- Lucide React for icons
- React Hook Form for form handling

## File Structure

```
app/
├── auth/
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── forgot-password/page.tsx
├── dashboard/page.tsx
├── products/page.tsx
└── page.tsx (home)
lib/
└── firebase.ts
``` 