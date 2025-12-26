// UI Store - Zustand store for UI state
import { create } from 'zustand';

interface UIStore {
  sidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  previewMode: 'desktop' | 'mobile';
  musicPlaying: boolean;
  language: 'vi' | 'en';
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setPreviewMode: (mode: 'desktop' | 'mobile') => void;
  toggleMusic: () => void;
  setMusicPlaying: (playing: boolean) => void;
  setLanguage: (lang: 'vi' | 'en') => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  isMobileMenuOpen: false,
  previewMode: 'desktop',
  musicPlaying: false,
  language: 'vi',

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenuOpen: (open: boolean) => set({ isMobileMenuOpen: open }),
  setPreviewMode: (mode: 'desktop' | 'mobile') => set({ previewMode: mode }),
  toggleMusic: () => set((state) => ({ musicPlaying: !state.musicPlaying })),
  setMusicPlaying: (playing: boolean) => set({ musicPlaying: playing }),
  setLanguage: (lang: 'vi' | 'en') => set({ language: lang }),
}));
