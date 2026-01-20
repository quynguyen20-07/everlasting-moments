// Wish Hooks - React Query based wish management
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { graphqlRequest, graphqlPublicRequest } from '@/lib/graphql/client';
import { addWishApi, approveWishApi, deleteWishApi } from '@/lib/api/wish';
import type { Wish, WishInput } from '@/types/graphql';

// GraphQL Queries
const WISHES_QUERY = `
  query Wishes($weddingId: ID!) {
    wishes(weddingId: $weddingId) {
      id
      weddingId
      guestName
      message
      isApproved
      isActive
      createdAt
      updatedAt
    }
  }
`;

const PUBLIC_WISHES_QUERY = `
  query PublicWishes($weddingId: ID!) {
    publicWishes(weddingId: $weddingId) {
      id
      weddingId
      guestName
      message
      isApproved
      createdAt
    }
  }
`;

// Query Keys
export const wishKeys = {
  all: ['wishes'] as const,
  lists: () => [...wishKeys.all, 'list'] as const,
  list: (weddingId: string) => [...wishKeys.lists(), weddingId] as const,
  public: (weddingId: string) => [...wishKeys.all, 'public', weddingId] as const,
};

// ==================== Queries ====================

/**
 * Fetch all wishes for a wedding (admin/owner view)
 */
export function useWishes(weddingId: string | undefined) {
  return useQuery({
    queryKey: wishKeys.list(weddingId!),
    queryFn: async () => {
      const data = await graphqlRequest<{ wishes: Wish[] }>(WISHES_QUERY, { weddingId });
      return data.wishes;
    },
    enabled: !!weddingId,
    staleTime: 30 * 1000,
  });
}

/**
 * Fetch public (approved) wishes for a wedding
 */
export function usePublicWishes(weddingId: string | undefined) {
  return useQuery({
    queryKey: wishKeys.public(weddingId!),
    queryFn: async () => {
      const data = await graphqlPublicRequest<{ publicWishes: Wish[] }>(PUBLIC_WISHES_QUERY, { weddingId });
      return data.publicWishes || [];
    },
    enabled: !!weddingId,
    staleTime: 60 * 1000,
  });
}

// ==================== Mutations ====================

/**
 * Add a new wish (public - no auth required)
 */
export function useAddWish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ weddingId, wish }: { weddingId: string; wish: WishInput }) =>
      addWishApi(weddingId, wish),
    onSuccess: (newWish, { weddingId }) => {
      queryClient.setQueryData<Wish[]>(wishKeys.public(weddingId), (old) => {
        if (!old) return [newWish];
        return [...old, newWish];
      });
      queryClient.invalidateQueries({ queryKey: wishKeys.list(weddingId) });
    },
  });
}

/**
 * Approve a wish
 */
export function useApproveWish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; weddingId: string }) => approveWishApi(id),
    onSuccess: (approvedWish, { weddingId }) => {
      queryClient.setQueryData<Wish[]>(wishKeys.list(weddingId), (old) =>
        old?.map((w) => (w.id === approvedWish.id ? { ...w, isApproved: true } : w))
      );
      queryClient.invalidateQueries({ queryKey: wishKeys.public(weddingId) });
    },
  });
}

/**
 * Delete a wish
 */
export function useDeleteWish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; weddingId: string }) => deleteWishApi(id),
    onSuccess: (deletedWish, { weddingId }) => {
      queryClient.setQueryData<Wish[]>(wishKeys.list(weddingId), (old) =>
        old?.filter((w) => w.id !== deletedWish.id)
      );
      queryClient.invalidateQueries({ queryKey: wishKeys.public(weddingId) });
    },
  });
}
