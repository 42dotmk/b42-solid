# Codebase Concerns

**Analysis Date:** 2026-03-25

## Tech Debt

### Type Safety Issues
- **Issue:** Multiple `@ts-ignore` comments bypassing type checking
- **Files:**
  - `src/lib/youtube.ts` (lines 6, 8, 43, 89, 137)
  - `vite.config.ts` (lines 7, 9)
- **Impact:** TypeScript strict mode is compromised; runtime errors possible
- **Fix approach:** Replace `@ts-ignore` with `@ts-expect-error` and proper type guards; add proper TypeScript definitions for SolidStart environment

### Loose Typing
- **Issue:** Generic `any` types used for API response mapping
- **Files:**
  - `src/lib/youtube.ts` lines 43, 89, 137
  - `src/data/site.ts` line 242: `{ [key: string]: any }[]`
- **Impact:** No compile-time validation of YouTube API responses; potential runtime errors
- **Fix approach:** Define proper interfaces for YouTube API responses

### Stubbed Form Submissions
- **Issue:** Contact form and booking form simulate submission with timeout instead of actually submitting
- **Files:**
  - `src/routes/index.tsx` lines 183-190 (handleSubmit)
  - `src/routes/book.tsx` lines 24-28 (handleSubmit)
- **Impact:** Forms appear to work but data is lost
- **Fix approach:** Implement actual form submission to backend API or service

### Environment Variable Handling
- **Issue:** Mixed import.meta.env and process.env usage with @ts-ignore
- **Files:** `src/lib/youtube.ts` lines 6-9
- **Impact:** Fragile environment detection between SSR and client
- **Fix approach:** Standardize environment variable access through proper SolidStart patterns

## Known Bugs

### Event Calendar Timezone Handling
- **Symptoms:** Event times may display incorrectly for users in different timezones
- **Files:** `src/lib/utils.ts` lines 9-14
- **Trigger:** Viewing event times from different timezone
- **Current fix:** None - uses local Date constructor

### Image Placeholder Path
- **Symptoms:** Missing images fall back to hardcoded placeholder path
- **Files:** `src/lib/api.ts` line 18
- **Placeholder:** `/images/placeholder-event.jpg` - may not exist
- **Trigger:** Events without promo images

### Non-functional Contact Form
- **Symptoms:** Form always simulates success but sends no data
- **Files:** `src/routes/index.tsx` lines 175-189
- **Current state:** Sets formState to success after timeout

### Booking Form No-Op
- **Symptoms:** Booking request appears to succeed but data is lost
- **Files:** `src/routes/book.tsx` lines 24-28
- **Current state:** Only simulates network delay

## Security Considerations

### API Key Exposure Pattern
- **Risk:** YouTube API key could be exposed if not properly handled server-side
- **Files:** `src/lib/youtube.ts`
- **Current mitigation:** Uses server function with "use server"
- **Recommendations:** Add rate limiting; rotate keys periodically; add key validation

### User Input Sanitization
- **Risk:** Unsanitized HTML injection in event descriptions
- **Files:** `src/routes/events/[slug].tsx` line 73
- **Current mitigation:** Content is from trusted CMS (Strapi)
- **Recommendations:** Add DOMPurify or similar for event descriptions

### Open Redirect Potential
- **Risk:** `registerLink` from external events could redirect anywhere
- **Files:** `src/routes/events/[slug].tsx` line 132
- **Current mitigation:** None
- **Recommendations:** Validate registerLink URLs against allowlist

## Performance Bottlenecks

### Blocking API Calls
- **Problem:** Sequential API requests in `enrichVideosWithDetails`
- **Files:** `src/lib/youtube.ts` lines 69-111
- **Cause:** Loops through videos in batches of 50 with await
- **Improvement path:** Implement Promise.all for parallel requests

### Pagination Without Pagination Controls
- **Problem:** Past events list loads more but doesn't track position
- **Files:** `src/components/events/PastEventsList.tsx`
- **Cause:** No URL state for pagination
- **Impact:** Browser back button loses position

### Client-Side Data Loading
- **Problem:** Home page fetches events and videos on mount instead of server
- **Files:** `src/routes/index.tsx` lines 71-128 (UpcomingEventsSection, LatestVideosSection)
- **Impact:** SEO issues, slower perceived performance
- **Improvement path:** Use `createAsync` with server functions like other pages

### YouTube API Rate Limits
- **Problem:** No rate limiting or caching for YouTube API calls
- **Files:** `src/lib/youtube.ts`
- **Current:** Each page load triggers new API calls
- **Impact:** Could hit quota limits

## Fragile Areas

### Large Data File
- **Files:** `src/data/site.ts` (407 lines)
- **Contains:** All site data, projects, partners, facilities, timeline
- **Why fragile:** Single file of truth; modifications risk breaking multiple pages
- **Safe modification:** Split into separate data modules per domain

### Home Page Complexity
- **Files:** `src/routes/index.tsx` (620 lines)
- **Contains:** Multiple inline components, skeletons, sections
- **Why fragile:** Single file handles entire landing page
- **Safe modification:** Extract components to separate files

### Video Modal State Management
- **Files:** `src/components/videos/VideoGrid.tsx`
- **Contains:** Local state for modal, no URL sync
- **Why fragile:** Modal state lost on refresh; no deep linking
- **Safe modification:** Use query parameters or route-based modal

### CountUp Animation
- **Files:** `src/components/common/CountUp.tsx`
- **Contains:** IntersectionObserver, requestAnimationFrame
- **Why fragile:** Complex animation lifecycle
- **Test coverage:** No tests found

## Scaling Limits

### YouTube API Quota
- **Current capacity:** YouTube API has daily quota limits
- **Limit:** ~10,000 units/day default
- **Scaling path:** Implement caching layer (Redis/SWR) or move to SSR-only with revalidation

### Strapi CMS Load
- **Current capacity:** Direct calls to Strapi instance
- **Limit:** No caching layer implemented
- **Scaling path:** Add CDN caching or SSG with incremental static regeneration

### Static Image Assets
- **Current:** All images in `/public/images/`
- **Limit:** No optimization pipeline
- **Scaling path:** Implement image optimization service or CDN

## Dependencies at Risk

### SolidStart Alpha Version
- **Package:** `@solidjs/start@2.0.0-alpha.2`
- **Risk:** Alpha version may have breaking changes
- **Impact:** Potential instability, API changes
- **Migration plan:** Monitor for stable release, test thoroughly before upgrading

### Tailwind CSS v4
- **Package:** `tailwindcss@4.0.7`
- **Risk:** Major version change, configuration differences from v3
- **Impact:** Build tooling may break
- **Current mitigation:** Using @tailwindcss/vite plugin

## Missing Critical Features

### Error Boundaries
- **Problem:** No error boundaries for route errors
- **Blocks:** Graceful error handling
- **Files:** All route files

### Loading States Consistency
- **Problem:** Inconsistent skeleton patterns across pages
- **Files:** Compare `src/routes/videos.tsx` vs `src/routes/index.tsx`

### Form Validation
- **Problem:** No client-side validation feedback before submission
- **Files:** `src/routes/index.tsx`, `src/routes/book.tsx`

### Analytics/Tracking
- **Problem:** No analytics implementation
- **Impact:** No visibility into user behavior

## Test Coverage Gaps

### No Test Suite
- **What's not tested:** All functionality
- **Files:** Entire codebase
- **Risk:** Regression bugs can go unnoticed
- **Priority:** High

### Uncovered Areas:
- API error handling in `src/lib/api.ts` and `src/lib/youtube.ts`
- Date/time formatting edge cases
- Component rendering states
- Form submission flows
- Utility functions

## Code Quality Issues

### Console Usage in Production
- **Issue:** console.error calls throughout API files
- **Files:** `src/lib/api.ts`, `src/lib/youtube.ts`
- **Current:** 17 console.error statements
- **Recommendation:** Replace with proper logging service or user-facing error messages

### Magic Numbers
- **Issue:** Hardcoded values without constants
- **Files:** Multiple (5000ms timeout, page sizes, etc.)
- **Recommendation:** Extract to named constants

### Duplicate Pattern
- **Issue:** Skeleton components defined inline in multiple files
- **Files:** `src/routes/index.tsx` lines 26-69
- **Recommendation:** Create reusable Skeleton components

---

*Concerns audit: 2026-03-25*
