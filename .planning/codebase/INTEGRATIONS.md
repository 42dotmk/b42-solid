# External Integrations

**Analysis Date:** 2025-03-25

## APIs & External Services

**Content Management:**
- **Strapi CMS** — Headless CMS at `https://cms.42.mk`
  - Client: Custom fetch wrapper in `src/lib/api.ts`
  - API Pattern: REST with query parameters for filtering/sorting
  - Endpoints used:
    - `/api/events` — Event listings with population
    - `/api/events?filters[slug][$eq]=` — Single event by slug
  - Environment: `VITE_STRAPI_URL` (default: `https://cms.42.mk`)
  - Timeout: 5000ms via `AbortController`

**Video Content:**
- **YouTube Data API v3** — Channel content and playlists
  - Client: Custom server-side functions in `src/lib/youtube.ts`
  - Endpoints:
    - `https://www.googleapis.com/youtube/v3/channels` — Channel metadata
    - `https://www.googleapis.com/youtube/v3/playlists` — Channel playlists
    - `https://www.googleapis.com/youtube/v3/playlistItems` — Playlist videos
    - `https://www.googleapis.com/youtube/v3/videos` — Video details (duration, stats)
  - Auth: API key via `YOUTUBE_API_KEY` environment variable
  - Channel ID: `VITE_PUBLIC_YOUTUBE_CHANNEL_ID`
  - Server-side only (`"use server"` directive)

**Fonts:**
- **Google Fonts** — Space Grotesk, Inter, JetBrains Mono
  - Preconnect headers in `src/entry-server.tsx`
  - No API key required

## Data Storage

**Databases:**
- **Strapi CMS** (external) — Primary content store for events, images, tags
  - No local database
  - Data fetched at runtime or build time depending on deployment

**File Storage:**
- **Strapi Media Library** — Event images and photos
  - Access via `getImageUrl()` helper in `src/lib/api.ts`
  - Placeholder fallback: `/images/placeholder-event.jpg`

**Caching:**
- **None detected** — All API calls are direct with timeout handling
- Server-side data fetching via SolidStart query functions in `src/lib/queries.ts`

## Authentication & Identity

**Auth Provider:**
- **None** — No user authentication system
- Public-facing website only
- Strapi API is unauthenticated for read operations

## Monitoring & Observability

**Error Tracking:**
- **Console logging only** — `console.error()` in API wrappers
  - `src/lib/api.ts`: Logs fetch failures with status codes
  - `src/lib/youtube.ts`: Logs API errors with response details

**Logs:**
- Client-side: Browser console
- Server-side: stdout/stderr via Nitro

## CI/CD & Deployment

**Hosting:**
- **Not specified** — Static site output compatible with any host
- Likely candidates: Vercel, Netlify, Cloudflare Pages (SolidStart/Nitro compatible)

**CI Pipeline:**
- **Not detected** — No GitHub Actions, GitLab CI, or similar configs found

## Environment Configuration

**Required environment variables:**

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_STRAPI_URL` | No | Strapi API base URL (default: `https://cms.42.mk`) |
| `YOUTUBE_API_KEY` | Yes | YouTube Data API v3 key (server-side only) |
| `VITE_PUBLIC_YOUTUBE_CHANNEL_ID` | Yes | YouTube channel ID for content fetching |

**Variables in code:**
- `import.meta.env.VITE_STRAPI_URL` — Client-side accessible
- `import.meta.env.YOUTUBE_API_KEY` — Server-side only
- `import.meta.env.VITE_PUBLIC_YOUTUBE_CHANNEL_ID` — Both client and server

**Secrets location:**
- `.env` file at project root (not committed)
- Server-side environment variables for production

## Webhooks & Callbacks

**Incoming:**
- **None** — No webhook endpoints defined

**Outgoing:**
- **None** — No outbound webhooks

## Data Flow Patterns

**Server-Side Data Fetching (SolidStart queries):**
```typescript
// src/lib/queries.ts
export const getHomePageData = query(async () => {
  const [upcomingResponse, videos] = await Promise.all([
    getUpcomingEvents(3), 
    getChannelVideos()
  ]);
  return { upcomingEvents: upcomingResponse.data, latestVideos: videos.slice(0, 3) };
}, "home-page-data");
```

**Error Handling:**
- All API wrappers return safe defaults on failure (empty arrays, null)
- Timeouts prevent hanging requests (5000ms)
- No retry logic implemented

## Rate Limiting Considerations

**YouTube API:**
- Quota-based pricing (10,000 units/day default)
- Current usage: ~3-5 units per page load (channels + playlists + videos)
- No caching layer to reduce quota consumption

**Strapi:**
- Rate limiting depends on CMS configuration
- Current implementation: no client-side rate limiting

---

*Integration audit: 2025-03-25*
