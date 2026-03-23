import type { Event, StrapiResponse } from "~/types";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || process.env.VITE_STRAPI_URL || "https://cms.42.mk";
const API_URL = `${STRAPI_URL}/api`;

const emptyPagination = (page: number, pageSize: number) => ({
  pagination: { page, pageSize, pageCount: 0, total: 0 },
});

export function getImageUrl(path: string | null | undefined) {
  if (!path) return "/images/placeholder-event.jpg";
  if (path.startsWith("http")) return path;
  return `${STRAPI_URL}${path}`;
}

export async function getUpcomingEvents(limit = 3): Promise<StrapiResponse<Event>> {
  const now = new Date().toISOString();
  const url = `${API_URL}/events?populate=*&filters[start][$gte]=${now}&sort[0]=start:asc&pagination[limit]=${limit}`;

  const res = await fetch(url);

  if (!res.ok) {
    console.error("Failed to fetch upcoming events:", res.status);
    return { data: [], meta: emptyPagination(1, limit) };
  }

  return res.json();
}

export async function getAllEvents(page = 1, pageSize = 9, upcoming = true): Promise<StrapiResponse<Event>> {
  const now = new Date().toISOString();
  const filter = upcoming ? `&filters[start][$gte]=${now}` : `&filters[start][$lt]=${now}`;
  const sort = upcoming ? "start:asc" : "start:desc";
  const url = `${API_URL}/events?populate=*${filter}&sort[0]=${sort}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  const res = await fetch(url);

  if (!res.ok) {
    console.error("Failed to fetch events:", res.status);
    return { data: [], meta: emptyPagination(page, pageSize) };
  }

  return res.json();
}

export async function getEventBySlug(slug: string) {
  const url = `${API_URL}/events?populate=*&filters[slug][$eq]=${slug}`;
  const res = await fetch(url);

  if (!res.ok) {
    console.error("Failed to fetch event:", res.status);
    return null;
  }

  const data: StrapiResponse<Event> = await res.json();
  return data.data[0] || null;
}

export async function getRelatedEvents(currentSlug: string, tags: string[], limit = 3) {
  if (tags.length === 0) {
    const response = await getUpcomingEvents(limit + 1);
    return response.data.filter(event => event.slug !== currentSlug).slice(0, limit);
  }

  const tagFilters = tags.map((tag, index) => `filters[tags][tagName][$in][${index}]=${tag}`).join("&");
  const url = `${API_URL}/events?populate=*&${tagFilters}&filters[slug][$ne]=${currentSlug}&sort[0]=start:desc&pagination[limit]=${limit}`;
  const res = await fetch(url);

  if (!res.ok) {
    console.error("Failed to fetch related events:", res.status);
    return [];
  }

  const data: StrapiResponse<Event> = await res.json();
  return data.data;
}
