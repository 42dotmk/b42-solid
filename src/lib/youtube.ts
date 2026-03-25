"use server";

import type { YouTubePlaylist, YouTubeVideo } from "~/types";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
// @ts-ignore
const getYoutubeApiKey = () => import.meta.env.YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY;
// @ts-ignore
const getChannelId = () => import.meta.env.VITE_PUBLIC_YOUTUBE_CHANNEL_ID || process.env.VITE_PUBLIC_YOUTUBE_CHANNEL_ID || "YOUR_CHANNEL_ID";
const FETCH_TIMEOUT_MS = 5000;

function fetchWithTimeout(url: string, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

async function fetchAllPlaylistVideos(playlistId: string, playlistTitle?: string): Promise<YouTubeVideo[]> {
  const apiKey = getYoutubeApiKey();
  if (!apiKey || !playlistId) {
    return [];
  }

  const allVideos: YouTubeVideo[] = [];
  let nextPageToken: string | undefined;

  try {
    do {
      const pageParam = nextPageToken ? `&pageToken=${nextPageToken}` : "";
      const response = await fetchWithTimeout(
        `${YOUTUBE_API_BASE}/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50${pageParam}&key=${apiKey}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to fetch playlist videos:", response.status, JSON.stringify(errorData, null, 2));
        break;
      }

      const data = await response.json();

      const videos: YouTubeVideo[] =
        data.items?.map((item: any) => ({
          id: item.contentDetails.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail:
            item.snippet.thumbnails?.maxres?.url ||
            item.snippet.thumbnails?.high?.url ||
            item.snippet.thumbnails?.medium?.url ||
            item.snippet.thumbnails?.default?.url,
          publishedAt: item.snippet.publishedAt,
          channelTitle: item.snippet.channelTitle,
          playlistId,
          playlistTitle,
        })) || [];

      allVideos.push(...videos);
      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return allVideos;
  } catch (error) {
    console.error("Error fetching playlist videos:", error);
    return allVideos;
  }
}

async function enrichVideosWithDetails(videos: YouTubeVideo[]) {
  const apiKey = getYoutubeApiKey();
  if (!apiKey || videos.length === 0) {
    return videos;
  }

  try {
    const enrichedVideos = [...videos];

    for (let index = 0; index < videos.length; index += 50) {
      const batch = videos.slice(index, index + 50);
      const videoIds = batch.map(video => video.id).join(",");
      const response = await fetchWithTimeout(
        `${YOUTUBE_API_BASE}/videos?part=contentDetails,statistics&id=${videoIds}&key=${apiKey}`
      );

      if (!response.ok) continue;

      const data = await response.json();
      const detailsMap = new Map(
        data.items?.map((item: any) => [
          item.id,
          {
            duration: formatDuration(item.contentDetails?.duration),
            viewCount: formatViewCount(item.statistics?.viewCount),
          },
        ]) || []
      );

      for (let detailIndex = index; detailIndex < Math.min(index + 50, videos.length); detailIndex += 1) {
        const details = detailsMap.get(enrichedVideos[detailIndex].id);
        if (details) {
          enrichedVideos[detailIndex] = { ...enrichedVideos[detailIndex], ...details };
        }
      }
    }

    return enrichedVideos;
  } catch (error) {
    console.error("Error enriching videos:", error);
    return videos;
  }
}

export async function getChannelPlaylists(): Promise<YouTubePlaylist[]> {
  const apiKey = getYoutubeApiKey();
  if (!apiKey) {
    return [];
  }

  const allPlaylists: YouTubePlaylist[] = [];
  let nextPageToken: string | undefined;

  try {
    do {
      const pageParam = nextPageToken ? `&pageToken=${nextPageToken}` : "";
      const response = await fetchWithTimeout(
        `${YOUTUBE_API_BASE}/playlists?part=snippet,contentDetails&channelId=${getChannelId()}&maxResults=50${pageParam}&key=${apiKey}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to fetch playlists:", response.status, JSON.stringify(errorData, null, 2));
        break;
      }

      const data = await response.json();
      const playlists: YouTubePlaylist[] =
        data.items?.map((item: any) => ({
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
          itemCount: item.contentDetails.itemCount,
        })) || [];

      allPlaylists.push(...playlists);
      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return allPlaylists;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return allPlaylists;
  }
}

export async function getAllVideosFromPlaylists(playlists: YouTubePlaylist[]) {
  if (playlists.length === 0) {
    return [];
  }

  const playlistVideosArrays = await Promise.all(
    playlists.map(playlist => fetchAllPlaylistVideos(playlist.id, playlist.title))
  );

  const allVideos = playlistVideosArrays.flat();
  const videoMap = new Map<string, YouTubeVideo & { playlistIds: string[]; playlistTitles: string[] }>();

  for (const video of allVideos) {
    if (videoMap.has(video.id)) {
      const existing = videoMap.get(video.id)!;
      if (video.playlistId && !existing.playlistIds.includes(video.playlistId)) {
        existing.playlistIds.push(video.playlistId);
      }
      if (video.playlistTitle && !existing.playlistTitles.includes(video.playlistTitle)) {
        existing.playlistTitles.push(video.playlistTitle);
      }
      continue;
    }

    videoMap.set(video.id, {
      ...video,
      playlistIds: video.playlistId ? [video.playlistId] : [],
      playlistTitles: video.playlistTitle ? [video.playlistTitle] : [],
    });
  }

  const uniqueVideos = Array.from(videoMap.values()).sort(
    (left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
  );

  return enrichVideosWithDetails(uniqueVideos);
}

export async function getChannelVideos() {
  const apiKey = getYoutubeApiKey();
  if (!apiKey) {
    return [];
  }

  try {
    const channelResponse = await fetchWithTimeout(
      `${YOUTUBE_API_BASE}/channels?part=contentDetails&id=${getChannelId()}&key=${apiKey}`
    );

    if (!channelResponse.ok) {
      const errorData = await channelResponse.json().catch(() => ({}));
      console.error("Failed to fetch channel:", channelResponse.status, JSON.stringify(errorData, null, 2));
      return [];
    }

    const channelData = await channelResponse.json();
    const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      return [];
    }

    const videos = await fetchAllPlaylistVideos(uploadsPlaylistId, "All Uploads");
    return enrichVideosWithDetails(videos);
  } catch (error) {
    console.error("Error fetching channel videos:", error);
    return [];
  }
}

function formatDuration(isoDuration: string | undefined) {
  if (!isoDuration) return "";

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";

  const hours = match[1] ? Number.parseInt(match[1], 10) : 0;
  const minutes = match[2] ? Number.parseInt(match[2], 10) : 0;
  const seconds = match[3] ? Number.parseInt(match[3], 10) : 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatViewCount(count: string | undefined) {
  if (!count) return "";

  const num = Number.parseInt(count, 10);

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M views`;
  }

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K views`;
  }

  return `${num} views`;
}

export function getYouTubeEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function getYouTubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getYouTubeThumbnail(
  videoId: string,
  quality: "default" | "medium" | "high" | "maxres" = "high"
) {
  const qualityMap = {
    default: "default",
    medium: "mqdefault",
    high: "hqdefault",
    maxres: "maxresdefault",
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}
