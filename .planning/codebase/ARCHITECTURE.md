# Architecture

**Analysis Date:** 2025-03-25

## Pattern Overview

**Overall:** File-based routing with SolidJS Start (meta-framework), component-based architecture with clear separation of concerns.

**Key Characteristics:**
- Server-side rendering (SSR) with SolidJS Start
- File-based routing for pages (`src/routes/`)
- Reactive UI with SolidJS signals and stores
- API layer abstraction for external services
- Design tokens for styling consistency
- Component composition with presentational/container pattern

## Layers

**Routes Layer:**
- Purpose: Page-level components that handle routing and data fetching
- Location: `src/routes/`
- Contains: Page components, route handlers, error pages
- Depends on: Components, Lib, Data, Types
- Used by: Router (SolidJS Start)

**Components Layer:**
- Purpose: Reusable UI building blocks
- Location: `src/components/`
- Contains: Presentational components organized by domain
- Depends on: UI primitives, Utils, Types
- Used by: Routes, other Components

**UI Primitives Layer:**
- Purpose: Low-level reusable UI elements
- Location: `src/components/ui/`
- Contains: Button, Card, Tag, SectionHeader
- Depends on: Utils (cn), Tailwind
- Used by: All other components

**Data Layer:**
- Purpose: Static data constants and configurations
- Location: `src/data/site.ts`
- Contains: Site metadata, navigation, facilities, projects, stats
- Depends on: Types
- Used by: Routes, Components

**API Layer:**
- Purpose: External service integrations
- Location: `src/lib/api.ts`, `src/lib/youtube.ts`, `src/lib/queries.ts`
- Contains: Strapi CMS integration, YouTube API, data queries
- Depends on: Types
- Used by: Routes (via SolidJS router queries)

**Utilities Layer:**
- Purpose: Helper functions and formatters
- Location: `src/lib/utils.ts`
- Contains: Date formatting, string utilities, class merging (cn), calendar/sharing helpers
- Depends on: date-fns, clsx, tailwind-merge
- Used by: All layers

**Types Layer:**
- Purpose: TypeScript type definitions
- Location: `src/types/index.ts`
- Contains: Event, YouTubeVideo, StrapiImage, etc.
- Depends on: None
- Used by: All layers

## Data Flow

**Home Page Data Flow:**
1. `src/routes/index.tsx` - Renders home page
2. Calls `getUpcomingEvents(3)` from `src/lib/api.ts`
3. Calls `getChannelVideos()` from `src/lib/youtube.ts`
4. Renders with `Suspense` and skeleton loaders

**Events Page Data Flow:**
1. `src/routes/events/index.tsx` - Renders events listing
2. Uses `createAsync(() => getEventsPageData())`
3. `getEventsPageData` query in `src/lib/queries.ts` calls:
   - `getAllEvents(1, 12, true)` for upcoming
   - `getAllEvents(1, 6, false)` for past
4. Displays with `Show` conditionals and skeleton states

**Event Detail Data Flow:**
1. `src/routes/events/[slug].tsx` - Dynamic route
2. Uses `useParams()` to get slug
3. Calls `createAsync(() => getEventPageData(params.slug))`
4. Fetches event + related events from Strapi CMS
5. Falls back to `NotFoundPage` if event not found

**YouTube Videos Data Flow:**
1. `src/routes/videos.tsx` - Videos listing page
2. Uses `createAsync(() => getVideosPageData())`
3. Fetches playlists and videos from YouTube API
4. `src/lib/youtube.ts` handles pagination and enrichment

## Key Abstractions

**Query Functions:**
- Purpose: Encapsulate data fetching with SolidJS Start's `query` helper
- Examples: `src/lib/queries.ts` - `getHomePageData`, `getEventsPageData`, `getEventPageData`, `getVideosPageData`
- Pattern: Exported async functions wrapped with `query()` for caching and SSR

**Card Component Pattern:**
- Purpose: Consistent card UI across the application
- Examples: `src/components/ui/Card.tsx`, `src/components/events/EventCard.tsx`, `src/components/videos/VideoCard.tsx`
- Pattern: Composite component with Card/CardContent sub-components

**Reveal Animation Component:**
- Purpose: Scroll-triggered animations
- Examples: `src/components/common/Reveal.tsx`
- Pattern: Wrapper component that animates children on mount with configurable delay/direction

**Data Fetching with Timeout:**
- Purpose: Prevent hanging requests
- Examples: `fetchWithTimeout()` in `src/lib/api.ts` and `src/lib/youtube.ts`
- Pattern: AbortController-based timeout wrapper around native fetch

## Entry Points

**Client Entry:**
- Location: `src/entry-client.tsx`
- Triggers: Browser loads `index.html`
- Responsibilities: Mounts SolidJS app to DOM

**Server Entry:**
- Location: `src/entry-server.tsx`
- Triggers: SSR request
- Responsibilities: Renders HTML shell with meta tags, theme color, fonts

**Application Root:**
- Location: `src/app.tsx`
- Triggers: Mounted by entry-client.tsx
- Responsibilities: Sets up MetaProvider, Router with FileRoutes, Navbar, Footer, Suspense

**Vite Config:**
- Location: `vite.config.ts`
- Plugins: `solidStart()`, `nitroV2Plugin()`, `tailwindcss()`
- Environment: Loads env vars for build/runtime

## Error Handling

**Strategy:** Try-catch with graceful fallbacks

**Patterns:**
- API calls return empty arrays/objects on error (`{ data: [], meta: emptyPagination(...) }`)
- Components use `Show` component for conditional rendering
- 404 handled via `NotFoundPage` component in `src/components/common/NotFoundPage.tsx`
- Error boundary via SolidJS Start default handling

## Cross-Cutting Concerns

**Logging:** Console.error for API failures
**Validation:** TypeScript types, minimal runtime validation
**Authentication:** None (public-facing site)
**SEO:** Meta tags via `@solidjs/meta`, Open Graph, Twitter cards
**Styling:** Tailwind CSS v4 with custom CSS tokens

---

*Architecture analysis: 2025-03-25*
