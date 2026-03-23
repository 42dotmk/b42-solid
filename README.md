# Base42 Website

The official website for [Base42](https://42.mk) — a hackerspace in Skopje, Macedonia. Built with **SolidStart 2**, **Solid.js**, and **Tailwind CSS v4**.

## Tech Stack

- **Framework:** [SolidStart 2](https://start.solidjs.com) (Vite-based)
- **UI:** [Solid.js](https://solidjs.com) + [Tailwind CSS 4](https://tailwindcss.com)
- **CMS:** [Strapi](https://strapi.io) at `https://cms.42.mk`
- **Design Tokens:** [DTCG 2025.10](https://tr.designtokens.org/format/) (cross-platform, also targets Flutter)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm start
```

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

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_STRAPI_URL` | Strapi API URL (default: `https://cms.42.mk`) |
| `VITE_YOUTUBE_API_KEY` | YouTube Data API v3 key |
| `VITE_YOUTUBE_CHANNEL_ID` | YouTube channel ID |
| `VITE_YOUTUBE_CHANNEL_URL` | YouTube channel URL (default: `https://youtube.com/@base42mk`) |

## Project Structure

```
├── src/
│   ├── app.tsx              # Root layout (Navbar, Suspense, Footer)
│   ├── app.css              # Global styles + token import
│   ├── routes/              # File-based routing
│   ├── components/          # UI components
│   ├── data/                # Static site data
│   └── lib/                 # API clients, utilities
├── tokens/
│   ├── tokens.json          # DTCG 2025.10 source of truth
│   ├── build-tokens.ts      # Token generator (CSS + Dart)
│   └── generated/           # Generated output (committed)
├── public/                  # Static assets
└── vite.config.ts           # SolidStart 2 + Tailwind config
```
