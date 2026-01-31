import { UpdateBrideDto, Bride } from "../../types/api.generated";
import { CreateBridePayload } from "../../types/payloads";
import api from "./axios";

export const BrideApi = {
  create: async (data: CreateBridePayload): Promise<Bride> => {
    const response = await api.post<Bride>("/brides", data);
    return response.data;
  },

  findAll: async (): Promise<Bride[]> => {
    const response = await api.get<Bride[]>("/brides");
    return response.data;
  },

  findOne: async (id: string): Promise<Bride> => {
    const response = await api.get<Bride>(`/brides/${id}`);
    return response.data;
  },

  findWeddingBride: async (weddingId: string): Promise<Bride> => {
    const response = await api.get<Bride>(`/brides/weddings/${weddingId}`);
    return response.data;
  },

  update: async (id: string, data: UpdateBrideDto): Promise<Bride> => {
    const response = await api.patch<Bride>(`/brides/${id}`, data);
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/brides/${id}`);
  },
};
