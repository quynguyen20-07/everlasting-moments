// Guest API Service - GraphQL guest operations
import { graphqlRequest, graphqlPublicRequest } from '@/lib/graphql/client';
import { GUESTS_QUERY, GUEST_STATS_QUERY } from '@/lib/graphql/queries';
import {
  ADD_GUEST_MUTATION,
  UPDATE_GUEST_MUTATION,
  DELETE_GUEST_MUTATION,
  SUBMIT_RSVP_MUTATION,
} from '@/lib/graphql/mutations';
import type {
  Guest,
  GuestStats,
  GuestInput,
  RSVPInput,
  GuestsResponse,
  GuestStatsResponse,
  AddGuestResponse,
  UpdateGuestResponse,
  DeleteGuestResponse,
  SubmitRSVPResponse,
} from '@/types/graphql';

// ==================== Queries ====================

/**
 * Get all guests for a wedding
 */
export async function getGuestsApi(weddingId: string): Promise<Guest[]> {
  const data = await graphqlRequest<GuestsResponse>(GUESTS_QUERY, { weddingId });
  return data.guests;
}

/**
 * Get guest statistics for a wedding
 */
export async function getGuestStatsApi(weddingId: string): Promise<GuestStats> {
  const data = await graphqlRequest<GuestStatsResponse>(GUEST_STATS_QUERY, { weddingId });
  return data.guestStats;
}

// ==================== Mutations ====================

/**
 * Add new guest
 */
export async function addGuestApi(weddingId: string, guest: GuestInput): Promise<Guest> {
  const data = await graphqlRequest<AddGuestResponse>(ADD_GUEST_MUTATION, {
    weddingId,
    guest,
  });
  return data.addGuest;
}

/**
 * Update existing guest
 */
export async function updateGuestApi(id: string, guest: GuestInput): Promise<Guest> {
  const data = await graphqlRequest<UpdateGuestResponse>(UPDATE_GUEST_MUTATION, {
    id,
    guest,
  });
  return data.updateGuest;
}

/**
 * Delete guest
 */
export async function deleteGuestApi(id: string): Promise<Guest> {
  const data = await graphqlRequest<DeleteGuestResponse>(DELETE_GUEST_MUTATION, { id });
  return data.deleteGuest;
}

/**
 * Submit RSVP (public - no auth required)
 */
export async function submitRSVPApi(weddingId: string, rsvp: RSVPInput): Promise<Guest> {
  const data = await graphqlPublicRequest<SubmitRSVPResponse>(SUBMIT_RSVP_MUTATION, {
    weddingId,
    rsvp,
  });
  return data.submitRSVP;
}

/**
 * Export guests to CSV format
 */
export function exportGuestsToCsv(guests: Guest[]): string {
  const headers = [
    'Họ tên',
    'Email',
    'Số điện thoại',
    'Quan hệ',
    'Số khách',
    'Trạng thái',
    'Yêu cầu ăn uống',
    'Lời nhắn',
    'Số bàn',
    'Ngày phản hồi',
  ];

  const rows = guests.map((guest) => [
    guest.fullName,
    guest.email || '',
    guest.phone || '',
    guest.relationship || '',
    guest.numberOfGuests.toString(),
    guest.attendanceStatus,
    guest.dietaryRestrictions || '',
    guest.message || '',
    guest.tableNumber || '',
    guest.respondedAt || '',
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n');

  return csvContent;
}

/**
 * Download guests as CSV file
 */
export function downloadGuestsCsv(guests: Guest[], filename: string = 'danh-sach-khach-moi.csv'): void {
  const csv = exportGuestsToCsv(guests);
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
