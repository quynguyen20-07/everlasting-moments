import api from './axios';
import {
    UpdateWeddingDto,
    Wedding,
} from '../../types/api.generated';
import { CreateWeddingPayload } from '../../types/payloads';
import { ThemeSettingsApi } from './theme-settings.api';
import { BrideApi } from './bride.api';
import { GroomApi } from './groom.api';
import type { WeddingWithDetails } from '@/types';

export const WeddingApi = {
    create: async (data: CreateWeddingPayload): Promise<Wedding> => {
        const response = await api.post<Wedding>('/weddings', data);
        return response.data;
    },

    findAll: async (): Promise<WeddingWithDetails[]> => {
        const [weddings, themes, brides, grooms] = await Promise.all([
            api.get<Wedding[]>('/weddings').then(r => r.data),
            ThemeSettingsApi.findAll(),
            BrideApi.findAll(),
            GroomApi.findAll()
        ]);

        return weddings.map(w => ({
            ...w,
            themeSettings: themes.find(t => t.weddingId === w.id),
            weddingDetail: {
                bride: brides.find(b => b.weddingId === w.id),
                groom: grooms.find(g => g.weddingId === w.id)
            }
        }));
    },

    findBySlug: async (slug: string): Promise<WeddingWithDetails | undefined> => {
        const all = await WeddingApi.findAll();
        return all.find(w => w.slug === slug);
    },

    findOne: async (id: string): Promise<WeddingWithDetails> => {
        const [wedding, themes, brides, grooms] = await Promise.all([
            api.get<Wedding>(`/weddings/${id}`).then(r => r.data),
            ThemeSettingsApi.findAll(), // Inefficient but sticking to available API
            BrideApi.findAll(),
            GroomApi.findAll()
        ]);

        return {
            ...wedding,
            themeSettings: themes.find(t => t.weddingId === wedding.id),
            weddingDetail: {
                bride: brides.find(b => b.weddingId === wedding.id),
                groom: grooms.find(g => g.weddingId === wedding.id)
            }
        };
    },

    update: async (id: string, data: UpdateWeddingDto): Promise<Wedding> => {
        const response = await api.patch<Wedding>(`/weddings/${id}`, data);
        return response.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/weddings/${id}`);
    },
};
