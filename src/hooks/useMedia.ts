// Media Hooks - React Query based media management
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import type { MediaItemWithMeta, MediaInput, GalleryLayout, GallerySettings } from '@/types/media';
import { MediaApi } from '@/lib/api/media.api';

type MediaItem = MediaItemWithMeta;

// Query Keys
export const mediaKeys = {
  all: ['media'] as const,
  lists: () => [...mediaKeys.all, 'list'] as const,
  list: (weddingId: string) => [...mediaKeys.lists(), weddingId] as const,
};

// ==================== Hooks ====================

/**
 * Fetch all media for a wedding
 */
export function useMedia(weddingId: string | undefined) {
  return useQuery({
    queryKey: mediaKeys.list(weddingId!),
    queryFn: () => MediaApi.findAll(weddingId!),
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
      return MediaApi.create(weddingId, input);
    },
    onSuccess: (newMedia, { weddingId }) => {
      queryClient.setQueryData<MediaItem[]>(mediaKeys.list(weddingId), (old) => {
        if (!old) return [newMedia];
        return [...old, newMedia].sort((a, b) => a.order - b.order);
      });
      queryClient.invalidateQueries({ queryKey: mediaKeys.list(weddingId) });
    },
  });
}

/**
 * Update existing media
 */
export function useUpdateMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: Partial<MediaInput>; weddingId: string }) => {
      return MediaApi.update(id, input);
    },
    onSuccess: (updatedMedia, { weddingId }) => {
      queryClient.setQueryData<MediaItem[]>(mediaKeys.list(weddingId), (old) =>
        old?.map((m) =>
          m.id === updatedMedia.id
            ? updatedMedia
            : m
        )
      );
      queryClient.invalidateQueries({ queryKey: mediaKeys.list(weddingId) });
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
      await MediaApi.remove(id);
      return id;
    },
    onSuccess: (deletedId, { weddingId }) => {
      queryClient.setQueryData<MediaItem[]>(mediaKeys.list(weddingId), (old) =>
        old?.filter((m) => m.id !== deletedId)
      );
      queryClient.invalidateQueries({ queryKey: mediaKeys.list(weddingId) });
    },
  });
}

/**
 * Reorder media
 */
export function useReorderMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ weddingId, mediaIds }: { weddingId: string; mediaIds: string[] }) => {
      await MediaApi.reorder(weddingId, mediaIds);
      return { weddingId, mediaIds };
    },
    onSuccess: ({ weddingId }) => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.list(weddingId) });
    },
    // Optimistic update could be added here if needed
    onMutate: async ({ weddingId, mediaIds }) => {
      await queryClient.cancelQueries({ queryKey: mediaKeys.list(weddingId) });
      const previousMedia = queryClient.getQueryData<MediaItem[]>(mediaKeys.list(weddingId));

      if (previousMedia) {
        const reordered = mediaIds.map(id => previousMedia.find(m => m.id === id)).filter(Boolean) as MediaItem[];
        queryClient.setQueryData<MediaItem[]>(mediaKeys.list(weddingId), reordered);
      }

      return { previousMedia };
    },
    onError: (_err, { weddingId }, context) => {
      if (context?.previousMedia) {
        queryClient.setQueryData(mediaKeys.list(weddingId), context.previousMedia);
      }
    }
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
