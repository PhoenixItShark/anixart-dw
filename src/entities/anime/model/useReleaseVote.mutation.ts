import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReleaseVote, deleteReleaseVote } from "../api";

export const useReleaseVote = (releaseId: string, yourVote: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vote: number) =>
      yourVote === vote
        ? deleteReleaseVote(Number(releaseId))
        : addReleaseVote(Number(releaseId), vote),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["release", releaseId] }),
  });
};
