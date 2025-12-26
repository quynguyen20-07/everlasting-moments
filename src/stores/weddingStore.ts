// Wedding Store - Zustand store for wedding management
import { create } from 'zustand';
import type { Wedding, CreateWeddingInput, WeddingStatus } from '@/types/wedding';
import {
  getWeddingsApi,
  getWeddingApi,
  createWeddingApi,
  updateWeddingApi,
  updateWeddingStatusApi,
  deleteWeddingApi,
} from '@/lib/api/wedding';

interface WeddingStore {
  weddings: Wedding[];
  currentWedding: Wedding | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchWeddings: (userId: string) => Promise<void>;
  fetchWedding: (id: string) => Promise<void>;
  createWedding: (userId: string, input: CreateWeddingInput) => Promise<Wedding>;
  updateWedding: (id: string, updates: Partial<Wedding>) => Promise<void>;
  updateStatus: (id: string, status: WeddingStatus) => Promise<void>;
  deleteWedding: (id: string) => Promise<void>;
  setCurrentWedding: (wedding: Wedding | null) => void;
  clearError: () => void;
}

export const useWeddingStore = create<WeddingStore>((set, get) => ({
  weddings: [],
  currentWedding: null,
  isLoading: false,
  error: null,

  fetchWeddings: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const weddings = await getWeddingsApi(userId);
      set({ weddings, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchWedding: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const wedding = await getWeddingApi(id);
      set({ currentWedding: wedding, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createWedding: async (userId: string, input: CreateWeddingInput) => {
    set({ isLoading: true, error: null });
    try {
      const wedding = await createWeddingApi(userId, input);
      set((state) => ({
        weddings: [...state.weddings, wedding],
        currentWedding: wedding,
        isLoading: false,
      }));
      return wedding;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  updateWedding: async (id: string, updates: Partial<Wedding>) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await updateWeddingApi(id, updates);
      set((state) => ({
        weddings: state.weddings.map((w) => (w.id === id ? updated : w)),
        currentWedding: state.currentWedding?.id === id ? updated : state.currentWedding,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  updateStatus: async (id: string, status: WeddingStatus) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await updateWeddingStatusApi(id, status);
      set((state) => ({
        weddings: state.weddings.map((w) => (w.id === id ? updated : w)),
        currentWedding: state.currentWedding?.id === id ? updated : state.currentWedding,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  deleteWedding: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteWeddingApi(id);
      set((state) => ({
        weddings: state.weddings.filter((w) => w.id !== id),
        currentWedding: state.currentWedding?.id === id ? null : state.currentWedding,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  setCurrentWedding: (wedding: Wedding | null) => set({ currentWedding: wedding }),
  clearError: () => set({ error: null }),
}));
