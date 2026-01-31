import { useQuery } from "@tanstack/react-query";
import { EventApi } from "@/lib/api/event.api";

export const eventKeys = {
  all: ["events"] as const,
  lists: () => [...eventKeys.all, "list"] as const,
  list: (filters?: string) => [...eventKeys.lists(), filters] as const,
  details: () => [...eventKeys.all, "detail"] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
  public: (slug: string) => [...eventKeys.all, "public", slug] as const,
};

export function useGetWeddingEvents(weddingID: string | undefined) {
  return useQuery({
    queryKey: eventKeys.list(weddingID!),
    queryFn: () => EventApi.findWeddingEvents(weddingID!),
    enabled: !!weddingID,
    staleTime: 30 * 1000,
  });
}
