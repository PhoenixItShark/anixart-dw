import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentReplies } from "../api";
import { CommentSort } from "../types";

export const useCommentReplies = (
  commentId: number,
  sort: CommentSort = CommentSort.Newest,
  enabled: boolean = true
) => {
  return useInfiniteQuery({
    queryKey: ["commentReplies", commentId, sort],
    queryFn: ({ pageParam }) => getCommentReplies(commentId, pageParam, sort),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.total_page_count
        ? lastPage.current_page + 1
        : undefined,
    enabled: enabled && !!commentId,
    staleTime: 1000 * 30,
  });
};
