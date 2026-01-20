// Guest Hooks - React Query based guest management
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getGuestsApi,
  getGuestStatsApi,
  addGuestApi,
  updateGuestApi,
  deleteGuestApi,
  submitRSVPApi,
} from '@/lib/api/guest';
import type { Guest, GuestStats, GuestInput, RSVPInput } from '@/types/graphql';

// Query Keys
export const guestKeys = {
  all: ['guests'] as const,
  lists: () => [...guestKeys.all, 'list'] as const,
  list: (weddingId: string) => [...guestKeys.lists(), weddingId] as const,
  stats: (weddingId: string) => [...guestKeys.all, 'stats', weddingId] as const,
};

// ==================== Queries ====================

/**
 * Fetch all guests for a wedding
 */
export function useGuests(weddingId: string | undefined) {
  return useQuery({
    queryKey: guestKeys.list(weddingId!),
    queryFn: () => getGuestsApi(weddingId!),
    enabled: !!weddingId,
    staleTime: 30 * 1000,
  });
}

/**
 * Fetch guest statistics for a wedding
 */
export function useGuestStats(weddingId: string | undefined) {
  return useQuery({
    queryKey: guestKeys.stats(weddingId!),
    queryFn: () => getGuestStatsApi(weddingId!),
    enabled: !!weddingId,
    staleTime: 30 * 1000,
  });
}

// ==================== Mutations ====================

/**
 * Add a new guest
 */
export function useAddGuest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ weddingId, guest }: { weddingId: string; guest: GuestInput }) =>
      addGuestApi(weddingId, guest),
    onSuccess: (newGuest, { weddingId }) => {
      queryClient.setQueryData<Guest[]>(guestKeys.list(weddingId), (old) => {
        if (!old) return [newGuest];
        return [...old, newGuest];
      });
      queryClient.invalidateQueries({ queryKey: guestKeys.stats(weddingId) });
    },
  });
}

/**
 * Update an existing guest
 */
export function useUpdateGuest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, guest }: { id: string; guest: GuestInput; weddingId: string }) =>
      updateGuestApi(id, guest),
    onSuccess: (updatedGuest, { weddingId }) => {
      queryClient.setQueryData<Guest[]>(guestKeys.list(weddingId), (old) =>
        old?.map((g) => (g.id === updatedGuest.id ? updatedGuest : g))
      );
      queryClient.invalidateQueries({ queryKey: guestKeys.stats(weddingId) });
    },
  });
}

/**
 * Delete a guest
 */
export function useDeleteGuest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; weddingId: string }) => deleteGuestApi(id),
    onSuccess: (deletedGuest, { weddingId }) => {
      queryClient.setQueryData<Guest[]>(guestKeys.list(weddingId), (old) =>
        old?.map((g) => (g.id === deletedGuest.id ? { ...g, isActive: false } : g))
      );
      queryClient.invalidateQueries({ queryKey: guestKeys.stats(weddingId) });
    },
  });
}

/**
 * Submit RSVP (public - no auth required)
 */
export function useSubmitRSVP() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ weddingId, rsvp }: { weddingId: string; rsvp: RSVPInput }) =>
      submitRSVPApi(weddingId, rsvp),
    onSuccess: (_, { weddingId }) => {
      queryClient.invalidateQueries({ queryKey: guestKeys.list(weddingId) });
      queryClient.invalidateQueries({ queryKey: guestKeys.stats(weddingId) });
    },
  });
}
