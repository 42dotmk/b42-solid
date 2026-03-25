# Base42 Website

## What This Is

The official website for Base42, a hackerspace in Skopje. An all-in-one presence where developers, hardware hackers, gamers, and content creators can discover the space, book it for events, and access recorded content from past events and streams.

## Core Value

All-in-one hackerspace presence — booking, events, and content archive in one place.

## Requirements

### Validated

- ✓ Home page with space overview and key stats — existing
- ✓ Events system (calendar, individual events, past events) — existing
- ✓ Videos page with video grid — existing
- ✓ Booking form for space reservations — existing
- ✓ About page with space information — existing
- ✓ Projects page showcasing community work — existing
- ✓ Navigation and footer layout — existing
- ✓ Design token system with Tailwind v4 — existing
- ✓ Responsive design foundation — existing

### Active

- [ ] Add skeleton loading states for video pages
- [ ] Integrate lite-youtube-embed for video playback
- [ ] Polish UX (animations, transitions, micro-interactions)
- [ ] Performance optimizations
- [ ] Mobile responsiveness refinements

### Out of Scope

- User authentication/membership system — defer to v2, booking via external form for now
- Real-time event streaming — static content only for v1
- Payment processing — booking leads to contact, not automated payment
- Mobile app — web-first, PWA considerations for later

## Context

**Existing Codebase:** SolidStart 2 (alpha) with Solid.js, Tailwind CSS v4, TypeScript. File-based routing, design token system already in place.

**Users:** Developers, hardware hackers, gamers running community events; streamers and podcasters recording content; people booking the space.

**Technical Environment:** Node.js ≥ 22, pnpm, Vite-based build. Static site generation suitable for any hosting platform.

**Key External Dependencies:** YouTube API for video content, booking form integration (likely external).

## Constraints

- **Tech Stack:** SolidStart 2 alpha, Solid.js 1.9.x, Tailwind CSS v4 — must maintain compatibility
- **Performance:** Fast loading for video archive page, lazy loading for embeds
- **Design System:** Must use existing design tokens from `tokens/tokens.json`
- **Hosting:** Static site generation, no server-side runtime required

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use lite-youtube-embed | Fastest-in-class YouTube embed, minimal initial load | — Pending |
| Skeleton loaders for videos | Better perceived performance, matches existing design patterns | — Pending |

---
*Last updated: 2025-03-25 after initialization*
