import { query } from "@solidjs/router";
import { getAllEvents, getEventBySlug, getRelatedEvents, getUpcomingEvents } from "~/lib/api";
import { getAllVideosFromPlaylists, getChannelPlaylists, getChannelVideos } from "~/lib/youtube";

export const getHomePageData = query(async () => {
  const [upcomingResponse, videos] = await Promise.all([getUpcomingEvents(3), getChannelVideos()]);

  return {
    upcomingEvents: upcomingResponse.data,
    latestVideos: videos.slice(0, 3),
  };
}, "home-page-data");

export const getEventsPageData = query(async () => {
  const [upcomingResponse, pastResponse] = await Promise.all([getAllEvents(1, 12, true), getAllEvents(1, 6, false)]);

  return {
    upcomingEvents: upcomingResponse.data,
    pastEvents: pastResponse.data,
    pastMeta: pastResponse.meta,
  };
}, "events-page-data");

export const getEventPageData = query(async (slug: string) => {
  const event = await getEventBySlug(slug);

  if (!event) {
    return null;
  }

  const tagNames = event.tags?.map(tag => tag.tagName) || [];
  const relatedEvents = await getRelatedEvents(slug, tagNames, 3);

  return { event, relatedEvents };
}, "event-page-data");

export const getVideosPageData = query(async () => {
  const playlists = await getChannelPlaylists();
  const videos = await getAllVideosFromPlaylists(playlists);
  return { playlists, videos };
}, "videos-page-data");
