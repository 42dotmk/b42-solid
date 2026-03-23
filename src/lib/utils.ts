import { type ClassValue, clsx } from "clsx";
import { format, formatDistanceToNow, isPast, isThisWeek, isToday, isTomorrow } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, formatStr = "MMM d, yyyy") {
  return format(new Date(dateString), formatStr);
}

export function formatTime(dateString: string) {
  return format(new Date(dateString), "HH:mm");
}

export function formatEventDate(dateString: string) {
  const date = new Date(dateString);

  if (isToday(date)) {
    return `Today at ${format(date, "HH:mm")}`;
  }

  if (isTomorrow(date)) {
    return `Tomorrow at ${format(date, "HH:mm")}`;
  }

  if (isThisWeek(date)) {
    return format(date, "EEEE 'at' HH:mm");
  }

  return format(date, "MMM d, yyyy 'at' HH:mm");
}

export function getRelativeTime(dateString: string) {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

export function isEventPast(dateString: string) {
  return isPast(new Date(dateString));
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}...`;
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "");
}

export function getExcerpt(html: string, length = 160) {
  return truncate(stripHtml(html), length);
}

export function getTagColor(tagName: string) {
  const colors: Record<string, string> = {
    AI: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Machine Learning": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    PyData: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Agents: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    Meetup: "bg-green-500/20 text-green-400 border-green-500/30",
    Workshop: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    Competition: "bg-red-500/20 text-red-400 border-red-500/30",
    Charity: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    "Quantum Computing": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    Research: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    DevOps: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    FOSS: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  };

  return colors[tagName] || "bg-dark-600 text-text-secondary border-border";
}

export function createGoogleCalendarUrl(
  title: string,
  start: string,
  description: string,
  location = "Base42, Rimska 25, Skopje"
) {
  const startDate = new Date(start);
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const formatForGoogle = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatForGoogle(startDate)}/${formatForGoogle(endDate)}`,
    details: stripHtml(description).slice(0, 500),
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getShareUrls(title: string, url: string) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };
}
