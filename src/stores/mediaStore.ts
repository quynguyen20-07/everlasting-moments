// Media Store - Zustand store for wedding media management
import { create } from 'zustand';
import type { MediaItemWithMeta, MediaInput, GalleryLayout, GallerySettings } from '@/types/media';

// Use MediaItemWithMeta as the main type for store
type MediaItem = MediaItemWithMeta;

interface MediaState {
  media: MediaItem[];
  gallerySettings: GallerySettings;
  isLoading: boolean;
  error: string | null;
}

interface MediaStore extends MediaState {
  fetchMedia: (weddingId: string) => Promise<void>;
  addMedia: (weddingId: string, input: MediaInput) => Promise<MediaItem>;
  updateMedia: (id: string, input: Partial<MediaInput>) => Promise<MediaItem>;
  deleteMedia: (id: string) => Promise<void>;
  reorderMedia: (mediaIds: string[]) => void;
  setLayout: (layout: GalleryLayout) => void;
  setGallerySettings: (settings: Partial<GallerySettings>) => void;
  clearError: () => void;
  reset: () => void;
}

// Mock data for demo
const mockMedia: MediaItem[] = [
  {
    id: "media-1",
    weddingId: "wedding-1",
    type: "image",
    url: "/images/wedding06.webp",
    caption: "Ảnh cưới ngoài trời",
    order: 0,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "media-2",
    weddingId: "wedding-1",
    type: "image",
    url: "/images/wedding01.jpg",
    caption: "Khoảnh khắc hạnh phúc",
    order: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "media-3",
    weddingId: "wedding-1",
    type: "image",
    url: "/images/wedding02.jpg",
    caption: "Ngày trọng đại",
    order: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "media-4",
    weddingId: "wedding-1",
    type: "image",
    url: "/images/wedding004.webp",
    caption: "Tình yêu vĩnh cửu",
    order: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "media-5",
    weddingId: "wedding-1",
    type: "image",
    url: "/images/wedding04.jpg",
    caption: "Bên nhau trọn đời",
    order: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "media-6",
    weddingId: "wedding-1",
    type: "image",
    url: "/images/wedding05.jpg",
    caption: "Hạnh phúc viên mãn",
    order: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialState: MediaState = {
  media: [],
  gallerySettings: {
    layout: "featured",
    showCaptions: true,
    enableLightbox: true,
  },
  isLoading: false,
  error: null,
};

export const useMediaStore = create<MediaStore>((set, get) => ({
  ...initialState,

  fetchMedia: async (weddingId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call - replace with actual GraphQL query
      await new Promise((resolve) => setTimeout(resolve, 500));
      const media = mockMedia.filter((m) => m.weddingId === weddingId || weddingId === "wedding-1");
      set({ media: media.sort((a, b) => a.order - b.order), isLoading: false });
    } catch (error) {
      set({ error: "Không thể tải thư viện ảnh", isLoading: false });
      throw error;
    }
  },

  addMedia: async (weddingId: string, input: MediaInput) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call - replace with actual GraphQL mutation
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const currentMedia = get().media;
      const newMedia: MediaItem = {
        id: `media-${Date.now()}`,
        weddingId,
        type: input.type,
        url: input.url,
        thumbnail: input.thumbnail,
        caption: input.caption || "",
        order: input.order ?? currentMedia.length,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      set((state) => ({
        media: [...state.media, newMedia].sort((a, b) => a.order - b.order),
        isLoading: false,
      }));

      return newMedia;
    } catch (error) {
      set({ error: "Không thể thêm ảnh", isLoading: false });
      throw error;
    }
  },

  updateMedia: async (id: string, input: Partial<MediaInput>) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      let updatedMedia: MediaItem | undefined;

      set((state) => ({
        media: state.media.map((m) => {
          if (m.id === id) {
            updatedMedia = {
              ...m,
              ...input,
              updatedAt: new Date().toISOString(),
            };
            return updatedMedia;
          }
          return m;
        }),
        isLoading: false,
      }));

      if (!updatedMedia) throw new Error("Media not found");
      return updatedMedia;
    } catch (error) {
      set({ error: "Không thể cập nhật ảnh", isLoading: false });
      throw error;
    }
  },

  deleteMedia: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      set((state) => ({
        media: state.media.filter((m) => m.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Không thể xóa ảnh", isLoading: false });
      throw error;
    }
  },

  reorderMedia: (mediaIds: string[]) => {
    set((state) => ({
      media: mediaIds
        .map((id, index) => {
          const item = state.media.find((m) => m.id === id);
          if (item) {
            return { ...item, order: index };
          }
          return null;
        })
        .filter(Boolean) as MediaItem[],
    }));
  },

  setLayout: (layout: GalleryLayout) => {
    set((state) => ({
      gallerySettings: { ...state.gallerySettings, layout },
    }));
  },

  setGallerySettings: (settings: Partial<GallerySettings>) => {
    set((state) => ({
      gallerySettings: { ...state.gallerySettings, ...settings },
    }));
  },

  clearError: () => set({ error: null }),
  reset: () => set(initialState),
}));
