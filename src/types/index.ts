// =====================
// USER & AUTH TYPES
// =====================

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// =====================
// WEDDING TYPES
// =====================

export type WeddingStatus = 'draft' | 'published' | 'archived';

export interface Wedding {
  id: string;
  userId: string;
  slug: string;
  title: string;
  status: WeddingStatus;
  weddingDate: string;
  venue: string;
  bride: BrideGroom;
  groom: BrideGroom;
  loveStory?: LoveStory;
  events: WeddingEvent[];
  gallery: GalleryImage[];
  videos: Video[];
  bankAccounts: BankAccount[];
  theme: WeddingTheme;
  settings: WeddingSettings;
  createdAt: string;
  updatedAt: string;
}

export interface BrideGroom {
  id: string;
  name: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  fatherName?: string;
  motherName?: string;
  phone?: string;
  email?: string;
}

export interface LoveStory {
  id: string;
  content: string; // HTML content from rich text editor
  milestones: LoveMilestone[];
}

export interface LoveMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
}

export interface WeddingEvent {
  id: string;
  type: 'ceremony' | 'reception' | 'party' | 'other';
  title: string;
  date: string;
  time: string;
  endTime?: string;
  venue: string;
  address: string;
  mapUrl?: string;
  description?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  thumbnail?: string;
  caption?: string;
  order: number;
  albumId?: string;
}

export interface Album {
  id: string;
  name: string;
  cover?: string;
  images: GalleryImage[];
}

export interface Video {
  id: string;
  url: string;
  type: 'youtube' | 'vimeo' | 'upload';
  thumbnail?: string;
  title?: string;
}

export interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  branch?: string;
  qrCode?: string;
}

export interface WeddingTheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  backgroundImage?: string;
  backgroundMusic?: string;
}

export interface WeddingSettings {
  showCountdown: boolean;
  showRsvp: boolean;
  showGuestWishes: boolean;
  showGallery: boolean;
  showLoveStory: boolean;
  showBankQr: boolean;
  autoplayMusic: boolean;
  language: 'vi' | 'en';
}

// =====================
// GUEST & RSVP TYPES
// =====================

export type RsvpStatus = 'pending' | 'confirmed' | 'declined';

export interface Guest {
  id: string;
  weddingId: string;
  name: string;
  email?: string;
  phone?: string;
  numberOfGuests: number;
  rsvpStatus: RsvpStatus;
  tableId?: string;
  seatNumber?: number;
  dietaryNotes?: string;
  wishes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RsvpSubmission {
  name: string;
  email?: string;
  phone?: string;
  numberOfGuests: number;
  attending: boolean;
  dietaryNotes?: string;
  wishes?: string;
}

// =====================
// TABLE & SEATING TYPES
// =====================

export interface Table {
  id: string;
  weddingId: string;
  name: string;
  capacity: number;
  shape: 'round' | 'rectangle' | 'square';
  position: { x: number; y: number };
  guests: string[]; // Guest IDs
}

export interface TableAssignment {
  guestId: string;
  tableId: string;
  seatNumber: number;
}

// =====================
// UI & STATE TYPES
// =====================

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
}

export interface UIState {
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  isLoading: boolean;
  activeModal: string | null;
}

// =====================
// API RESPONSE TYPES
// =====================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
