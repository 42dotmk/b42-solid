export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  url: string;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Tag {
  id: number;
  tagName: string;
}

export interface Event {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  summary: string;
  start: string;
  locale: string;
  registerLink: string | null;
  calendarUrl: string | null;
  promo: StrapiImage | null;
  photos: StrapiImage[];
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  playlistId?: string;
  playlistTitle?: string;
  playlistIds?: string[];
  playlistTitles?: string[];
  duration?: string;
  viewCount?: string;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  itemCount: number;
}
