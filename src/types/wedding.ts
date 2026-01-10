export type WeddingStatus = "draft" | "published" | "archived";
export type AttendanceStatus = "pending" | "confirmed" | "declined";
export type UserRole = "user" | "admin";
export type WeddingLanguage = "vi" | "en";

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  role: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ILoveStory {
  id: string;
  title: string;
  content: string;
  storyDate?: string;
  imageUrl?: string;
}

export interface Person {
  id: string;
  fullName: string;
  avatar?: string;
  description?: string;
  fatherName?: string;
  motherName?: string;
}

export const WEDDING_EVENT_TYPES = ["ceremony", "reception", "party"] as const;

export type WeddingEventType = (typeof WEDDING_EVENT_TYPES)[number];

export interface IWeddingEvent {
  id: string;
  title: string;
  type: WeddingEventType;
  eventDate: string;
  startTime?: string;
  endTime?: string;
  address: string;
  locationLat?: number;
  locationLng?: number;
  mapEmbedUrl?: string;
  description?: string;
}

export interface MediaItem {
  id: string;
  type: "image" | "video";
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
  fullName: string;
  email?: string;
  phone?: string;
  relationship?: string;
  numberOfGuests: number;
  attendanceStatus: string;
  dietaryRestrictions?: string;
  message?: string;
  respondedAt?: string;
  tableNumber?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
  weddingId: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  branch?: string;
  qrCodeUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Legacy ThemeSettings - kept for mock data compatibility
export interface LegacyThemeSettings {
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

export interface WeddingResponse {
  weddings: Wedding[];
}
export interface ListWeddingResponse {
  weddings: ListWedding[];
}

export interface BrideGroom {
  fullName: string;
  avatar?: string;
  shortBio?: string;
  familyInfo?: string;
  socialLinks?: JSON;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  fontHeading: string;
  fontBody: string;
  template: string;
  backgroundMusic?: string;
}

export interface WeddingDetail {
  id: string;
  weddingId: string;
  bride: BrideGroom;
  groom: BrideGroom;
  loveStories: ILoveStory[];
  weddingEvents: IWeddingEvent[];
}

export interface Wedding {
  id: string;
  userId: string;
  slug: string;
  title: string;
  status: string;
  weddingDate: string;
  language: string;
  themeSettings: ThemeSettings;
  viewCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  weddingDetail?: WeddingDetail;
}

export interface ListWedding {
  id: string;
  userId: string;
  slug: string;
  title: string;
  status: WeddingStatus;
  language: WeddingLanguage;
  weddingDate: string;
  viewCount: number;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  weddingDetail?: WeddingDetail;
  themeSettings: ThemeSettings;
}

export interface WeddingFormData {
  name: string;
  brideName: string;
  groomName: string;
  eventDate: string;
}

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
