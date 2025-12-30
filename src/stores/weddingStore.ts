import {
  getWeddingsApi,
  getWeddingApi,
  createWeddingApi,
  updateWeddingApi,
  updateWeddingStatusApi,
  deleteWeddingApi,
} from "@/lib/api/wedding";
import type {
  Wedding,
  CreateWeddingInput,
  WeddingStatus,
  ListWedding,
} from "@/types/wedding";
import { create } from "zustand";

interface WeddingStore {
  weddings: ListWedding[];
  currentWedding: Wedding | null;
  weddingDetail: Wedding | null;
  isLoading: boolean;
  error: string | null;

  fetchWeddings: (userId: string) => Promise<void>;
  fetchWedding: (id: string) => Promise<void>;
  createWedding: (input: CreateWeddingInput) => Promise<Wedding>;
  updateWedding: (id: string, updates: Partial<Wedding>) => Promise<void>;
  updateStatus: (id: string, status: WeddingStatus) => Promise<void>;
  deleteWedding: (id: string) => Promise<void>;
  setCurrentWedding: (wedding: Wedding | null) => void;
  clearError: () => void;
}

export const useWeddingStore = create<WeddingStore>((set, get) => ({
  weddings: [],
  currentWedding: null,
  weddingDetail: null,
  isLoading: false,
  error: null,

  // ===== LIST =====
  fetchWeddings: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const weddings = await getWeddingsApi(userId); // ListWedding[]
      set({ weddings, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  // ===== DETAIL =====
  fetchWedding: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const wedding = await getWeddingApi(id); // Wedding
      set({
        weddingDetail: wedding,
        currentWedding: wedding,
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  // ===== CREATE =====
  createWedding: async (input: CreateWeddingInput) => {
    set({ isLoading: true, error: null });
    try {
      const wedding = await createWeddingApi(input); // Wedding

      // convert Wedding → ListWedding
      const listItem: ListWedding = {
        id: wedding.id,
        userId: wedding.userId,
        slug: wedding.slug,
        title: wedding.title,
        status: wedding.status,
        language: wedding.language,
        weddingDate: wedding.weddingDate,
        viewCount: wedding.viewCount,
        createdAt: wedding.createdAt,
        updatedAt: wedding.updatedAt,
        themeSettings: undefined,
      };

      set((state) => ({
        weddings: [...state.weddings, listItem],
        currentWedding: wedding,
        isLoading: false,
      }));

      return wedding;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  // ===== UPDATE DETAIL =====
  updateWedding: async (id: string, updates: Partial<Wedding>) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await updateWeddingApi(id, updates); // Wedding

      set((state) => ({
        weddings: state.weddings.map((w) =>
          w.id === id
            ? {
                ...w,
                title: updated.title,
                slug: updated.slug,
                status: updated.status,
                updatedAt: updated.updatedAt,
              }
            : w
        ),
        weddingDetail: updated,
        currentWedding:
          state.currentWedding?.id === id ? updated : state.currentWedding,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  // ===== UPDATE STATUS =====
  updateStatus: async (id: string, status: WeddingStatus) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await updateWeddingStatusApi(id, status);

      set((state) => ({
        weddings: state.weddings.map((w) =>
          w.id === id ? { ...w, status } : w
        ),
        currentWedding:
          state.currentWedding?.id === id ? updated : state.currentWedding,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  // ===== DELETE =====
  deleteWedding: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteWeddingApi(id);
      set((state) => ({
        weddings: state.weddings.filter((w) => w.id !== id),
        currentWedding:
          state.currentWedding?.id === id ? null : state.currentWedding,
        weddingDetail:
          state.weddingDetail?.id === id ? null : state.weddingDetail,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  setCurrentWedding: (wedding) => set({ currentWedding: wedding }),
  clearError: () => set({ error: null }),
}));
