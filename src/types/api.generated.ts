/* eslint-disable @typescript-eslint/no-explicit-any */

// Request DTOs
export interface RegisterDto {
    email: string;
    password: string; // Ít nhất 6 ký tự, gồm hoa, thường, số
    fullName: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RefreshTokenDto {
    refreshToken: string;
}

export interface ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}

export interface CreateBankAccountDto {
    weddingId: string;
    type: 'bride' | 'groom';
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    branch?: string;
    qrCodeUrl?: string;
    isActive?: boolean;
}

export interface UpdateBankAccountDto {
    weddingId?: string;
    type?: 'bride' | 'groom';
    bankName?: string;
    accountNumber?: string;
    accountHolder?: string;
    branch?: string;
    qrCodeUrl?: string;
    isActive?: boolean;
}

export interface UpdateBrideDto {
    weddingId?: string;
    fullName?: string;
    avatar?: string;
    shortBio?: string;
    familyInfo?: string;
    socialLinks?: Record<string, any>;
}

export interface UpdateEventDto {
    weddingId?: string;
    title?: string;
    type?: 'ceremony' | 'reception' | 'party';
    eventDate?: string; // date-time
    startTime?: string;
    endTime?: string;
    address?: string;
    locationLat?: number;
    locationLng?: number;
    description?: string;
}

export interface UpdateGroomDto {
    weddingId?: string;
    fullName?: string;
    avatar?: string;
    shortBio?: string;
    familyInfo?: string;
    socialLinks?: Record<string, any>;
}

export interface UpdateGuestDto {
    weddingId?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    numberOfGuests?: number;
    attendanceStatus?: 'pending' | 'confirmed' | 'declined';
    respondedAt?: string; // date-time
    isActive?: boolean;
}

export interface UpdateLoveStoryDto {
    weddingId?: string;
    title?: string;
    content?: string;
    storyDate?: string; // date-time
    imageUrl?: string;
}

export interface UpdateThemeSettingsDto {
    weddingId?: string;
    primaryColor?: string;
    secondaryColor?: string;
    fontHeading?: string;
    fontBody?: string;
    template?: string;
    backgroundMusic?: string;
}

export interface CreateUserDto {
    email: string;
    password: string;
    fullName: string;
    role?: 'user' | 'admin';
    isActive?: boolean;
}

export interface UpdateUserDto {
    email?: string;
    password?: string;
    fullName?: string;
    role?: 'user' | 'admin';
    isActive?: boolean;
}

export interface UpdateUserSessionDto {
    userId?: string;
    refreshToken?: string;
    expirationDate?: string; // date-time
}

export interface UpdateWeddingDto {
    userId?: string;
    slug?: string;
    title?: string;
    weddingDate?: string; // date-time
    status?: 'draft' | 'published' | 'archived';
    language?: 'vi' | 'en';
}

export interface UpdateWishDto {
    weddingId?: string;
    guestName?: string;
    message?: string;
    isApproved?: boolean;
    isActive?: boolean;
}

// Response Types
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface LogoutResponse {
    message: string;
}

// Since most responses create generic objects or lists of objects, we can define generic shapes or specific ones if detailed in the future.
// For now, based on the spec, many return { type: 'object' } or arrays.

export type BankAccount = CreateBankAccountDto & { id: string };
export type Bride = UpdateBrideDto & { id: string };
export type WeddingEvent = UpdateEventDto & { id: string };
export type Groom = UpdateGroomDto & { id: string };
export type Guest = UpdateGuestDto & { id: string };
export type LoveStory = UpdateLoveStoryDto & { id: string };
export type ThemeSettings = UpdateThemeSettingsDto & { id: string };
export type User = CreateUserDto & { id: string };
export type UserSession = UpdateUserSessionDto & { id: string };
export type Wedding = UpdateWeddingDto & { id: string };
export type Wish = UpdateWishDto & { id: string };
