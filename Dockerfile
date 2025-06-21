# Stage 1: Builder
FROM node:18-slim AS builder

WORKDIR /app

# Copy root package files first to leverage Docker cache
COPY package.json package-lock.json* ./
# We use --omit=dev here already because we only need production deps to build
RUN npm install --omit=dev

# Copy the rest of the monorepo source code
COPY . .

# Generate the Prisma client with the required binary target
RUN npx prisma generate

# Build the backend application
RUN npm run build --workspace=@poultry-marketplace/backend

# Stage 2: Production
FROM node:18-slim

# Prisma requires OpenSSL
RUN apt-get update && apt-get install -y openssl-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy production dependencies and package files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json

# Copy the compiled backend code
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# Copy the Prisma schema and the generated client
COPY --from=builder /app/packages/database/prisma/schema.prisma ./packages/database/prisma/
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client

# Copy tsconfig for path resolution at runtime
COPY --from=builder /app/apps/backend/tsconfig.prod.json ./apps/backend/tsconfig.prod.json

# Set TS_NODE_PROJECT so tsconfig-paths knows which config to use
ENV TS_NODE_PROJECT=./apps/backend/tsconfig.prod.json

# Expose the correct port Render expects
EXPOSE 10000

# The start command is now handled by render.yaml's startCommand
# This CMD is now a fallback for running the container locally
CMD [ "node", "-r", "tsconfig-paths/register", "apps/backend/dist/index.js" ] 