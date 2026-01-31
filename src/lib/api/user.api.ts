import api from './axios';
import {
    CreateUserDto,
    UpdateUserDto,
    User,
} from '../../types/api.generated';

export const UserApi = {
    create: async (data: CreateUserDto): Promise<User> => {
        const response = await api.post<User>('/users', data);
        return response.data;
    },

    findAll: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/users');
        return response.data;
    },

    findOne: async (id: string): Promise<User> => {
        const response = await api.get<User>(`/users/${id}`);
        return response.data;
    },

    update: async (id: string, data: UpdateUserDto): Promise<User> => {
        const response = await api.patch<User>(`/users/${id}`, data);
        return response.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/users/${id}`);
    },
};
