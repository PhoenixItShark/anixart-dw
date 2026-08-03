import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReleaseComment } from "../api";

export interface AddCommentPayload {
  message: string;
  spoiler?: boolean;
  parentCommentId?: number | null;
  replyToProfileId?: number | null;
}

export const useAddComment = (releaseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ message, spoiler, parentCommentId, replyToProfileId }: AddCommentPayload) =>
      addReleaseComment(releaseId, {
        message,
        isSpoiler: spoiler ?? false,
        parentCommentId: parentCommentId ?? null,
        replyToProfileId: replyToProfileId ?? null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["releaseComments", releaseId],
      });
      queryClient.invalidateQueries({ queryKey: ["commentReplies"] });
      queryClient.invalidateQueries({ queryKey: ["release", releaseId] });
    },
  });
};
