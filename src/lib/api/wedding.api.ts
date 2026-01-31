import { UpdateWeddingDto, Wedding } from "../../types/api.generated";
import { CreateWeddingPayload } from "../../types/payloads";
import { WeddingWithDetails } from "../../types/wedding";
import { ThemeSettingsApi } from "./theme-settings.api";
import { LoveStoryApi } from "./love-story.api";
import { GroomApi } from "./groom.api";
import { EventApi } from "./event.api";
import { BrideApi } from "./bride.api";
import api from "./axios";

export const WeddingApi = {
  create: async (data: CreateWeddingPayload): Promise<Wedding> => {
    const response = await api.post<Wedding>("/weddings", data);
    return response.data;
  },

  findAll: async (): Promise<WeddingWithDetails[]> => {
    const [weddings, themes, brides, grooms, loveStories, events] =
      await Promise.all([
        api.get<Wedding[]>("/weddings").then((r) => r.data),
        ThemeSettingsApi.findAll(),
        BrideApi.findAll(),
        GroomApi.findAll(),
        LoveStoryApi.findAll(),
        EventApi.findAll(),
      ]);

    return weddings.map((w) => ({
      ...w,
      themeSettings: themes.find((t) => t.weddingId === w.id),
      weddingDetail: {
        id: w.id,
        weddingId: w.id,
        bride: brides.find((b) => b.weddingId === w.id)!,
        groom: grooms.find((g) => g.weddingId === w.id)!,
        loveStories: loveStories.filter((l) => l.weddingId === w.id),
        weddingEvents: events.filter((e) => e.weddingId === w.id),
      },
    }));
  },

  findBySlug: async (slug: string): Promise<Wedding | undefined> => {
    const response = await api.get<Wedding>(`/weddings/slug/${slug}`);
    return response.data;
  },

  findOne: async (id: string): Promise<WeddingWithDetails> => {
    const [wedding, themes, brides, grooms, loveStories, events] =
      await Promise.all([
        api.get<Wedding>(`/weddings/${id}`).then((r) => r.data),
        ThemeSettingsApi.findAll(),
        BrideApi.findAll(),
        GroomApi.findAll(),
        LoveStoryApi.findAll(),
        EventApi.findAll(),
      ]);

    return {
      ...wedding,
      themeSettings: themes.find((t) => t.weddingId === wedding.id),
      weddingDetail: {
        id: wedding.id,
        weddingId: wedding.id,
        bride: brides.find((b) => b.weddingId === wedding.id)!,
        groom: grooms.find((g) => g.weddingId === wedding.id)!,
        loveStories: loveStories.filter((l) => l.weddingId === wedding.id),
        weddingEvents: events.filter((e) => e.weddingId === wedding.id),
      },
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
