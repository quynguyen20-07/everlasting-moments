// Wedding types - Core data structures for wedding management

export type WeddingStatus = 'draft' | 'published' | 'archived';
export type AttendanceStatus = 'pending' | 'confirmed' | 'declined';
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Person {
  id: string;
  fullName: string;
  avatar?: string;
  description?: string;
  fatherName?: string;
  motherName?: string;
}

export interface LoveStoryEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
}

export interface WeddingEvent {
  id: string;
  type: 'ceremony' | 'reception' | 'other';
  name: string;
  date: string;
  time: string;
  address: string;
  mapUrl?: string;
  description?: string;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption?: string;
  order: number;
}

export interface Album {
  id: string;
  name: string;
  coverImage?: string;
  items: MediaItem[];
  order: number;
}

export interface Guest {
  id: string;
  weddingId: string;
  name: string;
  phone: string;
  email?: string;
  numberOfGuests: number;
  attendance: AttendanceStatus;
  tableId?: string;
  message?: string;
  createdAt: string;
}

export interface Table {
  id: string;
  weddingId: string;
  name: string;
  capacity: number;
  guests: string[]; // Guest IDs
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  branch?: string;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  template: string;
}

export interface WeddingSettings {
  showGallery: boolean;
  showLoveStory: boolean;
  showRsvp: boolean;
  showWishes: boolean;
  showBankInfo: boolean;
  showMusic: boolean;
  showSeating: boolean;
  musicUrl?: string;
}

export interface Wedding {
  id: string;
  userId: string;
  slug: string;
  name: string;
  status: WeddingStatus;
  bride: Person;
  groom: Person;
  loveStory: LoveStoryEvent[];
  events: WeddingEvent[];
  albums: Album[];
  guests: Guest[];
  tables: Table[];
  bankAccounts: BankAccount[];
  theme: ThemeSettings;
  settings: WeddingSettings;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface WeddingFormData {
  name: string;
  brideName: string;
  groomName: string;
  eventDate: string;
}

export interface CreateWeddingInput {
  name: string;
  bride: Partial<Person>;
  groom: Partial<Person>;
  eventDate?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
