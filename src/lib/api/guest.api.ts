import api from './axios';
import {
    UpdateGuestDto,
    Guest,
} from '../../types/api.generated';

export const GuestApi = {
    create: async (): Promise<Guest> => {
        const response = await api.post<Guest>('/guests');
        return response.data;
    },

    findAll: async (): Promise<Guest[]> => {
        const response = await api.get<Guest[]>('/guests');
        return response.data;
    },

    findOne: async (id: string): Promise<Guest> => {
        const response = await api.get<Guest>(`/guests/${id}`);
        return response.data;
    },

    update: async (id: string, data: UpdateGuestDto): Promise<Guest> => {
        const response = await api.patch<Guest>(`/guests/${id}`, data);
        return response.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/guests/${id}`);
    },
};
