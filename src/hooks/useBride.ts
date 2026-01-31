import { useQuery } from "@tanstack/react-query";
import { BrideApi } from "@/lib/api/bride.api";

export const brideKeys = {
  all: ["brides"] as const,
  lists: () => [...brideKeys.all, "list"] as const,
  list: (filters?: string) => [...brideKeys.lists(), filters] as const,
  details: () => [...brideKeys.all, "detail"] as const,
  detail: (id: string) => [...brideKeys.details(), id] as const,
  public: (slug: string) => [...brideKeys.all, "public", slug] as const,
};

export function useGetBride(weddingId: string | undefined) {
  return useQuery({
    queryKey: brideKeys.detail(weddingId!),
    queryFn: () => BrideApi.findWeddingBride(weddingId!),
    enabled: !!weddingId,
    staleTime: 30 * 1000,
  });
}
