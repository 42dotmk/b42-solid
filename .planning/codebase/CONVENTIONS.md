# Coding Conventions

**Analysis Date:** 2025-03-25

## Naming Patterns

**Files:**
- Components: PascalCase with descriptive names - `Button.tsx`, `EventCard.tsx`, `CountUp.tsx`
- Utilities/lib files: camelCase - `utils.ts`, `api.ts`, `queries.ts`, `youtube.ts`
- Data files: camelCase - `site.ts`
- Route files: Lowercase matching URL path - `index.tsx`, `events/index.tsx`, `about.tsx`

**Functions:**
- Utility functions: camelCase - `cn()`, `formatDate()`, `getImageUrl()`, `truncate()`
- Component functions: PascalCase default export - `function Button()`, `function CountUp()`
- Async data functions: camelCase with get prefix - `getUpcomingEvents()`, `getChannelVideos()`
- Query wrapper functions: camelCase with get prefix and Data suffix - `getHomePageData()`, `getEventsPageData()`

**Variables:**
- Signals: camelCase, often with descriptive names - `const [count, setCount] = createSignal(0)`
- Stores: camelCase - `const [formData, setFormData] = createStore({...})`
- Props destructuring: camelCase - `[local, rest] = splitProps(props, [...])`
- Refs: camelCase starting with "ref" - `let ref: HTMLSpanElement | undefined`

**Types:**
- Interfaces: PascalCase - `interface ButtonProps`, `interface Event`, `interface StrapiResponse<T>`
- Type aliases: PascalCase - `type Variant`, `type Size`, `type IconComponent`
- Generics: Single uppercase letter - `StrapiResponse<T>`

## Code Style

**Formatting:**
- No explicit formatter configured (no .prettierrc, no biome.json)
- Manual formatting observed: 2-space indentation throughout
- Single quotes for strings in imports and JSX attributes
- Trailing commas in multi-line objects and arrays
- Max line length: appears to follow ~100 character soft limit

**Linting:**
- ESLint: Not detected
- Biome: Not detected
- TypeScript strict mode: Enabled (`"strict": true` in `tsconfig.json`)

**Import Organization:**

**Order (observed pattern):**
1. External library imports (framework, icons, meta)
2. Third-party utilities (date-fns)
3. Internal components (~/components/...)
4. Internal utilities (~/lib/...)
5. Internal data (~/data/...)
6. Types (~/types or inline)
7. CSS imports (last)

**Example from `src/routes/index.tsx`:**
```typescript
import { Icon } from "@iconify-icon/solid";           // 1. External
import { Meta, Title } from "@solidjs/meta";          // 1. External
import { createAsync } from "@solidjs/router";        // 1. External
import { A } from "@solidjs/router";                  // 1. External
import { For, Show, createSignal, onMount } from "solid-js"; // 1. External
import { createStore } from "solid-js/store";         // 1. External
import CountUp from "~/components/common/CountUp";    // 3. Components
import Button from "~/components/ui/Button";          // 3. Components
import { facilities } from "~/data/site";            // 5. Data
import { getUpcomingEvents } from "~/lib/api";        // 4. Utilities
import type { Event } from "~/types";                 // 6. Types
```

**Path Aliases:**
- `~/*` maps to `./src/*` (configured in `tsconfig.json`)
- Always use `~/` prefix for internal imports

## SolidJS Patterns

**Component Structure:**
```typescript
// Default export, PascalCase name
export default function ComponentName(props: ComponentProps) {
  // Destructure with splitProps for clean prop spreading
  const [local, rest] = splitProps(props, ["class", "variant", "children"]);
  
  // Component logic here
  
  return (
    <div class={cn(...)} {...rest}>
      {local.children}
    </div>
  );
}
```

**Signal Naming:**
- State: `[events, setEvents]`, `[videos, setVideos]`
- Boolean flags: `[started, setStarted]`, `[visible, setVisible]`
- Form state: `[formState, setFormState]` with union type `"idle" | "loading" | "success" | "error"`

**Store Usage (for forms):**
```typescript
const [formData, setFormData] = createStore({
  name: "",
  email: "",
  message: "",
});

// Update with path syntax
setFormData("name", event.currentTarget.value);
```

## Error Handling

**API Error Pattern:**
```typescript
export async function getUpcomingEvents(limit = 3): Promise<StrapiResponse<Event>> {
  try {
    const res = await fetchWithTimeout(url);
    
    if (!res.ok) {
      console.error("Failed to fetch upcoming events:", res.status);
      return { data: [], meta: emptyPagination(1, limit) };
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return { data: [], meta: emptyPagination(1, limit) };
  }
}
```

**Key principles:**
- Always wrap fetch calls in try-catch
- Return safe fallback values on error (empty arrays, null values)
- Log errors to console with descriptive messages
- Use timeout wrapper (`fetchWithTimeout`) for all external calls

## Logging

**Framework:** Console only (no structured logging library)

**Patterns:**
- Error logging: `console.error("Failed to fetch X:", res.status)`
- Error logging with full error: `console.error("Error fetching X:", error)`
- JSON stringify for API errors: `JSON.stringify(errorData, null, 2)`

## Comments

**When to Comment:**
- JSDoc-style header comments for build scripts explaining purpose and usage
- Inline comments explaining non-obvious logic (e.g., intersection observer optimization)
- Section dividers in large files using decorative comment blocks

**Example:**
```typescript
// ─── Types ───────────────────────────────────────────────────────────────────
// ─── Token Walking ───────────────────────────────────────────────────────────
// ─── CSS Generation ──────────────────────────────────────────────────────────
```

**JSDoc/TSDoc:**
- Not heavily used
- Build scripts have descriptive headers
- Prefer self-documenting code over comments

## Function Design

**Size:**
- Small focused functions (10-40 lines typical)
- Large route components can be 100+ lines but broken into sub-components

**Parameters:**
- Use destructuring for props objects
- Default values for optional params: `limit = 3`, `page = 1`
- Options objects for multiple optional params

**Return Values:**
- Async functions return typed promises: `Promise<StrapiResponse<Event>>`
- Null returns for "not found" cases
- Empty arrays as safe fallbacks

**Example signature:**
```typescript
export async function getAllEvents(
  page = 1, 
  pageSize = 9, 
  upcoming = true
): Promise<StrapiResponse<Event>>
```

## Module Design

**Exports:**
- Components: Default export
- Utilities: Named exports
- Types: Named exports

**Barrel Files:**
- Not used (no index.ts files aggregating exports)
- Import directly from source files

## TypeScript Conventions

**Type Imports:**
- Use `type` keyword for type-only imports: `import type { Event } from "~/types"`
- Inline type imports: `import { type JSX, splitProps } from "solid-js"`

**Interface vs Type:**
- Prefer `interface` for object shapes: `interface ButtonProps`
- Use `type` for unions: `type Variant = "primary" | "secondary" | "ghost" | "outline"`

**Generic Patterns:**
```typescript
export interface StrapiResponse<T> {
  data: T[];
  meta: StrapiMeta;
}
```

## Tailwind CSS Conventions

**Class Composition:**
- Use `cn()` utility from `~/lib/utils` for conditional class merging
- Base styles + variant styles + size styles + local.class pattern

**Example:**
```typescript
const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200";
const variants: Record<Variant, string> = { /* ... */ };
const sizes: Record<Size, string> = { /* ... */ };

class={cn(baseStyles, variants[local.variant ?? "primary"], sizes[local.size ?? "md"], local.class)}
```

**Color Tokens:**
- Always use CSS custom properties: `var(--color-primary)`, `var(--color-dark-900)`
- Never hardcode color values in components

## SolidStart Specific Patterns

**Route Files:**
- File-based routing in `src/routes/`
- Directory routes: `events/index.tsx` for `/events`
- Dynamic routes: `[...404].tsx` for catch-all

**Server Functions:**
- Mark server-only functions with `"use server"` directive
- Environment access via `import.meta.env` with fallbacks to `process.env`

**Async Data Loading:**
```typescript
import { createAsync } from "@solidjs/router";

export default function EventsPage() {
  const data = createAsync(() => getEventsPageData());
  // Access with data()
}
```

---

*Convention analysis: 2025-03-25*
