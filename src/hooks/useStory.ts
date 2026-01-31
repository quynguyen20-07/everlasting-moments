import { LoveStoryApi } from "@/lib/api/love-story.api";
import { useQuery } from "@tanstack/react-query";

export const loveStoryKeys = {
  all: ["love-stories"] as const,
  lists: () => [...loveStoryKeys.all, "list"] as const,
  list: (filters?: string) => [...loveStoryKeys.lists(), filters] as const,
  details: () => [...loveStoryKeys.all, "detail"] as const,
  detail: (id: string) => [...loveStoryKeys.details(), id] as const,
  public: (slug: string) => [...loveStoryKeys.all, "public", slug] as const,
};

export function useGetWeddingStories(weddingID: string | undefined) {
  return useQuery({
    queryKey: loveStoryKeys.list(weddingID!),
    queryFn: () => LoveStoryApi.findWeddingStories(weddingID!),
    enabled: !!weddingID,
    staleTime: 30 * 1000,
  });
}
