import {
  getWeddingsApi,
  getWeddingApi,
  getPublicWeddingApi,
  createWeddingApi,
  updateWeddingApi,
  deleteWeddingApi,
  publishWeddingApi,
  unpublishWeddingApi,
  updateBrideApi,
  updateGroomApi,
  addLoveStoryApi,
  updateLoveStoryApi,
  deleteLoveStoryApi,
  addWeddingEventApi,
  updateWeddingEventApi,
  deleteWeddingEventApi,
  type ListWedding,
} from "@/lib/api/wedding";
import type {
  Wedding,
  BrideGroomInput,
  LoveStoryInput,
  CreateWeddingInput,
  WeddingEventInput,
} from "@/types";
// Wedding Hooks - React Query based wedding management
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Query Keys
export const weddingKeys = {
  all: ["weddings"] as const,
  lists: () => [...weddingKeys.all, "list"] as const,
  list: (filters?: string) => [...weddingKeys.lists(), filters] as const,
  details: () => [...weddingKeys.all, "detail"] as const,
  detail: (id: string) => [...weddingKeys.details(), id] as const,
  public: (slug: string) => [...weddingKeys.all, "public", slug] as const,
};

// ==================== Queries ====================

/**
 * Fetch all weddings for the current user
 */
export function useWeddings() {
  return useQuery({
    queryKey: weddingKeys.lists(),
    queryFn: getWeddingsApi,
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Fetch a single wedding by ID
 */
export function useWedding(id: string | undefined) {
  return useQuery({
    queryKey: weddingKeys.detail(id!),
    queryFn: () => getWeddingApi(id!),
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

/**
 * Fetch a public wedding by slug (no auth required)
 */
export function usePublicWedding(slug: string | undefined) {
  return useQuery({
    queryKey: weddingKeys.public(slug!),
    queryFn: () => getPublicWeddingApi(slug!),
    enabled: !!slug,
    staleTime: 60 * 1000, // 1 minute
  });
}

// ==================== Mutations ====================

/**
 * Create a new wedding
 */
export function useCreateWedding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateWeddingInput) => createWeddingApi(input),
    onSuccess: (newWedding) => {
      // Add to list cache
      queryClient.setQueryData<ListWedding[]>(weddingKeys.lists(), (old) => {
        if (!old) return [newWedding as unknown as ListWedding];
        return [...old, newWedding as unknown as ListWedding];
      });
      // Invalidate to refetch fresh data
      queryClient.invalidateQueries({ queryKey: weddingKeys.lists() });
    },
  });
}

/**
 * Update a wedding
 */
export function useUpdateWedding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: { title?: string; slug?: string; status?: string };
    }) => updateWeddingApi(id, updates),
    onSuccess: (updated, { id }) => {
      queryClient.setQueryData(weddingKeys.detail(id), updated);
      queryClient.invalidateQueries({ queryKey: weddingKeys.lists() });
    },
  });
}

/**
 * Delete a wedding
 */
export function useDeleteWedding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWeddingApi,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<ListWedding[]>(weddingKeys.lists(), (old) =>
        old?.filter((w) => w.id !== deletedId),
      );
      queryClient.removeQueries({ queryKey: weddingKeys.detail(deletedId) });
    },
  });
}

/**
 * Publish a wedding
 */
export function usePublishWedding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: publishWeddingApi,
    onSuccess: (updated, id) => {
      queryClient.setQueryData(weddingKeys.detail(id), updated);
      queryClient.invalidateQueries({ queryKey: weddingKeys.lists() });
    },
  });
}

/**
 * Unpublish a wedding
 */
export function useUnpublishWedding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unpublishWeddingApi,
    onSuccess: (updated, id) => {
      queryClient.setQueryData(weddingKeys.detail(id), updated);
      queryClient.invalidateQueries({ queryKey: weddingKeys.lists() });
    },
  });
}

/**
 * Update wedding status
 */
export function useUpdateWeddingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateWeddingApi(id, { status }),
    onSuccess: (updated, { id }) => {
      queryClient.setQueryData(weddingKeys.detail(id), updated);
      queryClient.invalidateQueries({ queryKey: weddingKeys.lists() });
    },
  });
}

// ==================== Bride/Groom Mutations ====================

export function useUpdateBride() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      weddingId,
      bride,
    }: {
      weddingId: string;
      bride: BrideGroomInput;
    }) => updateBrideApi(weddingId, bride),
    onSuccess: (updatedDetail, { weddingId }) => {
      queryClient.setQueryData<Wedding | null>(
        weddingKeys.detail(weddingId),
        (old) => {
          if (!old) return old;
          return { ...old, weddingDetail: updatedDetail };
        },
      );
    },
  });
}

export function useUpdateGroom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      weddingId,
      groom,
    }: {
      weddingId: string;
      groom: BrideGroomInput;
    }) => updateGroomApi(weddingId, groom),
    onSuccess: (updatedDetail, { weddingId }) => {
      queryClient.setQueryData<Wedding | null>(
        weddingKeys.detail(weddingId),
        (old) => {
          if (!old) return old;
          return { ...old, weddingDetail: updatedDetail };
        },
      );
    },
  });
}

// ==================== Love Story Mutations ====================

export function useAddLoveStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      weddingId,
      story,
    }: {
      weddingId: string;
      story: LoveStoryInput;
    }) => addLoveStoryApi(weddingId, story),
    onSuccess: (updatedDetail, { weddingId }) => {
      queryClient.setQueryData<Wedding | null>(
        weddingKeys.detail(weddingId),
        (old) => {
          if (!old) return old;
          return { ...old, weddingDetail: updatedDetail };
        },
      );
    },
  });
}

export function useUpdateLoveStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      weddingId,
      storyId,
      story,
    }: {
      weddingId: string;
      storyId: string;
      story: LoveStoryInput;
    }) => updateLoveStoryApi(weddingId, storyId, story),
    onSuccess: (updatedDetail, { weddingId }) => {
      queryClient.setQueryData<Wedding | null>(
        weddingKeys.detail(weddingId),
        (old) => {
          if (!old) return old;
          return { ...old, weddingDetail: updatedDetail };
        },
      );
    },
  });
}

export function useDeleteLoveStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      weddingId,
      storyId,
    }: {
      weddingId: string;
      storyId: string;
    }) => deleteLoveStoryApi(weddingId, storyId),
    onSuccess: (updatedDetail, { weddingId }) => {
      queryClient.setQueryData<Wedding | null>(
        weddingKeys.detail(weddingId),
        (old) => {
          if (!old) return old;
          return { ...old, weddingDetail: updatedDetail };
        },
      );
    },
  });
}

// ==================== Wedding Event Mutations ====================

export function useAddWeddingEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      weddingId,
      event,
    }: {
      weddingId: string;
      event: WeddingEventInput;
    }) => addWeddingEventApi(weddingId, event),
    onSuccess: (updatedDetail, { weddingId }) => {
      queryClient.setQueryData<Wedding | null>(
        weddingKeys.detail(weddingId),
        (old) => {
          if (!old) return old;
          return { ...old, weddingDetail: updatedDetail };
        },
      );
    },
  });
}

export function useUpdateWeddingEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      weddingId,
      eventId,
      event,
    }: {
      weddingId: string;
      eventId: string;
      event: WeddingEventInput;
    }) => updateWeddingEventApi(weddingId, eventId, event),
    onSuccess: (updatedDetail, { weddingId }) => {
      queryClient.setQueryData<Wedding | null>(
        weddingKeys.detail(weddingId),
        (old) => {
          if (!old) return old;
          return { ...old, weddingDetail: updatedDetail };
        },
      );
    },
  });
}

export function useDeleteWeddingEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      weddingId,
      eventId,
    }: {
      weddingId: string;
      eventId: string;
    }) => deleteWeddingEventApi(weddingId, eventId),
    onSuccess: (updatedDetail, { weddingId }) => {
      queryClient.setQueryData<Wedding | null>(
        weddingKeys.detail(weddingId),
        (old) => {
          if (!old) return old;
          return { ...old, weddingDetail: updatedDetail };
        },
      );
    },
  });
}
