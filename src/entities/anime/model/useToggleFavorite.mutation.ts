import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavorite, deleteFromFavorite } from "../api";

export const useToggleFavorite = (releaseId: string, isFavorite: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      isFavorite
        ? deleteFromFavorite(Number(releaseId))
        : addToFavorite(Number(releaseId)),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["release", releaseId] }),
  });
};
