
import {
    UpdateBrideDto,
    UpdateGroomDto,
    UpdateThemeSettingsDto,
    UpdateLoveStoryDto,
    UpdateEventDto,
    UpdateWeddingDto
} from './api.generated';

// Payload for creating a wedding
// Based on UpdateWeddingDto but with required fields for creation logic
export interface CreateWeddingPayload {
    title: string;
    slug: string;
    weddingDate: string; // ISO date string
    language?: 'vi' | 'en';
    userId?: string;
    status?: 'draft' | 'published' | 'archived';
}

// Payload for creating a bride
// Usually requires weddingId
export interface CreateBridePayload extends UpdateBrideDto {
    weddingId: string;
    fullName: string; // Ensure name is required
}

// Payload for creating a groom
export interface CreateGroomPayload extends UpdateGroomDto {
    weddingId: string;
    fullName: string;
}

// Payload for creating theme settings
export interface CreateThemeSettingsPayload extends UpdateThemeSettingsDto {
    weddingId: string;
}

// Payload for creating love story
export interface CreateLoveStoryPayload extends UpdateLoveStoryDto {
    weddingId: string;
    title: string;
}

// Payload for creating event
export interface CreateEventPayload extends UpdateEventDto {
    weddingId: string;
    title: string;
}
