import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToProfileList,
  deleteFromProfileList,
} from "../api";
import { ProfileListStatus } from "../types";

export const useProfileListMutation = (releaseId: string) => {
  const queryClient = useQueryClient();
  const releaseKey = ["release", releaseId];

  const add = useMutation({
    mutationFn: (list: ProfileListStatus) =>
      addToProfileList(list, Number(releaseId)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: releaseKey }),
  });

  const remove = useMutation({
    mutationFn: (list: ProfileListStatus) =>
      deleteFromProfileList(list, Number(releaseId)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: releaseKey }),
  });

  return { add, remove };
};
