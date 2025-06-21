# Poultry Marketplace - Setup Guide

This guide provides instructions to set up and run the Poultry Marketplace, a simple e-commerce platform for selling hens and eggs.

## Project Overview

- **Monorepo**: Managed with npm workspaces.
- **Frontend**: Next.js (in `apps/frontend`) - Deployed on Vercel.
- **Backend**: Express.js (in `apps/backend`) - Deployed on Render.
- **Database**: PostgreSQL, managed with Prisma.

## 1. Local Setup

### Prerequisites
- Node.js (v18 or newer)
- npm (v9 or newer)
- A running PostgreSQL instance

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd poultry-marketplace
```

### Step 2: Install Dependencies
This command installs dependencies for the entire monorepo.
```bash
npm install
```

### Step 3: Set Up Environment Variables

**A. Backend (`.env`)**

Create a file named `.env` in the root of the project and add the following:

```env
# 1. Database Connection
# Replace with your actual PostgreSQL connection string
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/poultry_db"

# 2. Server Port (Optional, defaults to 5001)
PORT=5001

# 3. Environment
NODE_ENV=development

# 4. Firebase Admin Credentials (Optional, for authentication)
# Required for user creation and login. Can be left blank for development if
# you only need to access public product endpoints.
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
```

**B. Frontend (`apps/frontend/.env.local`)**

Create a file named `.env.local` inside the `apps/frontend` directory:

```env
# 1. Backend API URL
# This tells the frontend where the backend is running.
NEXT_PUBLIC_API_URL=http://localhost:5001

# 2. Firebase Client SDK (Optional, for authentication)
# Required for the login/signup UI to work.
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

### Step 4: Prepare the Database
These commands will set up your database tables based on the schema and generate the Prisma client.
```bash
# Apply database migrations
npm run db:migrate

# Generate Prisma client (usually runs with migrate, but good to know)
npm run db:generate
```

### Step 5: Seed with Sample Data (Optional)
To populate the database with sample users and products (hens and eggs), run:
```bash
npm run seed:products
```

### Step 6: Run the Application
This command starts both the frontend and backend servers concurrently.
```bash
npm run dev
```
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:5001](http://localhost:5001)
- **Backend Health Check**: [http://localhost:5001/health](http://localhost:5001/health)

---

## 2. Deployment

### Frontend (Vercel)
1.  Connect your Git repository to a new Vercel project.
2.  Vercel will automatically detect it as a Next.js application.
3.  Set the **Root Directory** to `apps/frontend`.
4.  Add your production environment variables (e.g., `NEXT_PUBLIC_API_URL` pointing to your live Render backend URL).
5.  Deploy!

### Backend (Render)
This project is configured for "Infrastructure as Code" deployment on Render using the `render.yaml` and `Dockerfile` in the repository.

1.  Go to your Render Dashboard.
2.  Click **New > Blueprint Instance**.
3.  Connect the Git repository for this project.
4.  Render will automatically read the `render.yaml` file and configure the backend service and PostgreSQL database.
5.  **Important**: You must add your production secrets (like `DATABASE_URL` and Firebase credentials) as environment variables in the Render service settings. The `render.yaml` is configured to use a new database, so Render will provide the `DATABASE_URL` for you.
6.  Deploy the latest commit. Render will use the provided `Dockerfile` to build and run the backend service. 