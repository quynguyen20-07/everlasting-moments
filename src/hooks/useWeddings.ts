import { WeddingApi } from "@/lib/api/wedding.api";
import { BrideApi } from "@/lib/api/bride.api";
import { GroomApi } from "@/lib/api/groom.api";
import { LoveStoryApi } from "@/lib/api/love-story.api";
import { EventApi } from "@/lib/api/event.api";
import { ThemeSettingsApi } from "@/lib/api/theme-settings.api";
import { slugify } from "@/lib/utils";

import type {
  Wedding,
  UpdateBrideDto,
  UpdateGroomDto,
  UpdateLoveStoryDto,
  UpdateWeddingDto,
  UpdateEventDto as WeddingEventInput,
  // UpdateLoveStoryDto as LoveStoryInput,
} from "@/types/api.generated";
import type { CreateEventPayload, CreateLoveStoryPayload } from "@/types/payloads";

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
    queryFn: WeddingApi.findAll,
    staleTime: 30 * 1000,
  });
}

/**
 * Fetch a single wedding by ID
 */
export function useWedding(id: string | undefined) {
  return useQuery({
    queryKey: weddingKeys.detail(id!),
    queryFn: () => WeddingApi.findOne(id!),
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

/**
 * Fetch a public wedding by slug
 */
export function usePublicWedding(slug: string | undefined) {
  return useQuery({
    queryKey: weddingKeys.public(slug!),
    queryFn: () => WeddingApi.findBySlug(slug!),
    enabled: !!slug,
    staleTime: 60 * 1000,
  });
}

// ==================== Mutations ====================

/**
 * Create a new wedding
 */


type CreateWeddingInput = {
  title: string;
  language?: "vi" | "en";
  weddingDate: string;
  bride: {
    fullName: string;
    shortBio?: string;
    familyInfo?: string;
    avatar?: string;
  };
  groom: {
    fullName: string;
    shortBio?: string;
    familyInfo?: string;
    avatar?: string;
  };
  themeSettings: {
    template?: string;
    primaryColor?: string;
    secondaryColor?: string;
    fontHeading?: string;
    fontBody?: string;
    backgroundMusic?: string;
  };
};

/**
 * Create a new wedding
 */
export function useCreateWedding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateWeddingInput) => {
      // 1. Create Wedding
      const slug = `${slugify(input.title)}-${Date.now()}`; // Ensure uniqueness
      const wedding = await WeddingApi.create({
        title: input.title,
        slug,
        weddingDate: input.weddingDate,
        language: input.language,
        status: "draft",
      });

      // 2. Create Related Entities in parallel
      await Promise.all([
        BrideApi.create({
          weddingId: wedding.id,
          fullName: input.bride.fullName,
          shortBio: input.bride.shortBio,
          familyInfo: input.bride.familyInfo,
        }),
        GroomApi.create({
          weddingId: wedding.id,
          fullName: input.groom.fullName,
          shortBio: input.groom.shortBio,
          familyInfo: input.groom.familyInfo,
        }),
        ThemeSettingsApi.create({
          weddingId: wedding.id,
          template: input.themeSettings.template,
          primaryColor: input.themeSettings.primaryColor,
          secondaryColor: input.themeSettings.secondaryColor,
          fontHeading: input.themeSettings.fontHeading,
          fontBody: input.themeSettings.fontBody,
          backgroundMusic: input.themeSettings.backgroundMusic,
        }),
      ]);

      return wedding;
    },
    onSuccess: (newWedding) => {
      queryClient.setQueryData<Wedding[]>(weddingKeys.lists(), (old) => {
        if (!old) return [newWedding];
        return [...old, newWedding];
      });
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
      updates: UpdateWeddingDto;
    }) => WeddingApi.update(id, updates),
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
    mutationFn: WeddingApi.remove,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Wedding[]>(weddingKeys.lists(), (old) =>
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
    mutationFn: (id: string) => WeddingApi.update(id, { status: 'published' }),
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
    mutationFn: (id: string) => WeddingApi.update(id, { status: 'draft' }),
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
    mutationFn: ({ id, status }: { id: string; status: 'draft' | 'published' | 'archived' }) =>
      WeddingApi.update(id, { status }),
    onSuccess: (updated, { id }) => {
      queryClient.setQueryData(weddingKeys.detail(id), updated);
      queryClient.invalidateQueries({ queryKey: weddingKeys.lists() });
    },
  });
}

// ==================== Bride/Groom/LoveStory/Event Mutations ====================
// Simplified to use Update... APIs

export function useUpdateBride() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, bride }: { id: string; bride: UpdateBrideDto }) => BrideApi.update(id, bride),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: weddingKeys.all }),
  });
}

export function useUpdateGroom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, groom }: { id: string; groom: UpdateGroomDto }) => GroomApi.update(id, groom),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: weddingKeys.all }),
  });
}

export function useAddLoveStory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ weddingId, story }: { weddingId: string; story: UpdateLoveStoryDto }) =>
      LoveStoryApi.create({ ...story, weddingId, title: story.title! }), // title is required in CreatePayload
    onSuccess: () => queryClient.invalidateQueries({ queryKey: weddingKeys.all }),
  });
}

export function useUpdateLoveStory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, story }: { id: string; story: UpdateLoveStoryDto }) => LoveStoryApi.update(id, story),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: weddingKeys.all }),
  });
}

export function useDeleteLoveStory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LoveStoryApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: weddingKeys.all }),
  });
}

export function useAddWeddingEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ weddingId, event }: { weddingId: string; event: WeddingEventInput }) =>
      EventApi.create({ ...event, weddingId, title: event.title! }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: weddingKeys.all }),
  });
}

export function useUpdateWeddingEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, event }: { id: string; event: WeddingEventInput }) => EventApi.update(id, event),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: weddingKeys.all }),
  });
}

export function useDeleteWeddingEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EventApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: weddingKeys.all }),
  });
}
