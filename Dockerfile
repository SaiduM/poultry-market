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

# Copy the root package.json. This is ESSENTIAL for the `npm --workspace` command to work.
COPY --from=builder /app/package.json ./

# Copy pruned node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy built backend app from builder
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# Copy the backend's package.json
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json

# Copy the backend's tsconfig.json so tsconfig-paths can resolve aliases. THIS IS THE KEY FIX.
COPY --from=builder /app/apps/backend/tsconfig.json ./apps/backend/

# Copy prisma schema for runtime
COPY --from=builder /app/packages/database/prisma/schema.prisma ./packages/database/prisma/

# Set the node path to the compiled output directory
# This allows aliased paths (like @/...) to be resolved at runtime.
ENV NODE_PATH=./apps/backend/dist

# Expose the application port
EXPOSE 5001

# Run database migrations and then start the server.
# This ensures the database is always in sync with the application code.
CMD ["sh", "-c", "npx prisma migrate deploy && node -r tsconfig-paths/register apps/backend/dist/index.js"] 