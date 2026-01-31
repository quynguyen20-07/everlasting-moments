import api from './axios';
import {
    UpdateEventDto,
    WeddingEvent,
} from '../../types/api.generated';
import { CreateEventPayload } from '../../types/payloads';

export const EventApi = {
    create: async (data: CreateEventPayload): Promise<WeddingEvent> => {
        const response = await api.post<WeddingEvent>('/events', data);
        return response.data;
    },

    findAll: async (): Promise<WeddingEvent[]> => {
        const response = await api.get<WeddingEvent[]>('/events');
        return response.data;
    },

    findOne: async (id: string): Promise<WeddingEvent> => {
        const response = await api.get<WeddingEvent>(`/events/${id}`);
        return response.data;
    },

    update: async (id: string, data: UpdateEventDto): Promise<WeddingEvent> => {
        const response = await api.patch<WeddingEvent>(`/events/${id}`, data);
        return response.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/events/${id}`);
    },
};
