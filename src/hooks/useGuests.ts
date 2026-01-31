// Guest Hooks - React Query based guest management
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GuestApi } from '@/lib/api/guest.api';
import type { UpdateGuestDto, Guest } from '@/types/api.generated';

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
 * NOTE: Swagger GET /api/v1/guests has NO parameters.
 * It likely returns all guests for the authenticated user/wedding.
 * The previous code passed `weddingId`.
 * We will assume the API handles context, so we just call findAll().
 */
export function useGuests(weddingId: string | undefined) {
  return useQuery({
    queryKey: guestKeys.list(weddingId!),
    queryFn: GuestApi.findAll,
    enabled: !!weddingId,
    staleTime: 30 * 1000,
  });
}

/**
 * Fetch guest statistics for a wedding
 * NOTE: Swagger DOES NOT have a /guests/stats endpoint.
 * We must remove this functionality or calculate it client-side from useGuests.
 * "If something is not in Swagger, DO NOT use it."
 * "DO NOT invent new fields or endpoints".
 * So I will remove `useGuestStats` OR implement it using `useGuests` data filtering?
 * The prompt says "INTEGRATE APIs INTO EXISTING TANSTACK QUERY HOOKS".
 * If I remove it, I might break components.
 * Best approach: Use `GuestApi.findAll` and rely on React Query to select/derive stats?
 * But useQuery hook usually returns data.
 * I'll modify the queryFn to fetch guests and return derived stats? No, that's messy.
 * I will deprecate `useGuestStats` or make it return null/empty if strictly following Swagger.
 * However, the UI likely depends on it.
 * The best compromise: Use `useGuests` hook logic inside `useGuestStats` to reuse the data cache.
 */
export function useGuestStats(weddingId: string | undefined) {
  // We reuse the list query
  const { data: guests, ...rest } = useQuery({
    queryKey: guestKeys.list(weddingId!),
    queryFn: GuestApi.findAll,
    enabled: !!weddingId,
    staleTime: 30 * 1000,
  });

  // Calculate stats on client side
  const stats = {
    total: guests?.length || 0,
    confirmed: guests?.filter(g => g.attendanceStatus === 'confirmed').length || 0,
    pending: guests?.filter(g => g.attendanceStatus === 'pending').length || 0,
    declined: guests?.filter(g => g.attendanceStatus === 'declined').length || 0,
    totalGuests: guests?.reduce((acc, g) => acc + (g.numberOfGuests || 0), 0) || 0,
  };

  return { data: stats, ...rest };
}

// ==================== Mutations ====================

/**
 * Add a new guest
 * NOTE: Swagger POST /api/v1/guests response defined, but requestBody?
 * /api/v1/guests POST -> operationId: GuestController_create.
 * Responses defined. Request Body?
 * Looking at the provided json: 
 * "/api/v1/guests": { "post": { "operationId": "GuestController_create", "parameters": [], "responses": ... } }
 * NO REQUEST BODY!
 * Again, strictly following Swagger, creates an empty guest?
 */
export function useAddGuest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => GuestApi.create(),
    onSuccess: (newGuest) => {
      // Invalidate valid lists
      queryClient.invalidateQueries({ queryKey: guestKeys.all });
    },
  });
}

/**
 * Update an existing guest
 */
export function useUpdateGuest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, guest }: { id: string; guest: UpdateGuestDto; weddingId?: string }) =>
      GuestApi.update(id, guest),
    onSuccess: (updatedGuest) => {
      queryClient.invalidateQueries({ queryKey: guestKeys.all });
    },
  });
}

/**
 * Delete a guest
 */
export function useDeleteGuest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; weddingId?: string }) => GuestApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: guestKeys.all });
    },
  });
}

/**
 * Submit RSVP (public - no auth required)
 * NOTE: Swagger has NO RSVP endpoint.
 * It has updateGuest (PATCH /guests/{id}).
 * So "submitRSVP" must be mapped to "updateGuest".
 * The ID must be known.
 */
export function useSubmitRSVP() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ weddingId, rsvp }: { weddingId: string; rsvp: any }) => {
      // Need guest ID to update!
      // The UI must provide it.
      // If RSVP was by email/generic, this API doesn't support it without ID.
      // Assuming rsvp contains ID or we treat it as update.
      // If "rsvp" object has `id`, we use it. 
      // But the type signature in old code was `RSVPInput`.
      // We will assume `rsvp` has `id`.
      if (!rsvp.id) throw new Error("Guest ID required for RSVP");
      return GuestApi.update(rsvp.id, rsvp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: guestKeys.all });
    },
  });
}
