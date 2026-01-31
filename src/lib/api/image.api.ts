import {
  CreateImageInput,
  UpdateImageInput,
  ReplaceImagesInput,
  Image,
} from "../../types/api.generated";
import api from "./axios";

export const ImageApi = {
  findAll: async (weddingId: string): Promise<Image[]> => {
    const response = await api.get<Image[]>(`/weddings/${weddingId}/images`);
    return response.data;
  },

  replace: async (
    weddingId: string,
    data: ReplaceImagesInput,
  ): Promise<Image[]> => {
    const response = await api.put<Image[]>(
      `/weddings/${weddingId}/images`,
      data,
    );
    return response.data;
  },

  findOne: async (id: string): Promise<Image> => {
    const response = await api.get<Image>(`/images/${id}`);
    return response.data;
  },

  update: async (id: string, data: UpdateImageInput): Promise<Image> => {
    const response = await api.patch<Image>(`/images/${id}`, data);
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/images/${id}`);
  },
};
