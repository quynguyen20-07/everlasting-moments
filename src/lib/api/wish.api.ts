import api from './axios';
import {
    UpdateWishDto,
    Wish,
} from '../../types/api.generated';

export const WishApi = {
    create: async (): Promise<Wish> => {
        const response = await api.post<Wish>('/wishs');
        return response.data;
    },

    findAll: async (): Promise<Wish[]> => {
        const response = await api.get<Wish[]>('/wishs');
        return response.data;
    },

    findOne: async (id: string): Promise<Wish> => {
        const response = await api.get<Wish>(`/wishs/${id}`);
        return response.data;
    },

    update: async (id: string, data: UpdateWishDto): Promise<Wish> => {
        const response = await api.patch<Wish>(`/wishs/${id}`, data);
        return response.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/wishs/${id}`);
    },
};
