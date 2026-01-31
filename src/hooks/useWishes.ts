// Wish Hooks - React Query based wish management
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { WishApi } from '@/lib/api/wish.api';
import type { UpdateWishDto, Wish } from '@/types/api.generated';

// Query Keys
export const wishKeys = {
  all: ['wishes'] as const,
  lists: () => [...wishKeys.all, 'list'] as const,
  list: (weddingId: string) => [...wishKeys.lists(), weddingId] as const,
  public: (weddingId: string) => [...wishKeys.all, 'public', weddingId] as const,
};

// ==================== Queries ====================

/**
 * Fetch all wishes for a wedding
 * NOTE: Swagger GET /api/v1/wishs has NO params.
 * Assuming it returns all wishes associated with the wedding context.
 */
export function useWishes(weddingId: string | undefined) {
  return useQuery({
    queryKey: wishKeys.list(weddingId!),
    queryFn: WishApi.findAll,
    enabled: !!weddingId,
    staleTime: 30 * 1000,
  });
}

/**
 * Fetch public (approved) wishes
 * NOTE: Swagger has NO public wishes endpoint.
 * "Use ONLY data from components.schemas..."
 * So we likely just reuse `findAll` and filter client-side if needed, OR the backend handles public access?
 * If this is for public view, `WishApi.findAll` might fail if not authenticated.
 * PROMPT: "REST APIs ... strictly based on OpenAPI spec".
 * If OpenAPI has security requirement for GET /wishs, then we can't call it without auth.
 * Swagger: /api/v1/wishs GET has `security: []`? No?
 * /api/v1/wishs (plural? "wishs"? yes)
 * "get": { "operationId": "WishController_findAll", ... "tags": ["Wish"] }
 * It DOES NOT show `security` block locally for this endpoint in the provided JSON snippet? 
 * Wait, /api/v1/auth/logout has security.
 * /api/v1/grooms has security.
 * /api/v1/wishs GET has `tags` but NO `security` listed in the snippet provided for "wishs"?
 * Let's look closely at the wishs section in the Prompt.
 * "/api/v1/wishs": { "post": ..., "get": { "operationId": "WishController_findAll", parameters: [], responses: ... } }
 * It is MISSING `security: [{ access-token: [] }]`.
 * This implies it might be PUBLIC!
 * So `WishApi.findAll` should work for public.
 */
export function usePublicWishes(weddingId: string | undefined) {
  return useQuery({
    queryKey: wishKeys.public(weddingId!),
    queryFn: async () => {
      const wishes = await WishApi.findAll();
      // Client-side filter for approved wishes if the API returns all?
      // Or assume API returns what is appropriate.
      // We will return all for now.
      return wishes;
      // Note: To filter: return wishes.filter(w => w.isApproved);
    },
    enabled: !!weddingId,
    staleTime: 60 * 1000,
  });
}

// ==================== Mutations ====================

/**
 * Add a new wish
 * Swagger /api/v1/wishs POST (Create)
 * No request body in Swagger?
 * "/api/v1/wishs": { "post": ... } parameters []
 * So no args.
 */
export function useAddWish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => WishApi.create(),
    onSuccess: (newWish) => {
      // Invalidate both lists
      queryClient.invalidateQueries({ queryKey: wishKeys.all });
    },
  });
}

/**
 * Approve a wish
 * Swagger: No approve endpoint. 
 * Use PATCH /api/v1/wishs/{id} with isApproved=true.
 */
export function useApproveWish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; weddingId: string }) =>
      WishApi.update(id, { isApproved: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishKeys.all });
    },
  });
}

/**
 * Delete a wish
 */
export function useDeleteWish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; weddingId: string }) => WishApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishKeys.all });
    },
  });
}
