import { useInfiniteQuery } from "@tanstack/react-query";
import { getRelatedReleases } from "../api";

const PAGE_SIZE = 25;

export const useRelatedReleases = (franchiseId: number | null, enabled: boolean = true) => {
  return useInfiniteQuery({
    queryKey: ["relatedReleases", franchiseId],
    queryFn: ({ pageParam }) => getRelatedReleases(franchiseId as number, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.content.length === PAGE_SIZE
        ? lastPage.current_page + 1
        : undefined,
    enabled: enabled && !!franchiseId,
    staleTime: 1000 * 60 * 10,
  });
};
