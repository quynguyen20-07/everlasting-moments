import api from './axios';
import {
    UpdateBrideDto,
    Bride,
} from '../../types/api.generated';

export const BrideApi = {
    create: async (): Promise<Bride> => {
        const response = await api.post<Bride>('/brides');
        return response.data;
    },

    findAll: async (): Promise<Bride[]> => {
        const response = await api.get<Bride[]>('/brides');
        return response.data;
    },

    findOne: async (id: string): Promise<Bride> => {
        const response = await api.get<Bride>(`/brides/${id}`);
        return response.data;
    },

    update: async (id: string, data: UpdateBrideDto): Promise<Bride> => {
        const response = await api.patch<Bride>(`/brides/${id}`, data);
        return response.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/brides/${id}`);
    },
};
