import type { Event, StrapiResponse } from "~/types";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "https://cms.42.mk";
const API_URL = `${STRAPI_URL}/api`;
const FETCH_TIMEOUT_MS = 5000;

function fetchWithTimeout(url: string, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

const emptyPagination = (page: number, pageSize: number) => ({
  pagination: { page, pageSize, pageCount: 0, total: 0 },
});

export function getImageUrl(path: string | null | undefined) {
  if (!path) return "/images/placeholder-event.jpg";
  if (path.startsWith("http")) return path;
  return `${STRAPI_URL}${path}`;
}

export async function getUpcomingEvents(limit = 3): Promise<StrapiResponse<Event>> {
  try {
    const now = new Date().toISOString();
    const url = `${API_URL}/events?populate=*&filters[start][$gte]=${now}&sort[0]=start:asc&pagination[limit]=${limit}`;
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

export async function getAllEvents(page = 1, pageSize = 9, upcoming = true): Promise<StrapiResponse<Event>> {
  try {
    const now = new Date().toISOString();
    const filter = upcoming ? `&filters[start][$gte]=${now}` : `&filters[start][$lt]=${now}`;
    const sort = upcoming ? "start:asc" : "start:desc";
    const url = `${API_URL}/events?populate=*${filter}&sort[0]=${sort}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    const res = await fetchWithTimeout(url);

    if (!res.ok) {
      console.error("Failed to fetch events:", res.status);
      return { data: [], meta: emptyPagination(page, pageSize) };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    return { data: [], meta: emptyPagination(page, pageSize) };
  }
}

export async function getEventCount(): Promise<number | null> {
  try {
    const url = `${API_URL}/events?pagination[pageSize]=1&fields[0]=id`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) return null;
    const data: StrapiResponse<Event> = await res.json();
    return data.meta.pagination.total;
  } catch {
    return null;
  }
}

export async function getEventBySlug(slug: string) {
  try {
    const url = `${API_URL}/events?populate=*&filters[slug][$eq]=${slug}`;
    const res = await fetchWithTimeout(url);

    if (!res.ok) {
      console.error("Failed to fetch event:", res.status);
      return null;
    }

    const data: StrapiResponse<Event> = await res.json();
    return data.data[0] || null;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export async function getRelatedEvents(currentSlug: string, tags: string[], limit = 3) {
  try {
    if (tags.length === 0) {
      const response = await getUpcomingEvents(limit + 1);
      return response.data.filter(event => event.slug !== currentSlug).slice(0, limit);
    }

    const tagFilters = tags.map((tag, index) => `filters[tags][tagName][$in][${index}]=${tag}`).join("&");
    const url = `${API_URL}/events?populate=*&${tagFilters}&filters[slug][$ne]=${currentSlug}&sort[0]=start:desc&pagination[limit]=${limit}`;
    const res = await fetchWithTimeout(url);

    if (!res.ok) {
      console.error("Failed to fetch related events:", res.status);
      return [];
    }

    const data: StrapiResponse<Event> = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching related events:", error);
    return [];
  }
}

