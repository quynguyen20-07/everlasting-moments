import api from './axios';
import {
    UpdateUserSessionDto,
    UserSession,
} from '../../types/api.generated';

export const UserSessionApi = {
    create: async (): Promise<UserSession> => {
        const response = await api.post<UserSession>('/user-sessions');
        return response.data;
    },

    findAll: async (): Promise<UserSession[]> => {
        const response = await api.get<UserSession[]>('/user-sessions');
        return response.data;
    },

    findOne: async (id: string): Promise<UserSession> => {
        const response = await api.get<UserSession>(`/user-sessions/${id}`);
        return response.data;
    },

    update: async (id: string, data: UpdateUserSessionDto): Promise<UserSession> => {
        const response = await api.patch<UserSession>(`/user-sessions/${id}`, data);
        return response.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/user-sessions/${id}`);
    },
};
