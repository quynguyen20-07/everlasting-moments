// UI Hook - Local state for UI preferences
// This replaces the Zustand uiStore with simple React state
import React, { useState, useCallback, createContext, useContext, type ReactNode } from 'react';

interface UIState {
  sidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  previewMode: 'desktop' | 'mobile';
  musicPlaying: boolean;
  language: 'vi' | 'en';
}

interface UIContextValue extends UIState {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setPreviewMode: (mode: 'desktop' | 'mobile') => void;
  toggleMusic: () => void;
  setMusicPlaying: (playing: boolean) => void;
  setLanguage: (lang: 'vi' | 'en') => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UIState>({
    sidebarOpen: true,
    isMobileMenuOpen: false,
    previewMode: 'desktop',
    musicPlaying: false,
    language: 'vi',
  });

  const toggleSidebar = useCallback(() => {
    setState((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  }, []);

  const setSidebarOpen = useCallback((open: boolean) => {
    setState((prev) => ({ ...prev, sidebarOpen: open }));
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, isMobileMenuOpen: !prev.isMobileMenuOpen }));
  }, []);

  const setMobileMenuOpen = useCallback((open: boolean) => {
    setState((prev) => ({ ...prev, isMobileMenuOpen: open }));
  }, []);

  const setPreviewMode = useCallback((mode: 'desktop' | 'mobile') => {
    setState((prev) => ({ ...prev, previewMode: mode }));
  }, []);

  const toggleMusic = useCallback(() => {
    setState((prev) => ({ ...prev, musicPlaying: !prev.musicPlaying }));
  }, []);

  const setMusicPlaying = useCallback((playing: boolean) => {
    setState((prev) => ({ ...prev, musicPlaying: playing }));
  }, []);

  const setLanguage = useCallback((lang: 'vi' | 'en') => {
    setState((prev) => ({ ...prev, language: lang }));
  }, []);

  const value: UIContextValue = {
    ...state,
    toggleSidebar,
    setSidebarOpen,
    toggleMobileMenu,
    setMobileMenuOpen,
    setPreviewMode,
    toggleMusic,
    setMusicPlaying,
    setLanguage,
  };

  return React.createElement(UIContext.Provider, { value }, children);
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
