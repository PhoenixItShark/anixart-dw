import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getFilteredAnime } from "../api/getAnime.api";
import { AnimeFilter, AnimePageResponse } from "../types";

export const useAnimeInfiniteList = (filters: AnimeFilter) => {
  return useInfiniteQuery<
    AnimePageResponse,
    Error,
    InfiniteData<AnimePageResponse>,
    readonly unknown[],
    number
  >({
    queryKey: ["anime-list", filters],
    queryFn: ({ pageParam = 0 }) =>
      getFilteredAnime({ filters, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.content.length === 0) {
        return undefined;
      }

      const nextPage = allPages.length;
      return nextPage;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 2,
  });
};
