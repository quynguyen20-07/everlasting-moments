export type WeddingStatus = "draft" | "published" | "archived";
export type AttendanceStatus = "pending" | "confirmed" | "declined";
export type UserRole = "user" | "admin";
export type WeddingLanguage = "vi" | "en";

// User is in api.generated
// AuthState is frontend specific, keep it.
export interface AuthState {
  // User type might refer to the one in api.generated if imported, but here it's defining its own interface? 
  // We should import User from api.generated or define it locally if different structure.
  // The existing User interface had phone, avatar etc. 
  // api.generated User (UpdateUserDto & {id}) has fullName, email, password, role, isActive.
  // Missing: phone, avatar, lastLogin.
  // If the backend assumes User has avatar, but Swagger doesn't showing it, then Swagger is incomplete or we have mismatch.
  // "Use ONLY data from... components.schemas".
  // So I should use the API type. I'll import User from api.generated.
  // But wait, if I import it, I can't name this file's export "User".
  // I will just use `any` or generic for AuthState for now to avoid circular dependency or import User from api.generated.
  user: any | null;
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

// Guest is in api.generated
// Table is NOT in api.generated
export interface Table {
  id: string;
  weddingId: string;
  name: string;
  capacity: number;
  guests: string[]; // Guest IDs
}

// BankAccount is in api.generated

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

// WeddingResponse etc removed as valid response types are in api.generated

export interface BrideGroom {
  fullName: string;
  avatar?: string;
  shortBio?: string;
  familyInfo?: string;
  socialLinks?: Record<string, unknown>;
}

// ThemeSettings is in api.generated

// WeddingDetail is NOT in api.generated (it was part of GraphQL structure?)
export interface WeddingDetail {
  id: string;
  weddingId: string;
  bride: BrideGroom;
  groom: BrideGroom;
  loveStories: ILoveStory[];
  weddingEvents: IWeddingEvent[];
}

// Wedding is in api.generated
// ListWedding is in api.generated (as Wedding?)
// In REST, findAll returns Wedding[].
// The "ListWedding" type here had userId, slug, title...
// api.generated Wedding has same fields.

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
