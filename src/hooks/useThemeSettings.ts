import { ThemeSettingsApi } from "@/lib/api/theme-settings.api";
import { useQuery } from "@tanstack/react-query";

export const settingKeys = {
  all: ["theme-settings"] as const,
  lists: () => [...settingKeys.all, "list"] as const,
  list: (filters?: string) => [...settingKeys.lists(), filters] as const,
  details: () => [...settingKeys.all, "detail"] as const,
  detail: (id: string) => [...settingKeys.details(), id] as const,
  public: (slug: string) => [...settingKeys.all, "public", slug] as const,
};

export function useGetWeddingSetting(weddingID: string | undefined) {
  return useQuery({
    queryKey: settingKeys.list(weddingID!),
    queryFn: () => ThemeSettingsApi.findByWeddingId(weddingID!),
    enabled: !!weddingID,
    staleTime: 30 * 1000,
  });
}
