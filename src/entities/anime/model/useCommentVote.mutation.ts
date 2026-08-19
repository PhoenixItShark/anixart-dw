import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentVote } from "../api";
import { CommentVote, ReleaseComment } from "../types";

const voteDelta = (current: number, target: CommentVote): number => {
  if (current === target) return target === CommentVote.Like ? -1 : 1;
  if (current === 0) return target === CommentVote.Like ? 1 : -1;
  return target === CommentVote.Like ? 2 : -2;
};

export const useCommentVote = (releaseId: string, commentId: number) => {
  const queryClient = useQueryClient();

  const patchComment = (vote: CommentVote) => {
    const updater = (old: unknown): unknown => {
      if (!old || typeof old !== "object") return old;
      const data = old as { pages?: { content?: ReleaseComment[] }[] };
      if (!data.pages) return old;

      let changed = false;
      const pages = data.pages.map((page) => ({
        ...page,
        content: page.content?.map((c) => {
          if (c.id !== commentId) return c;
          changed = true;
          return {
            ...c,
            vote: c.vote === vote ? 0 : vote,
            vote_count: c.vote_count + voteDelta(c.vote, vote),
          };
        }),
      }));

      return changed ? { ...data, pages } : old;
    };

    queryClient.setQueriesData({ queryKey: ["releaseComments", releaseId] }, updater);
    queryClient.setQueriesData({ queryKey: ["commentReplies"] }, updater);
  };

  return useMutation({
    mutationFn: (vote: CommentVote) => commentVote(commentId, vote),
    onMutate: async (vote) => {
      await queryClient.cancelQueries({ queryKey: ["releaseComments", releaseId] });
      await queryClient.cancelQueries({ queryKey: ["commentReplies"] });

      const prev = {
        comments: queryClient.getQueryData(["releaseComments", releaseId]),
        replies: queryClient.getQueriesData({ queryKey: ["commentReplies"] }),
      };

      patchComment(vote);
      return prev;
    },
    onError: (_error, _vote, prev) => {
      if (!prev) return;
      if (prev.comments !== undefined) {
        queryClient.setQueryData(["releaseComments", releaseId], prev.comments);
      }
      prev.replies.forEach(([key, data]) => {
        if (data !== undefined) queryClient.setQueryData(key, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["releaseComments", releaseId] });
      queryClient.invalidateQueries({ queryKey: ["commentReplies"] });
    },
  });
};
