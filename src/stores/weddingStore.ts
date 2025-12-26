import { create } from 'zustand';
import type { Wedding, WeddingStatus } from '@/types';
import { weddingApi } from '@/lib/api/wedding';

interface WeddingStore {
  weddings: Wedding[];
  currentWedding: Wedding | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchWeddings: () => Promise<void>;
  fetchWedding: (id: string) => Promise<void>;
  fetchWeddingBySlug: (slug: string) => Promise<void>;
  createWedding: (data: Partial<Wedding>) => Promise<Wedding>;
  updateWedding: (id: string, data: Partial<Wedding>) => Promise<void>;
  deleteWedding: (id: string) => Promise<void>;
  updateStatus: (id: string, status: WeddingStatus) => Promise<void>;
  setCurrentWedding: (wedding: Wedding | null) => void;
  clearError: () => void;
}

export const useWeddingStore = create<WeddingStore>((set, get) => ({
  weddings: [],
  currentWedding: null,
  isLoading: false,
  error: null,

  fetchWeddings: async () => {
    set({ isLoading: true, error: null });
    try {
      const weddings = await weddingApi.getAll();
      set({ weddings, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchWedding: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const wedding = await weddingApi.getById(id);
      set({ currentWedding: wedding, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchWeddingBySlug: async (slug) => {
    set({ isLoading: true, error: null });
    try {
      const wedding = await weddingApi.getBySlug(slug);
      set({ currentWedding: wedding, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createWedding: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const wedding = await weddingApi.create(data);
      set((state) => ({
        weddings: [...state.weddings, wedding],
        currentWedding: wedding,
        isLoading: false,
      }));
      return wedding;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateWedding: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const wedding = await weddingApi.update(id, data);
      set((state) => ({
        weddings: state.weddings.map((w) => (w.id === id ? wedding : w)),
        currentWedding: state.currentWedding?.id === id ? wedding : state.currentWedding,
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteWedding: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await weddingApi.delete(id);
      set((state) => ({
        weddings: state.weddings.filter((w) => w.id !== id),
        currentWedding: state.currentWedding?.id === id ? null : state.currentWedding,
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    try {
      const wedding = await weddingApi.updateStatus(id, status);
      set((state) => ({
        weddings: state.weddings.map((w) => (w.id === id ? wedding : w)),
        currentWedding: state.currentWedding?.id === id ? wedding : state.currentWedding,
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  setCurrentWedding: (wedding) => set({ currentWedding: wedding }),
  
  clearError: () => set({ error: null }),
}));
