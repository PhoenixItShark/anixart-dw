import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AnimeFilterParams } from "../types";
import { getFilteredAnime } from "../api/animeApi";
import { DEFAULT_FILTERS } from "../const/const";
import { AnimePageResponse } from "../types/animeApiResponse";

export const useAnimeInfiniteList = (
  filters: AnimeFilterParams = DEFAULT_FILTERS,
) => {
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
      const nextPage = allPages.length;

      // Если последняя страница пустая — значит, больше нет
      if (lastPage.content.length === 0) {
        return undefined;
      }

      return nextPage;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 2,
  });
};
