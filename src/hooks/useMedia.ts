// Media Hooks - React Query based media management
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import type { MediaItemWithMeta, MediaInput, GalleryLayout, GallerySettings } from '@/types/media';

type MediaItem = MediaItemWithMeta;

// Query Keys
export const mediaKeys = {
  all: ['media'] as const,
  lists: () => [...mediaKeys.all, 'list'] as const,
  list: (weddingId: string) => [...mediaKeys.lists(), weddingId] as const,
};

// Mock data for demo
const mockMedia: MediaItem[] = [
  {
    id: "media-1",
    weddingId: "wedding-1",
    type: "image",
    url: "/images/wedding06.webp",
    caption: "Ảnh cưới ngoài trời",
    order: 0,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "media-2",
    weddingId: "wedding-1",
    type: "image",
    url: "/images/wedding01.jpg",
    caption: "Khoảnh khắc hạnh phúc",
    order: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "media-3",
    weddingId: "wedding-1",
    type: "image",
    url: "/images/wedding02.jpg",
    caption: "Ngày trọng đại",
    order: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "media-4",
    weddingId: "wedding-1",
    type: "image",
    url: "/images/wedding004.webp",
    caption: "Tình yêu vĩnh cửu",
    order: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "media-5",
    weddingId: "wedding-1",
    type: "image",
    url: "/images/wedding04.jpg",
    caption: "Bên nhau trọn đời",
    order: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "media-6",
    weddingId: "wedding-1",
    type: "image",
    url: "/images/wedding05.jpg",
    caption: "Hạnh phúc viên mãn",
    order: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Simulated API functions
async function fetchMediaApi(weddingId: string): Promise<MediaItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const media = mockMedia.filter((m) => m.weddingId === weddingId || weddingId === "wedding-1");
  return media.sort((a, b) => a.order - b.order);
}

async function addMediaApi(weddingId: string, input: MediaInput, currentLength: number): Promise<MediaItem> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: `media-${Date.now()}`,
    weddingId,
    type: input.type,
    url: input.url,
    thumbnail: input.thumbnail,
    caption: input.caption || "",
    order: input.order ?? currentLength,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function updateMediaApi(id: string, input: Partial<MediaInput>): Promise<MediaItem> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  // Return a mock updated item - in real implementation this would come from server
  return {
    id,
    weddingId: "wedding-1",
    type: input.type || "image",
    url: input.url || "",
    caption: input.caption || "",
    order: input.order ?? 0,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function deleteMediaApi(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
}

// ==================== Hooks ====================

/**
 * Fetch all media for a wedding
 */
export function useMedia(weddingId: string | undefined) {
  return useQuery({
    queryKey: mediaKeys.list(weddingId!),
    queryFn: () => fetchMediaApi(weddingId!),
    enabled: !!weddingId,
    staleTime: 30 * 1000,
  });
}

/**
 * Add new media
 */
export function useAddMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ weddingId, input }: { weddingId: string; input: MediaInput }) => {
      const currentMedia = queryClient.getQueryData<MediaItem[]>(mediaKeys.list(weddingId)) || [];
      return addMediaApi(weddingId, input, currentMedia.length);
    },
    onSuccess: (newMedia, { weddingId }) => {
      queryClient.setQueryData<MediaItem[]>(mediaKeys.list(weddingId), (old) => {
        if (!old) return [newMedia];
        return [...old, newMedia].sort((a, b) => a.order - b.order);
      });
    },
  });
}

/**
 * Update existing media
 */
export function useUpdateMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input, weddingId }: { id: string; input: Partial<MediaInput>; weddingId: string }) => {
      await updateMediaApi(id, input);
      return { id, input };
    },
    onSuccess: ({ id, input }, { weddingId }) => {
      queryClient.setQueryData<MediaItem[]>(mediaKeys.list(weddingId), (old) =>
        old?.map((m) =>
          m.id === id
            ? { ...m, ...input, updatedAt: new Date().toISOString() }
            : m
        )
      );
    },
  });
}

/**
 * Delete media
 */
export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string; weddingId: string }) => {
      await deleteMediaApi(id);
      return id;
    },
    onSuccess: (deletedId, { weddingId }) => {
      queryClient.setQueryData<MediaItem[]>(mediaKeys.list(weddingId), (old) =>
        old?.filter((m) => m.id !== deletedId)
      );
    },
  });
}

/**
 * Reorder media (local only, no API call)
 */
export function useReorderMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ weddingId, mediaIds }: { weddingId: string; mediaIds: string[] }) => {
      return { weddingId, mediaIds };
    },
    onSuccess: ({ weddingId, mediaIds }) => {
      queryClient.setQueryData<MediaItem[]>(mediaKeys.list(weddingId), (old) => {
        if (!old) return old;
        return mediaIds
          .map((id, index) => {
            const item = old.find((m) => m.id === id);
            if (item) {
              return { ...item, order: index };
            }
            return null;
          })
          .filter(Boolean) as MediaItem[];
      });
    },
  });
}

/**
 * Gallery settings hook - local state only (not server-synced)
 */
export function useGallerySettings() {
  const [settings, setSettings] = useState<GallerySettings>({
    layout: "featured",
    showCaptions: true,
    enableLightbox: true,
  });

  const setLayout = useCallback((layout: GalleryLayout) => {
    setSettings((prev) => ({ ...prev, layout }));
  }, []);

  const updateSettings = useCallback((updates: Partial<GallerySettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  return {
    settings,
    setLayout,
    updateSettings,
  };
}
