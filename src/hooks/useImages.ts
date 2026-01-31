import type {
  CreateImageInput,
  UpdateImageInput,
  ReplaceImagesInput,
  Image,
} from "@/types/api.generated";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImageApi } from "@/lib/api/image.api";

// Query Keys
export const imageKeys = {
  all: ["images"] as const,
  lists: () => [...imageKeys.all, "list"] as const,
  list: (weddingId: string) => [...imageKeys.lists(), weddingId] as const,
  details: () => [...imageKeys.all, "detail"] as const,
  detail: (id: string) => [...imageKeys.details(), id] as const,
};

/**
 * Fetch all images for a wedding
 */
export function useWeddingImages(weddingId: string | undefined) {
  return useQuery({
    queryKey: imageKeys.list(weddingId!),
    queryFn: () => ImageApi.findAll(weddingId!),
    enabled: !!weddingId,
    staleTime: 30 * 1000,
  });
}

/**
 * Replace all images for a wedding
 */
export function useReplaceWeddingImages(weddingId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ReplaceImagesInput) =>
      ImageApi.replace(weddingId, input),
    onSuccess: (newImages) => {
      queryClient.setQueryData(imageKeys.list(weddingId), newImages);
      queryClient.invalidateQueries({ queryKey: imageKeys.list(weddingId) });
    },
  });
}

/**
 * Update an existing image
 */
export function useUpdateImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateImageInput;
      weddingId: string;
    }) => ImageApi.update(id, input),
    onSuccess: (updatedImage, { weddingId }) => {
      queryClient.setQueryData<Image[]>(imageKeys.list(weddingId), (old) =>
        old?.map((img) => (img.id === updatedImage.id ? updatedImage : img)),
      );
      queryClient.invalidateQueries({ queryKey: imageKeys.list(weddingId) });
      queryClient.invalidateQueries({
        queryKey: imageKeys.detail(updatedImage.id),
      });
    },
  });
}

/**
 * Delete an image
 */
export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; weddingId: string }) =>
      ImageApi.remove(id),
    onSuccess: (_, { weddingId, id }) => {
      queryClient.setQueryData<Image[]>(imageKeys.list(weddingId), (old) =>
        old?.filter((img) => img.id !== id),
      );
      queryClient.invalidateQueries({ queryKey: imageKeys.list(weddingId) });
      queryClient.removeQueries({ queryKey: imageKeys.detail(id) });
    },
  });
}
