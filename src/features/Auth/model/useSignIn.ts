import { useMutation } from "@tanstack/react-query";
import { signIn } from "@shared/api/auth";
import { AuthCode, useUserStore } from "@entities/User";

export const useSignIn = () => {
  const login = useUserStore((state) => state.login);

  return useMutation({
    mutationFn: ({ login: username, password }: { login: string; password: string }) =>
      signIn(username, password),
    onSuccess: (data) => {
      if (data.code !== AuthCode.Success) return;

      login({
        token: data.profileToken.token,
        id: data.profile.id,
        username: data.profile.login,
        avatar: data.profile.avatar ?? undefined,
      });
    },
  });
};
