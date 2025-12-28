// GraphQL Types - Matching backend schema EXACTLY
// DO NOT modify these types - they match the GraphQL schema

export type JSON = Record<string, unknown>;

// ==================== User & Auth ====================

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

export interface AuthPayload {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// ==================== Theme Settings ====================

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  fontHeading: string;
  fontBody: string;
  backgroundMusic?: string;
}

// ==================== Bride & Groom ====================

export interface BrideGroom {
  fullName: string;
  avatar?: string;
  shortBio?: string;
  familyInfo?: string;
  socialLinks?: JSON;
}

export interface BrideGroomInput {
  fullName: string;
  avatar?: string;
  shortBio?: string;
  familyInfo?: string;
  socialLinks?: JSON;
}

// ==================== Love Story ====================

export interface LoveStory {
  id: string;
  title: string;
  content: string;
  storyDate?: string;
  imageUrl?: string;
}

export interface LoveStoryInput {
  title: string;
  content: string;
  storyDate?: string;
  imageUrl?: string;
}

// ==================== Wedding Event ====================

export interface WeddingEvent {
  id: string;
  title: string;
  type: string;
  eventDate: string;
  startTime?: string;
  endTime?: string;
  address: string;
  locationLat?: number;
  locationLng?: number;
  mapEmbedUrl?: string;
  description?: string;
}

export interface WeddingEventInput {
  title: string;
  type: string;
  eventDate: string;
  startTime?: string;
  endTime?: string;
  address: string;
  locationLat?: number;
  locationLng?: number;
  mapEmbedUrl?: string;
  description?: string;
}

// ==================== Wedding Detail ====================

export interface WeddingDetail {
  id: string;
  weddingId: string;
  bride: BrideGroom;
  groom: BrideGroom;
  loveStories: LoveStory[];
  weddingEvents: WeddingEvent[];
}

// ==================== Wedding ====================

export interface Wedding {
  id: string;
  userId: string;
  slug: string;
  title: string;
  status: string;
  language: string;
  themeSettings: ThemeSettings;
  viewCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  weddingDetail?: WeddingDetail;
}

// ==================== Guest ====================

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

export interface GuestInput {
  fullName: string;
  email?: string;
  phone?: string;
  relationship?: string;
  numberOfGuests?: number;
  attendanceStatus?: string;
  dietaryRestrictions?: string;
  message?: string;
  tableNumber?: string;
}

export interface RSVPInput {
  fullName: string;
  email?: string;
  phone?: string;
  numberOfGuests: number;
  attendanceStatus: string;
  dietaryRestrictions?: string;
  message?: string;
}

export interface GuestStats {
  total: number;
  confirmed: number;
  pending: number;
  declined: number;
  totalGuests: number;
}

// ==================== Bank Account ====================

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

export interface BankAccountInput {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  branch?: string;
}

// ==================== Wish ====================

export interface Wish {
  id: string;
  weddingId: string;
  guestName: string;
  message: string;
  isApproved: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WishInput {
  guestName: string;
  message: string;
}

// ==================== API Response Types ====================

export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: Record<string, unknown>;
}

// ==================== Query Response Types ====================

export interface MeResponse {
  me: User | null;
}

export interface WeddingsResponse {
  weddings: Wedding[];
}

export interface WeddingResponse {
  wedding: Wedding | null;
}

export interface WeddingBySlugResponse {
  weddingBySlug: Wedding | null;
}

export interface SearchWeddingsResponse {
  searchWeddings: Wedding[];
}

export interface WeddingDetailResponse {
  weddingDetail: WeddingDetail | null;
}

export interface GuestsResponse {
  guests: Guest[];
}

export interface GuestStatsResponse {
  guestStats: GuestStats;
}

export interface PublicWeddingResponse {
  publicWedding: Wedding | null;
}

// ==================== Mutation Response Types ====================

export interface RegisterResponse {
  register: AuthPayload;
}

export interface LoginResponse {
  login: AuthPayload;
}

export interface LogoutResponse {
  logout: boolean;
}

export interface RefreshTokenResponse {
  refreshToken: AuthPayload;
}

export interface CreateWeddingResponse {
  createWedding: Wedding;
}

export interface UpdateWeddingResponse {
  updateWedding: Wedding;
}

export interface DeleteWeddingResponse {
  deleteWedding: Wedding;
}

export interface PublishWeddingResponse {
  publishWedding: Wedding;
}

export interface UnpublishWeddingResponse {
  unpublishWedding: Wedding;
}

export interface UpdateBrideResponse {
  updateBride: WeddingDetail;
}

export interface UpdateGroomResponse {
  updateGroom: WeddingDetail;
}

export interface AddLoveStoryResponse {
  addLoveStory: WeddingDetail;
}

export interface UpdateLoveStoryResponse {
  updateLoveStory: WeddingDetail;
}

export interface DeleteLoveStoryResponse {
  deleteLoveStory: WeddingDetail;
}

export interface AddWeddingEventResponse {
  addWeddingEvent: WeddingDetail;
}

export interface UpdateWeddingEventResponse {
  updateWeddingEvent: WeddingDetail;
}

export interface DeleteWeddingEventResponse {
  deleteWeddingEvent: WeddingDetail;
}

export interface AddGuestResponse {
  addGuest: Guest;
}

export interface UpdateGuestResponse {
  updateGuest: Guest;
}

export interface DeleteGuestResponse {
  deleteGuest: Guest;
}

export interface SubmitRSVPResponse {
  submitRSVP: Guest;
}

export interface AddBankAccountResponse {
  addBankAccount: BankAccount;
}

export interface UpdateBankAccountResponse {
  updateBankAccount: BankAccount;
}

export interface DeleteBankAccountResponse {
  deleteBankAccount: BankAccount;
}

export interface AddWishResponse {
  addWish: Wish;
}

export interface ApproveWishResponse {
  approveWish: Wish;
}

export interface DeleteWishResponse {
  deleteWish: Wish;
}
