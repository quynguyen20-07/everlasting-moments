import api from './axios';
import {
    RegisterDto,
    LoginDto,
    RefreshTokenDto,
    ChangePasswordDto,
    LoginResponse,
    LogoutResponse,
    User,
} from '../../types/api.generated';

export const AuthApi = {
    register: async (data: RegisterDto): Promise<void> => {
        await api.post('/auth/register', data);
    },

    login: async (data: LoginDto): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', data);
        return response.data;
    },

    refreshToken: async (data: RefreshTokenDto): Promise<void> => {
        await api.post('/auth/refresh', data);
    },

    logout: async (): Promise<LogoutResponse> => {
        const response = await api.post<LogoutResponse>('/auth/logout');
        return response.data;
    },

    logoutAll: async (): Promise<void> => {
        await api.post('/auth/logout-all');
    },

    getSessions: async (): Promise<any[]> => {
        const response = await api.get<any[]>('/auth/sessions');
        return response.data;
    },

    revokeSession: async (sessionId: string): Promise<void> => {
        await api.delete(`/auth/sessions/${sessionId}`);
    },

    changePassword: async (data: ChangePasswordDto): Promise<void> => {
        await api.post('/auth/change-password', data);
    },

    getProfile: async (): Promise<User> => {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },
};
