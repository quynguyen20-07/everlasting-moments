import api from './axios';
import { MediaItemWithMeta, MediaInput } from '../../types/media';

export const MediaApi = {
    findAll: async (weddingId: string): Promise<MediaItemWithMeta[]> => {
        const response = await api.get<MediaItemWithMeta[]>(`/weddings/${weddingId}/media`);
        return response.data;
    },

    create: async (weddingId: string, data: MediaInput): Promise<MediaItemWithMeta> => {
        const response = await api.post<MediaItemWithMeta>(`/weddings/${weddingId}/media`, data);
        return response.data;
    },

    update: async (id: string, data: Partial<MediaInput>): Promise<MediaItemWithMeta> => {
        const response = await api.patch<MediaItemWithMeta>(`/media/${id}`, data);
        return response.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/media/${id}`);
    },

    reorder: async (weddingId: string, mediaIds: string[]): Promise<void> => {
        await api.post(`/weddings/${weddingId}/media/reorder`, { mediaIds });
    }
};
