# Testing Patterns

**Analysis Date:** 2025-03-25

## Test Framework

**Status: No Testing Infrastructure Configured**

This codebase currently has **no test framework** configured. The following were searched and not found:
- No `*.test.*` files
- No `*.spec.*` files  
- No `__tests__/` directories
- No test configuration files (jest.config.*, vitest.config.*, playwright.config.*)

**Recommended Setup:**

Based on the technology stack (SolidJS + SolidStart + TypeScript), consider:

1. **Vitest** - Recommended (fast, Vite-native, works well with Solid)
   ```bash
   pnpm add -D vitest @solidjs/testing-library jsdom
   ```

2. **Playwright** - For E2E testing
   ```bash
   pnpm add -D @playwright/test
   ```

## Test File Organization (Recommended)

**Location:** Co-located with source files

**Naming:**
- Unit tests: `ComponentName.test.tsx`
- Integration tests: `feature.integration.test.ts`
- E2E tests: `tests/e2e/feature.spec.ts`

**Structure:**
```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
│   └── events/
│       ├── EventCard.tsx
│       └── EventCard.test.tsx
├── lib/
│   ├── utils.ts
│   └── utils.test.ts
└── tests/
    └── e2e/
        ├── navigation.spec.ts
        └── booking.spec.ts
```

## Recommended Test Patterns

### Component Testing Pattern

```typescript
// src/components/ui/Button.test.tsx
import { render, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders with default variant", () => {
    const { getByRole } = render(() => <Button>Click me</Button>);
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    const { getByRole } = render(() => <Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies variant styles correctly", () => {
    const { getByRole } = render(() => <Button variant="outline">Outline</Button>);
    expect(getByRole("button")).toHaveClass("border");
  });
});
```

### Utility Function Testing Pattern

```typescript
// src/lib/utils.test.ts
import { describe, it, expect } from "vitest";
import { cn, formatDate, truncate, getTagColor } from "./utils";

describe("cn (className merge)", () => {
  it("merges classes correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("merges tailwind classes using tailwind-merge", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});

describe("formatDate", () => {
  it("formats date string correctly", () => {
    expect(formatDate("2025-03-25")).toBe("Mar 25, 2025");
  });

  it("accepts custom format", () => {
    expect(formatDate("2025-03-25", "yyyy-MM-dd")).toBe("2025-03-25");
  });
});

describe("truncate", () => {
  it("returns original text if under limit", () => {
    expect(truncate("short", 10)).toBe("short");
  });

  it("truncates and adds ellipsis", () => {
    expect(truncate("this is a very long text", 10)).toBe("this is a...");
  });
});

describe("getTagColor", () => {
  it("returns color for known tags", () => {
    expect(getTagColor("AI")).toContain("purple");
    expect(getTagColor("Python")).toContain("yellow");
  });

  it("returns default for unknown tags", () => {
    expect(getTagColor("Unknown")).toBe("bg-dark-600 text-text-secondary border-border");
  });
});
```

### API Testing Pattern

```typescript
// src/lib/api.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUpcomingEvents, getEventBySlug } from "./api";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("getUpcomingEvents", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("returns events on success", async () => {
    const mockEvents = {
      data: [{ id: 1, title: "Test Event" }],
      meta: { pagination: { page: 1, pageSize: 3, pageCount: 1, total: 1 } }
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEvents)
    });

    const result = await getUpcomingEvents();
    expect(result.data).toHaveLength(1);
    expect(result.data[0].title).toBe("Test Event");
  });

  it("returns empty array on error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));
    const result = await getUpcomingEvents();
    expect(result.data).toEqual([]);
  });

  it("respects limit parameter", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ data: [], meta: {} }) });
    await getUpcomingEvents(5);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("pagination[limit]=5"),
      expect.any(Object)
    );
  });
});
```

### E2E Testing Pattern (Playwright)

```typescript
// tests/e2e/events.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Events Page", () => {
  test("displays upcoming events", async ({ page }) => {
    await page.goto("/events");
    await expect(page.locator("h1")).toContainText("Events");
    await expect(page.locator("text=Upcoming Events")).toBeVisible();
  });

  test("navigates to event detail", async ({ page }) => {
    await page.goto("/events");
    const firstEvent = page.locator("[data-testid='event-card']").first();
    await firstEvent.click();
    await expect(page).toHaveURL(/\/events\/.+/);
  });

  test("contact form submission", async ({ page }) => {
    await page.goto("/");
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('textarea[name="message"]', "Test message");
    await page.click('button[type="submit"]');
    await expect(page.locator("text=Message Sent!")).toBeVisible();
  });
});
```

## Mocking Recommendations

**What to Mock:**
- External API calls (Strapi, YouTube API)
- Browser APIs (IntersectionObserver, requestAnimationFrame)
- Environment variables

**What NOT to Mock:**
- Component internals
- Utility functions (test the real implementation)

**API Mocking Example:**
```typescript
// Setup in vitest.config.ts
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/tests/setup.ts"]
  }
});

// src/tests/setup.ts
import { vi } from "vitest";

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
global.matchMedia = vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));
```

## Coverage Recommendations

**Target Coverage:**
- Statements: 70%
- Branches: 60%
- Functions: 70%
- Lines: 70%

**Priority Areas:**
1. `src/lib/utils.ts` - Pure functions, easy to test, high value
2. `src/lib/api.ts` - Critical business logic
3. `src/components/ui/*` - Reusable UI components
4. `src/components/events/EventCard.tsx` - Key user-facing component

**View Coverage:**
```bash
# After configuring vitest
pnpm vitest run --coverage
```

## Test Types Priority

**Unit Tests (High Priority):**
- Utility functions in `src/lib/utils.ts`
- API functions in `src/lib/api.ts`
- Helper functions in `src/lib/youtube.ts`

**Integration Tests (Medium Priority):**
- Query functions in `src/lib/queries.ts`
- Component interactions

**E2E Tests (Low Priority - but valuable):**
- Critical user flows (view events, book space, contact form)
- Cross-page navigation

## Common Async Testing Patterns

```typescript
// Testing Solid signals
it("updates signal value", async () => {
  const { getByText } = render(() => <Counter />);
  fireEvent.click(getByText("Increment"));
  await waitFor(() => expect(getByText("1")).toBeInTheDocument());
});

// Testing createAsync
it("loads data asynchronously", async () => {
  const { getByText } = render(() => <EventsPage />);
  await waitFor(() => expect(getByText("Upcoming Events")).toBeInTheDocument());
});
```

---

*Testing analysis: 2025-03-25*

**Key Finding:** This codebase has zero test coverage. Adding tests should be a priority for maintaining code quality as the project grows.
