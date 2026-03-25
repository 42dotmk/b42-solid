# Technology Stack

**Analysis Date:** 2025-03-25

## Languages

**Primary:**
- **TypeScript** — All source code (`src/**/*.ts`, `src/**/*.tsx`)
- **CSS** — Global styles with Tailwind v4 integration (`src/app.css`)

**Secondary:**
- **Dart** — Generated constants for Flutter cross-platform compatibility (`tokens/generated/tokens.dart`)
- **JSON** — DTCG 2025.10 compliant design tokens (`tokens/tokens.json`)

## Runtime

**Environment:**
- **Node.js** ≥ 22 (specified in `package.json` engines)

**Package Manager:**
- **pnpm** — Lockfile present (`pnpm-lock.yaml`)
- Workspace configuration in `pnpm-workspace.yaml` with built dependencies: `@parcel/watcher`, `esbuild`

## Frameworks

**Core:**
- **SolidStart 2** `2.0.0-alpha.2` — Vite-based meta-framework for Solid.js
  - File-based routing via `@solidjs/start/router`
  - Server/client entry points: `src/entry-server.tsx`, `src/entry-client.tsx`
- **Solid.js** `^1.9.5` — Reactive UI library
  - JSX transform via `jsxImportSource: "solid-js"` (tsconfig.json)
- **Tailwind CSS v4** `^4.0.7` — Utility-first CSS framework
  - Vite plugin: `@tailwindcss/vite`
  - Design tokens imported via `@theme inline` in CSS

**Routing:**
- **@solidjs/router** `^0.15.0` — Client-side routing with file-based routes in `src/routes/`

**Meta/SEO:**
- **@solidjs/meta** `^0.29.4` — Document head management for meta tags

## Key Dependencies

**Critical:**
- `vite` `^7.0.0` — Build tool and dev server
- `@solidjs/vite-plugin-nitro-2` — Nitro SSR adapter for SolidStart
- `@iconify-icon/solid` `^2.3.0` — Icon component library
- `date-fns` `^4.1.0` — Date utility library for formatting

**Infrastructure:**
- `tsx` `^4.0.0` — TypeScript execution for build scripts

**Styling Utilities:**
- `clsx` `^2.1.1` — Conditional className utility
- `tailwind-merge` `^3.5.0` — Tailwind class deduplication

## Configuration

**TypeScript:**
- Config: `tsconfig.json`
- Target: ESNext
- Module: ESNext with bundler resolution
- Path alias: `~/*` → `./src/*`

**Build:**
- Config: `vite.config.ts`
- Plugins: `solidStart()`, `nitroV2Plugin()`, `tailwindcss()`
- Environment loading: `loadEnv(mode, process.cwd(), "")`

**Design Tokens:**
- Source: `tokens/tokens.json` (DTCG 2025.10 format)
- Build script: `tokens/build-tokens.ts`
- Output: `tokens/generated/tokens.css` (Tailwind v4), `tokens/generated/tokens.dart` (Flutter)

## Platform Requirements

**Development:**
- Node.js ≥ 22
- pnpm package manager

**Production:**
- Static site generation via SolidStart
- Deployable to any static hosting platform
- Environment variables required (see INTEGRATIONS.md)

## Scripts

```bash
pnpm dev      # Start Vite dev server
pnpm build    # Build for production
pnpm start    # Preview production build
pnpm tokens   # Generate design tokens (CSS + Dart)
```

---

*Stack analysis: 2025-03-25*
