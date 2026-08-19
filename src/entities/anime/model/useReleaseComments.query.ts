import { useInfiniteQuery } from "@tanstack/react-query";
import { getReleaseComments } from "../api";
import { CommentSort } from "../types";

export const useReleaseComments = (releaseId: string, sort: CommentSort) => {
  return useInfiniteQuery({
    queryKey: ["releaseComments", releaseId, sort],
    queryFn: ({ pageParam }) => getReleaseComments(releaseId, pageParam, sort),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.total_page_count
        ? lastPage.current_page + 1
        : undefined,
    enabled: !!releaseId,
    staleTime: 1000 * 30,
  });
};
