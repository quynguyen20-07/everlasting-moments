import { useQuery } from "@tanstack/react-query";
import { GroomApi } from "@/lib/api/groom.api";

export const groomKeys = {
  all: ["brooms"] as const,
  lists: () => [...groomKeys.all, "list"] as const,
  list: (filters?: string) => [...groomKeys.lists(), filters] as const,
  details: () => [...groomKeys.all, "detail"] as const,
  detail: (id: string) => [...groomKeys.details(), id] as const,
  public: (slug: string) => [...groomKeys.all, "public", slug] as const,
};

export function useGetGroom(weddingId: string | undefined) {
  return useQuery({
    queryKey: groomKeys.detail(weddingId!),
    queryFn: () => GroomApi.findWeddingGroom(weddingId!),
    enabled: !!weddingId,
    staleTime: 30 * 1000,
  });
}
