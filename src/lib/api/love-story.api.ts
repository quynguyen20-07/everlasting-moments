import api from './axios';
import {
    UpdateLoveStoryDto,
    LoveStory,
} from '../../types/api.generated';
import { CreateLoveStoryPayload } from '../../types/payloads';

export const LoveStoryApi = {
    create: async (data: CreateLoveStoryPayload): Promise<LoveStory> => {
        const response = await api.post<LoveStory>('/love-stories', data);
        return response.data;
    },

    findAll: async (): Promise<LoveStory[]> => {
        const response = await api.get<LoveStory[]>('/love-stories');
        return response.data;
    },

    findOne: async (id: string): Promise<LoveStory> => {
        const response = await api.get<LoveStory>(`/love-stories/${id}`);
        return response.data;
    },

    update: async (id: string, data: UpdateLoveStoryDto): Promise<LoveStory> => {
        const response = await api.patch<LoveStory>(`/love-stories/${id}`, data);
        return response.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/love-stories/${id}`);
    },
};
