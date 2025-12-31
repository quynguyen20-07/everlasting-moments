// Wedding Store - Zustand store for wedding management with GraphQL
import { create } from "zustand";
import {
  getWeddingsApi,
  getWeddingApi,
  createWeddingApi,
  updateWeddingApi,
  deleteWeddingApi,
  publishWeddingApi,
  unpublishWeddingApi,
  getPublicWeddingApi,
  type ListWedding,
} from "@/lib/api/wedding";
import type { Wedding } from "@/types/graphql";

interface WeddingStore {
  // State
  weddings: ListWedding[];
  currentWedding: Wedding | null;
  weddingDetail: Wedding | null;
  publicWedding: Wedding | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchWeddings: () => Promise<void>;
  fetchWedding: (id: string) => Promise<void>;
  fetchPublicWedding: (slug: string) => Promise<void>;
  createWedding: (input: { title: string; slug?: string; language?: string }) => Promise<Wedding>;
  updateWedding: (id: string, updates: { title?: string; slug?: string; status?: string }) => Promise<void>;
  updateStatus: (id: string, status: string) => Promise<void>;
  publishWedding: (id: string) => Promise<void>;
  unpublishWedding: (id: string) => Promise<void>;
  deleteWedding: (id: string) => Promise<void>;
  setCurrentWedding: (wedding: Wedding | null) => void;
  clearError: () => void;
  clearPublicWedding: () => void;
}

export const useWeddingStore = create<WeddingStore>((set) => ({
  // Initial state
  weddings: [],
  currentWedding: null,
  weddingDetail: null,
  publicWedding: null,
  isLoading: false,
  error: null,

  // ===== FETCH ALL WEDDINGS =====
  fetchWeddings: async () => {
    set({ isLoading: true, error: null });
    try {
      const weddings = await getWeddingsApi();
      set({ weddings, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể tải danh sách thiệp cưới";
      set({ error: message, isLoading: false });
    }
  },

  // ===== FETCH SINGLE WEDDING =====
  fetchWedding: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const wedding = await getWeddingApi(id);
      set({
        weddingDetail: wedding,
        currentWedding: wedding,
        isLoading: false,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể tải thiệp cưới";
      set({ error: message, isLoading: false });
    }
  },

  // ===== FETCH PUBLIC WEDDING (no auth) =====
  fetchPublicWedding: async (slug: string) => {
    set({ isLoading: true, error: null, publicWedding: null });
    try {
      const wedding = await getPublicWeddingApi(slug);
      set({ publicWedding: wedding, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không tìm thấy thiệp cưới";
      set({ error: message, isLoading: false });
    }
  },

  // ===== CREATE WEDDING =====
  createWedding: async (input) => {
    set({ isLoading: true, error: null });
    try {
      const wedding = await createWeddingApi(input);

      // Add to list
      const listItem: ListWedding = {
        id: wedding.id,
        userId: wedding.userId,
        slug: wedding.slug,
        title: wedding.title,
        status: wedding.status,
        language: wedding.language,
        viewCount: wedding.viewCount || 0,
        createdAt: wedding.createdAt,
        updatedAt: wedding.updatedAt,
        themeSettings: wedding.themeSettings,
        weddingDetail: wedding.weddingDetail,
      };

      set((state) => ({
        weddings: [...state.weddings, listItem],
        currentWedding: wedding,
        isLoading: false,
      }));

      return wedding;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể tạo thiệp cưới";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ===== UPDATE WEDDING =====
  updateWedding: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await updateWeddingApi(id, updates);

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
        weddingDetail: state.weddingDetail?.id === id ? updated : state.weddingDetail,
        currentWedding: state.currentWedding?.id === id ? updated : state.currentWedding,
        isLoading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể cập nhật thiệp cưới";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ===== UPDATE STATUS =====
  updateStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await updateWeddingApi(id, { status });

      set((state) => ({
        weddings: state.weddings.map((w) =>
          w.id === id ? { ...w, status: updated.status } : w
        ),
        currentWedding: state.currentWedding?.id === id
          ? { ...state.currentWedding, status: updated.status }
          : state.currentWedding,
        isLoading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể cập nhật trạng thái";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ===== PUBLISH =====
  publishWedding: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await publishWeddingApi(id);

      set((state) => ({
        weddings: state.weddings.map((w) =>
          w.id === id ? { ...w, status: updated.status, publishedAt: updated.publishedAt } : w
        ),
        currentWedding: state.currentWedding?.id === id
          ? { ...state.currentWedding, status: updated.status, publishedAt: updated.publishedAt }
          : state.currentWedding,
        isLoading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể xuất bản";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ===== UNPUBLISH =====
  unpublishWedding: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await unpublishWeddingApi(id);

      set((state) => ({
        weddings: state.weddings.map((w) =>
          w.id === id ? { ...w, status: updated.status, publishedAt: undefined } : w
        ),
        currentWedding: state.currentWedding?.id === id
          ? { ...state.currentWedding, status: updated.status, publishedAt: undefined }
          : state.currentWedding,
        isLoading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể hủy xuất bản";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ===== DELETE =====
  deleteWedding: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteWeddingApi(id);
      set((state) => ({
        weddings: state.weddings.filter((w) => w.id !== id),
        currentWedding: state.currentWedding?.id === id ? null : state.currentWedding,
        weddingDetail: state.weddingDetail?.id === id ? null : state.weddingDetail,
        isLoading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể xóa thiệp cưới";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ===== UTILS =====
  setCurrentWedding: (wedding) => set({ currentWedding: wedding }),
  clearError: () => set({ error: null }),
  clearPublicWedding: () => set({ publicWedding: null }),
}));