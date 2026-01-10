// Wish Store - Zustand store for wish management
import { create } from 'zustand';
import type { Wish, WishInput } from '@/types/graphql';
import { addWishApi, approveWishApi, deleteWishApi } from '@/lib/api/wish';
import { graphqlRequest, graphqlPublicRequest } from '@/lib/graphql/client';

// Query to fetch wishes
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

interface WishState {
  wishes: Wish[];
  publicWishes: Wish[];
  isLoading: boolean;
  error: string | null;
}

interface WishStore extends WishState {
  fetchWishes: (weddingId: string) => Promise<void>;
  fetchPublicWishes: (weddingId: string) => Promise<void>;
  addWish: (weddingId: string, wish: WishInput) => Promise<Wish>;
  approveWish: (id: string) => Promise<void>;
  deleteWish: (id: string) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

const initialState: WishState = {
  wishes: [],
  publicWishes: [],
  isLoading: false,
  error: null,
};

export const useWishStore = create<WishStore>((set) => ({
  ...initialState,

  fetchWishes: async (weddingId: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await graphqlRequest<{ wishes: Wish[] }>(WISHES_QUERY, { weddingId });
      set({ wishes: data.wishes, isLoading: false });
    } catch (error) {
      set({ error: 'Không thể tải danh sách lời chúc', isLoading: false });
      throw error;
    }
  },

  fetchPublicWishes: async (weddingId: string) => {
    try {
      const data = await graphqlPublicRequest<{ publicWishes: Wish[] }>(PUBLIC_WISHES_QUERY, { weddingId });
      set({ publicWishes: data.publicWishes || [] });
    } catch (error) {
      console.error('Failed to fetch public wishes:', error);
      set({ publicWishes: [] });
    }
  },

  addWish: async (weddingId: string, wish: WishInput) => {
    set({ isLoading: true, error: null });
    try {
      const newWish = await addWishApi(weddingId, wish);
      set((state) => ({
        publicWishes: [...state.publicWishes, newWish],
        isLoading: false,
      }));
      return newWish;
    } catch (error) {
      set({ error: 'Không thể gửi lời chúc', isLoading: false });
      throw error;
    }
  },

  approveWish: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await approveWishApi(id);
      set((state) => ({
        wishes: state.wishes.map((w) =>
          w.id === id ? { ...w, isApproved: true } : w
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Không thể duyệt lời chúc', isLoading: false });
      throw error;
    }
  },

  deleteWish: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteWishApi(id);
      set((state) => ({
        wishes: state.wishes.filter((w) => w.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Không thể xóa lời chúc', isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  reset: () => set(initialState),
}));
