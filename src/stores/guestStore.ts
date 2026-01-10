// Guest Store - Zustand store for guest management
import { create } from 'zustand';
import type { Guest, GuestStats, GuestInput, RSVPInput } from '@/types/graphql';
import {
  getGuestsApi,
  getGuestStatsApi,
  addGuestApi,
  updateGuestApi,
  deleteGuestApi,
  submitRSVPApi,
} from '@/lib/api/guest';

interface GuestState {
  guests: Guest[];
  stats: GuestStats | null;
  isLoading: boolean;
  error: string | null;
}

interface GuestStore extends GuestState {
  fetchGuests: (weddingId: string) => Promise<void>;
  fetchStats: (weddingId: string) => Promise<void>;
  addGuest: (weddingId: string, guest: GuestInput) => Promise<Guest>;
  updateGuest: (id: string, guest: GuestInput) => Promise<Guest>;
  deleteGuest: (id: string) => Promise<void>;
  submitRSVP: (weddingId: string, rsvp: RSVPInput) => Promise<Guest>;
  clearError: () => void;
  reset: () => void;
}

const initialState: GuestState = {
  guests: [],
  stats: null,
  isLoading: false,
  error: null,
};

export const useGuestStore = create<GuestStore>((set, get) => ({
  ...initialState,

  fetchGuests: async (weddingId: string) => {
    set({ isLoading: true, error: null });
    try {
      const guests = await getGuestsApi(weddingId);
      set({ guests, isLoading: false });
    } catch (error) {
      set({ error: 'Không thể tải danh sách khách mời', isLoading: false });
      throw error;
    }
  },

  fetchStats: async (weddingId: string) => {
    try {
      const stats = await getGuestStatsApi(weddingId);
      set({ stats });
    } catch (error) {
      console.error('Failed to fetch guest stats:', error);
    }
  },

  addGuest: async (weddingId: string, guest: GuestInput) => {
    set({ isLoading: true, error: null });
    try {
      const newGuest = await addGuestApi(weddingId, guest);
      set((state) => ({
        guests: [...state.guests, newGuest],
        isLoading: false,
      }));
      return newGuest;
    } catch (error) {
      set({ error: 'Không thể thêm khách mời', isLoading: false });
      throw error;
    }
  },

  updateGuest: async (id: string, guest: GuestInput) => {
    set({ isLoading: true, error: null });
    try {
      const updatedGuest = await updateGuestApi(id, guest);
      set((state) => ({
        guests: state.guests.map((g) => (g.id === id ? updatedGuest : g)),
        isLoading: false,
      }));
      return updatedGuest;
    } catch (error) {
      set({ error: 'Không thể cập nhật khách mời', isLoading: false });
      throw error;
    }
  },

  deleteGuest: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteGuestApi(id);
      set((state) => ({
        guests: state.guests.map((g) =>
          g.id === id ? { ...g, isActive: false } : g
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Không thể xóa khách mời', isLoading: false });
      throw error;
    }
  },

  submitRSVP: async (weddingId: string, rsvp: RSVPInput) => {
    set({ isLoading: true, error: null });
    try {
      const guest = await submitRSVPApi(weddingId, rsvp);
      set({ isLoading: false });
      return guest;
    } catch (error) {
      set({ error: 'Không thể gửi xác nhận', isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  reset: () => set(initialState),
}));
