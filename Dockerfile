FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

# Production stage
FROM node:22-alpine AS production
WORKDIR /app

COPY --from=base /app/.output ./

EXPOSE 3000

CMD ["node", "server/index.mjs"]
