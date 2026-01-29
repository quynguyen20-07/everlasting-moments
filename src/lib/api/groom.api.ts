import api from './axios';
import {
    UpdateGroomDto,
    Groom,
} from '../../types/api.generated';

export const GroomApi = {
    create: async (): Promise<Groom> => {
        const response = await api.post<Groom>('/grooms');
        return response.data;
    },

    findAll: async (): Promise<Groom[]> => {
        const response = await api.get<Groom[]>('/grooms');
        return response.data;
    },

    findOne: async (id: string): Promise<Groom> => {
        const response = await api.get<Groom>(`/grooms/${id}`);
        return response.data;
    },

    update: async (id: string, data: UpdateGroomDto): Promise<Groom> => {
        const response = await api.patch<Groom>(`/grooms/${id}`, data);
        return response.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/grooms/${id}`);
    },
};
