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
  updateBrideApi,
  updateGroomApi,
  addLoveStoryApi,
  updateLoveStoryApi,
  deleteLoveStoryApi,
  type ListWedding,
  type CreateWeddingInput,
} from "@/lib/api/wedding";
import type { Wedding, BrideGroomInput, WeddingDetail, LoveStoryInput } from "@/types/graphql";

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
  createWedding: (input: CreateWeddingInput) => Promise<Wedding>;
  updateWedding: (id: string, updates: { title?: string; slug?: string; status?: string }) => Promise<void>;
  updateBride: (weddingId: string, bride: BrideGroomInput) => Promise<WeddingDetail>;
  updateGroom: (weddingId: string, groom: BrideGroomInput) => Promise<WeddingDetail>;
  addLoveStory: (weddingId: string, story: LoveStoryInput) => Promise<WeddingDetail>;
  updateLoveStory: (weddingId: string, storyId: string, story: LoveStoryInput) => Promise<WeddingDetail>;
  deleteLoveStory: (weddingId: string, storyId: string) => Promise<WeddingDetail>;
  updateStatus: (id: string, status: string) => Promise<void>;
  publishWedding: (id: string) => Promise<void>;
  unpublishWedding: (id: string) => Promise<void>;
  deleteWedding: (id: string) => Promise<void>;
  setCurrentWedding: (wedding: Wedding | null) => void;
  clearError: () => void;
  clearPublicWedding: () => void;
}

// Helper to update currentWedding with new weddingDetail
const updateCurrentWeddingDetail = (
  state: Pick<WeddingStore, 'currentWedding'>,
  weddingId: string,
  updatedDetail: WeddingDetail
) => {
  if (state.currentWedding?.id === weddingId) {
    return {
      currentWedding: {
        ...state.currentWedding,
        weddingDetail: updatedDetail,
      },
    };
  }
  return {};
};

export const useWeddingStore = create<WeddingStore>((set, get) => ({
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

  // ===== UPDATE BRIDE =====
  updateBride: async (weddingId, bride) => {
    set({ isLoading: true, error: null });
    try {
      const updatedDetail = await updateBrideApi(weddingId, bride);
      set((state) => ({
        ...updateCurrentWeddingDetail(state, weddingId, updatedDetail),
        isLoading: false,
      }));
      return updatedDetail;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể cập nhật thông tin cô dâu";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ===== UPDATE GROOM =====
  updateGroom: async (weddingId, groom) => {
    set({ isLoading: true, error: null });
    try {
      const updatedDetail = await updateGroomApi(weddingId, groom);
      set((state) => ({
        ...updateCurrentWeddingDetail(state, weddingId, updatedDetail),
        isLoading: false,
      }));
      return updatedDetail;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể cập nhật thông tin chú rể";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ===== ADD LOVE STORY =====
  addLoveStory: async (weddingId, story) => {
    set({ isLoading: true, error: null });
    try {
      const updatedDetail = await addLoveStoryApi(weddingId, story);
      set((state) => ({
        ...updateCurrentWeddingDetail(state, weddingId, updatedDetail),
        isLoading: false,
      }));
      return updatedDetail;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể thêm câu chuyện tình yêu";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ===== UPDATE LOVE STORY =====
  updateLoveStory: async (weddingId, storyId, story) => {
    set({ isLoading: true, error: null });
    try {
      const updatedDetail = await updateLoveStoryApi(weddingId, storyId, story);
      set((state) => ({
        ...updateCurrentWeddingDetail(state, weddingId, updatedDetail),
        isLoading: false,
      }));
      return updatedDetail;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể cập nhật câu chuyện";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ===== DELETE LOVE STORY =====
  deleteLoveStory: async (weddingId, storyId) => {
    set({ isLoading: true, error: null });
    try {
      const updatedDetail = await deleteLoveStoryApi(weddingId, storyId);
      set((state) => ({
        ...updateCurrentWeddingDetail(state, weddingId, updatedDetail),
        isLoading: false,
      }));
      return updatedDetail;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể xóa câu chuyện";
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
