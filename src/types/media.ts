// Media types for wedding gallery
// Re-export MediaItem from wedding.ts for consistency
export type { MediaItem } from "./wedding";

// Extended MediaItem with additional fields for API
export interface MediaItemWithMeta {
  id: string;
  weddingId: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  caption?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MediaInput {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  caption?: string;
  order?: number;
}

export type GalleryLayout = "grid-2" | "grid-3" | "masonry" | "featured" | "carousel";

export interface GallerySettings {
  layout: GalleryLayout;
  showCaptions: boolean;
  enableLightbox: boolean;
}
