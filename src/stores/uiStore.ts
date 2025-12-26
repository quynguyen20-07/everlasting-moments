import { create } from 'zustand';

interface UIStore {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  isMobileMenuOpen: boolean;
  isLoading: boolean;
  activeModal: string | null;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: true,
  isSidebarCollapsed: false,
  isMobileMenuOpen: false,
  isLoading: false,
  activeModal: null,

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  toggleSidebarCollapsed: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setLoading: (loading) => set({ isLoading: loading }),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
}));
