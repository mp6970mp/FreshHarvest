# Build stage for client
FROM node:20-alpine AS client-builder

WORKDIR /app/client

# Copy client package files
COPY client/package*.json ./

# Install client dependencies
RUN npm ci

# Copy client source code
COPY client/ ./

# Build client
RUN npm run build

# Build stage for server
FROM node:20-alpine AS server-builder

WORKDIR /app/server

# Copy server package files
COPY server/package*.json ./

# Install server dependencies
RUN npm ci

# Copy server source code
COPY server/ ./

# Build server
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install production dependencies for server
COPY --from=server-builder /app/server/package*.json ./
RUN npm ci --only=production

# Copy built server files
COPY --from=server-builder /app/server/dist ./dist
COPY --from=server-builder /app/server/data ./data

# Copy built client files
COPY --from=client-builder /app/client/dist ./public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "dist/server.js"] 