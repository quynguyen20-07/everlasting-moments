import api from './axios';
import {
    UpdateThemeSettingsDto,
    ThemeSettings,
} from '../../types/api.generated';
import { CreateThemeSettingsPayload } from '../../types/payloads';

export const ThemeSettingsApi = {
    create: async (data: CreateThemeSettingsPayload): Promise<ThemeSettings> => {
        const response = await api.post<ThemeSettings>('/theme-settings', data);
        return response.data;
    },

    findAll: async (): Promise<ThemeSettings[]> => {
        const response = await api.get<ThemeSettings[]>('/theme-settings');
        return response.data;
    },

    findOne: async (id: string): Promise<ThemeSettings> => {
        const response = await api.get<ThemeSettings>(`/theme-settings/${id}`);
        return response.data;
    },

    update: async (id: string, data: UpdateThemeSettingsDto): Promise<ThemeSettings> => {
        const response = await api.patch<ThemeSettings>(`/theme-settings/${id}`, data);
        return response.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/theme-settings/${id}`);
    },
};
