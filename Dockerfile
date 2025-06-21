# Stage 1: Builder
FROM node:18-slim AS builder

# Set working directory
WORKDIR /app

# Copy root package files and install all dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy monorepo packages and apps
COPY packages ./packages
COPY apps ./apps

# Set prisma schema location for generate
ENV PRISMA_SCHEMA_PATH=./packages/database/prisma/schema.prisma

# Generate Prisma client
RUN npx prisma generate --schema=$PRISMA_SCHEMA_PATH

# Build the backend application
RUN npm run build --workspace=@poultry-marketplace/backend

# Prune development dependencies for the final stage
RUN npm prune --omit=dev


# Stage 2: Production
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy pruned node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy built backend app from builder
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# Copy the backend's package.json
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json

# Copy prisma schema for runtime
COPY --from=builder /app/packages/database/prisma/schema.prisma ./packages/database/prisma/

# Expose the application port
EXPOSE 5001

# Define the startup command
CMD [ "npm", "start", "--workspace=@poultry-marketplace/backend" ] 