# Codebase Structure

**Analysis Date:** 2025-03-25

## Directory Layout

```
/home/darko/Work/base42/b42-solid/
├── src/
│   ├── components/          # React/Solid components
│   │   ├── common/          # Shared/reusable components
│   │   ├── events/          # Event-specific components
│   │   ├── layout/          # Layout components (Navbar, Footer)
│   │   ├── ui/              # UI primitives (Button, Card, Tag)
│   │   └── videos/          # Video-specific components
│   ├── data/                # Static data and configurations
│   │   └── site.ts          # Site metadata, nav links, projects
│   ├── lib/                 # Utilities and API clients
│   │   ├── api.ts           # Strapi CMS API
│   │   ├── queries.ts       # SolidJS query wrappers
│   │   ├── utils.ts         # Utility functions (cn, formatters)
│   │   └── youtube.ts       # YouTube API integration
│   ├── routes/              # File-based routes
│   │   ├── events/
│   │   │   ├── index.tsx    # Events listing page
│   │   │   └── [slug].tsx   # Event detail page (dynamic)
│   │   ├── [...404].tsx     # 404 catch-all
│   │   ├── about.tsx        # About page
│   │   ├── book.tsx         # Space booking page
│   │   ├── index.tsx        # Home page
│   │   ├── projects.tsx     # Projects page
│   │   └── videos.tsx       # Videos page
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Event, YouTubeVideo, etc.
│   ├── app.css              # Global styles, animations
│   ├── app.tsx              # App root with Router
│   ├── entry-client.tsx     # Client entry point
│   ├── entry-server.tsx     # Server entry point
│   └── global.d.ts          # Global type declarations
├── public/                  # Static assets
│   ├── images/
│   │   ├── partners/        # Partner logos
│   │   ├── hero-space.jpg
│   │   ├── logo.svg
│   │   └── space-*.jpg      # Space images
│   └── favicon.svg
├── tokens/
│   ├── build-tokens.ts      # Token build script
│   └── generated/
│       └── tokens.css       # Generated design tokens
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies and scripts
```

## Directory Purposes

**src/components/common/:**
- Purpose: Shared components used across multiple pages
- Contains: `CountUp.tsx`, `NotFoundPage.tsx`, `Reveal.tsx`
- Key files: `Reveal.tsx` - animation wrapper, `NotFoundPage.tsx` - 404 page

**src/components/events/:**
- Purpose: Event-specific UI components
- Contains: `EventCard.tsx`, `PastEventsList.tsx`, `ShareButton.tsx`
- Key files: `EventCard.tsx` - event preview card

**src/components/layout/:**
- Purpose: Structural layout components
- Contains: `Navbar.tsx`, `Footer.tsx`
- Key files: `Navbar.tsx` - responsive navigation with mobile menu

**src/components/ui/:**
- Purpose: Low-level UI primitives (design system)
- Contains: `Button.tsx`, `Card.tsx`, `SectionHeader.tsx`, `Tag.tsx`
- Key files: `Button.tsx` - primary/secondary/outline/ghost variants

**src/components/videos/:**
- Purpose: Video-related components
- Contains: `VideoCard.tsx`, `VideoGrid.tsx`
- Key files: `VideoGrid.tsx` - video listing with filtering

**src/routes/:**
- Purpose: Page components mapped to URLs
- Pattern: File-based routing (SolidJS Start convention)
- Special: `[slug].tsx` = dynamic route, `[...404].tsx` = catch-all

**src/lib/:**
- Purpose: Business logic and external integrations
- Pattern: Each file handles one external service or concern

## Key File Locations

**Entry Points:**
- `src/entry-client.tsx`: Browser entry
- `src/entry-server.tsx`: SSR entry
- `src/app.tsx`: App root component

**Configuration:**
- `vite.config.ts`: Build tool config
- `package.json`: Dependencies and scripts
- `src/app.css`: Global styles

**Core Logic:**
- `src/lib/api.ts`: Strapi CMS integration
- `src/lib/youtube.ts`: YouTube API client
- `src/lib/queries.ts`: Data query wrappers
- `src/lib/utils.ts`: Helper functions

**Testing:**
- Not detected - no test files found

## Naming Conventions

**Files:**
- Components: PascalCase (`EventCard.tsx`, `Button.tsx`)
- Utilities: camelCase (`utils.ts`, `api.ts`)
- Routes: camelCase or kebab-case (`[slug].tsx`, `index.tsx`)

**Directories:**
- kebab-case or camelCase (`events/`, `common/`)

**Imports:**
- Aliases: `~/` maps to `src/`
- Absolute imports preferred: `~/components/ui/Button`

## Where to Add New Code

**New Page:**
- Primary code: `src/routes/[page-name].tsx`
- Route with parameter: `src/routes/[category]/[id].tsx`
- Tests: Not established (add to `src/__tests__/` or co-located)

**New Component:**
- Domain-specific: `src/components/[domain]/[ComponentName].tsx`
- Shared/common: `src/components/common/[ComponentName].tsx`
- UI primitive: `src/components/ui/[ComponentName].tsx`

**New API Integration:**
- New service: `src/lib/[service-name].ts`
- Query wrapper: `src/lib/queries.ts` (add new query function)

**New Types:**
- Add to: `src/types/index.ts`
- Export from: Main index if applicable

**New Static Data:**
- Add to: `src/data/site.ts`
- For site-wide constants: Export from site.ts

**Styling:**
- Component styles: Tailwind classes inline
- Global additions: `src/app.css`
- Design tokens: `tokens/build-tokens.ts` → `tokens/generated/tokens.css`

## Special Directories

**tokens/generated/:**
- Purpose: Generated CSS custom properties (design tokens)
- Generated: Yes (by `npm run tokens`)
- Committed: Yes (in repo)
- Build command: `tsx tokens/build-tokens.ts`

**public/images/:**
- Purpose: Static image assets
- Generated: No
- Committed: Yes

**src/routes/ (file-based routing):**
- Purpose: SolidJS Start convention
- Dynamic segments: `[param].tsx`
- Catch-all: `[...path].tsx`
- Index routes: `index.tsx`

---

*Structure analysis: 2025-03-25*
