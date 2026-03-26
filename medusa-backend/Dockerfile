FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production=false

# Copy source
COPY . .

# Build for production
RUN npx medusa build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=base /app/.medusa/server ./
RUN npm install --production

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 9000

ENTRYPOINT ["/start.sh"]
