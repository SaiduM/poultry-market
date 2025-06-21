# Dockerfile for the backend service
# This file should be built from the root of the monorepo.

# 1. Base image for installing dependencies
FROM node:18-alpine AS deps

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# 2. Base image for building the application
FROM node:18-alpine AS builder

WORKDIR /app
# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
# Copy all source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the backend workspace
RUN npm run build --workspace=@poultry-marketplace/backend

# 3. Final production image
FROM node:18-alpine

WORKDIR /app

# Only copy necessary production files from the builder stage
# This creates a much smaller final image

# Copy production node_modules
COPY --from=builder /app/node_modules ./node_modules
# Copy backend's dist folder
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
# Copy backend's package.json to be able to run npm start
COPY ./apps/backend/package.json ./apps/backend/package.json
# Copy prisma schema for runtime
COPY ./packages/database/prisma ./packages/database/prisma

EXPOSE 5000

# The command to start the backend service
CMD ["npm", "run", "start", "--workspace", "@poultry-marketplace/backend"] 