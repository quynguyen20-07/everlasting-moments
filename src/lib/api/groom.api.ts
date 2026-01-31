import { UpdateGroomDto, Groom } from "../../types/api.generated";
import { CreateGroomPayload } from "../../types/payloads";
import api from "./axios";

export const GroomApi = {
  create: async (data: CreateGroomPayload): Promise<Groom> => {
    const response = await api.post<Groom>("/grooms", data);
    return response.data;
  },

  findAll: async (): Promise<Groom[]> => {
    const response = await api.get<Groom[]>("/grooms");
    return response.data;
  },

  findOne: async (id: string): Promise<Groom> => {
    const response = await api.get<Groom>(`/grooms/${id}`);
    return response.data;
  },

  findWeddingGroom: async (weddingId: string): Promise<Groom> => {
    const response = await api.get<Groom>(`/grooms/weddings/${weddingId}`);
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
