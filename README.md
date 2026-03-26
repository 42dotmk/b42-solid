# Base42 Website

The official website for [Base42](https://42.mk) — a hackerspace in Skopje, Macedonia. Built with **SolidStart 2**, **Solid.js**, **Tailwind CSS v4**, and **MedusaJS** for the shop.

## Tech Stack

- **Framework:** [SolidStart 2](https://start.solidjs.com) (Vite-based, SSR)
- **UI:** [Solid.js](https://solidjs.com) + [Tailwind CSS 4](https://tailwindcss.com)
- **Shop/Commerce:** [MedusaJS v2](https://medusajs.com) (headless commerce engine)
- **Events CMS:** [Strapi](https://strapi.io) at `https://cms.42.mk`
- **Design Tokens:** [DTCG 2025.10](https://tr.designtokens.org/format/) (cross-platform, also targets Flutter)
- **Deployment:** Docker Compose on bare metal Linux

## Prerequisites

- **Node.js** >= 22
- **pnpm** (package manager)
- **Docker** (for Medusa backend, PostgreSQL, Redis)

## Getting Started

### First time setup

```bash
# 1. Install dependencies
pnpm install

# 2. Start Medusa backend + database + web app
pnpm dev
#    First run builds the Medusa Docker image (~3-5 min).
#    Subsequent starts are instant.

# 3. Wait for Medusa to be ready, then initialize
pnpm dev:medusa:init
#    Creates: admin user, EUR region, sales channel, stock location, API key.
#    Outputs env vars — copy them into your .env file.

# 4. Add products via the Medusa Admin UI
#    http://localhost:9000/app
#    Login: admin@base42.mk / admin123

# 5. Restart the web app to pick up .env changes
#    Ctrl+C the running dev server, then:
pnpm dev:web
```

### Day-to-day development

```bash
pnpm dev        # starts Medusa containers + web app
```

### Available scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start everything (Medusa + Postgres + Redis + web app) |
| `pnpm dev:web` | Web app only (assumes Medusa is already running) |
| `pnpm dev:medusa` | Start Medusa containers only |
| `pnpm dev:medusa:stop` | Stop Medusa containers |
| `pnpm dev:medusa:logs` | Tail Medusa container logs |
| `pnpm dev:medusa:init` | First-boot infrastructure setup (idempotent) |
| `pnpm dev:medusa:rebuild` | Rebuild Medusa Docker image after config changes |
| `pnpm build` | Production build of the web app |
| `pnpm start` | Preview production build locally |
| `pnpm tokens` | Regenerate design tokens (CSS + Dart) |

## Shop Architecture

The shop is powered by MedusaJS v2 as a headless commerce backend. The web app communicates with Medusa's Store API using a lightweight fetch client (`src/lib/medusa.ts`).

```
┌─────────────┐     Store API      ┌──────────────┐     ┌────────────┐
│  SolidStart  │ ◄──────────────► │   MedusaJS    │ ◄──► │ PostgreSQL │
│  (port 5173) │   /store/*       │  (port 9000)  │     └────────────┘
└─────────────┘                   │               │     ┌────────────┐
                                  │  Admin UI at  │ ◄──► │   Redis    │
                                  │  /app         │     └────────────┘
                                  └──────────────┘
```

**Key concepts:**
- **Products** are managed through the Medusa Admin UI (`http://localhost:9000/app`)
- **Cart** is server-managed by Medusa — the frontend stores `cart_id` in localStorage and syncs state
- **Checkout** flows through Medusa's payment system (Stripe integration available)
- **Pricing** is region-based — prices are attached to variants via the Pricing Module
- **Inventory** is tracked per stock location — Medusa handles stock validation

### Shop files

| File | Purpose |
|------|---------|
| `src/lib/medusa.ts` | Medusa Store API client (fetch-based) |
| `src/lib/shop-api.ts` | Product fetching, maps Medusa data to UI types |
| `src/lib/cart.ts` | Reactive cart store backed by Medusa server cart |
| `src/lib/checkout.ts` | Server-side checkout via Medusa payment flow |
| `src/lib/shop-queries.ts` | SolidStart query for shop page data |
| `src/types/shop.ts` | Product, CartItem type definitions |
| `src/routes/shop.tsx` | Shop page with category filters |
| `src/components/shop/` | ProductCard, CartDrawer, CartButton |

## Production Deployment

The entire stack runs via Docker Compose on a bare metal Linux server.

```bash
# 1. Copy and configure environment
cp .env.example .env
# Fill in production values (secrets, CORS URLs, Stripe keys, etc.)

# 2. Build and start all services
docker compose up -d --build

# 3. Initialize Medusa (first deploy only)
MEDUSA_CONTAINER=b42_medusa ./medusa-backend/init.sh

# 4. Add products via Admin UI at https://your-domain:9000/app
```

### Production services

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| `web` | Node 22 (SolidStart) | 3000 | Storefront |
| `medusa` | Node 20 (MedusaJS) | 9000 | Commerce API + Admin UI |
| `postgres` | PostgreSQL 15 Alpine | — | Database (internal only) |
| `redis` | Redis 7 Alpine | — | Cache, events (internal only) |

### Production environment variables

See `.env.example` for the full list. Critical ones:

| Variable | Required | Description |
|----------|----------|-------------|
| `POSTGRES_PASSWORD` | Yes | Database password |
| `JWT_SECRET` | Yes | Medusa JWT signing secret |
| `COOKIE_SECRET` | Yes | Medusa session cookie secret |
| `STORE_CORS` | Yes | Storefront URL (e.g. `https://42.mk`) |
| `MEDUSA_PUBLISHABLE_KEY` | Yes | From `dev:medusa:init` or Admin UI |
| `VITE_MEDUSA_REGION_ID` | Yes | From `dev:medusa:init` or Admin API |
| `STRIPE_API_KEY` | For payments | Stripe secret key |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_MEDUSA_BACKEND_URL` | Medusa API URL (default: `http://localhost:9000`) |
| `VITE_MEDUSA_PUBLISHABLE_KEY` | Medusa publishable API key (required for store API) |
| `VITE_MEDUSA_REGION_ID` | Medusa region ID (required for pricing) |
| `VITE_PUBLIC_STRAPI_URL` | Strapi API URL for events (default: `https://cms.42.mk`) |
| `VITE_PUBLIC_YOUTUBE_CHANNEL_ID` | YouTube channel ID |
| `YOUTUBE_API_KEY` | YouTube Data API v3 key (server-side) |

## Design Tokens

Design tokens live in `tokens/tokens.json` using the [DTCG 2025.10](https://tr.designtokens.org/format/) standard. A build script generates platform-specific output:

```bash
pnpm tokens
```

This produces:

| Output | Path | Purpose |
|--------|------|---------|
| CSS custom properties | `tokens/generated/tokens.css` | Consumed by Tailwind v4 via `@import theme(inline)` |
| Dart constants | `tokens/generated/tokens.dart` | Drop into a Flutter project for `ThemeData` |

Edit `tokens/tokens.json` → run `pnpm tokens` → both platforms stay in sync.

## Project Structure

```
├── src/
│   ├── app.tsx              # Root layout (Navbar, Suspense, Footer, CartDrawer)
│   ├── app.css              # Global styles + token import
│   ├── routes/              # File-based routing
│   ├── components/
│   │   ├── shop/            # ProductCard, CartDrawer, CartButton
│   │   ├── layout/          # Navbar, Footer
│   │   ├── ui/              # Button, Card, SectionHeader, Tag
│   │   ├── events/          # EventCard, PastEventsList
│   │   └── common/          # Reveal, CountUp
│   ├── lib/
│   │   ├── medusa.ts        # Medusa Store API client
│   │   ├── shop-api.ts      # Product fetching + type mapping
│   │   ├── cart.ts          # Reactive cart store (Medusa-backed)
│   │   ├── checkout.ts      # Server-side checkout
│   │   ├── api.ts           # Strapi API client (events)
│   │   └── utils.ts         # Utility functions
│   ├── data/                # Static site data
│   └── types/               # TypeScript type definitions
├── medusa-backend/
│   ├── medusa-config.ts     # Medusa configuration
│   ├── package.json         # Medusa dependencies
│   ├── init.sh              # First-boot initialization script
│   ├── Dockerfile           # Production Medusa image
│   └── Dockerfile.dev       # Development Medusa image
├── tokens/
│   ├── tokens.json          # DTCG 2025.10 source of truth
│   ├── build-tokens.ts      # Token generator (CSS + Dart)
│   └── generated/           # Generated output (committed)
├── docker-compose.yml       # Production: full stack
├── docker-compose.dev.yml   # Development: Medusa + DB + Redis
├── Dockerfile               # Production web app image
├── .env.example             # Environment variable template
└── vite.config.ts           # SolidStart 2 + Tailwind config
```
