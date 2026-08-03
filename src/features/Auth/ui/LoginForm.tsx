import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSignIn } from "../model/useSignIn";
import { AuthCode, useUserStore } from "@entities/User";
import { Input } from "@shared/shadcn/components/ui/input";

const AUTH_ERRORS: Record<number, string> = {
  [AuthCode.InvalidLogin]: "Аккаунт с таким логином не найден",
  [AuthCode.InvalidPassword]: "Неверный пароль",
  [AuthCode.Ban]: "Аккаунт заблокирован",
  [AuthCode.PermBan]: "Аккаунт заблокирован навсегда",
};

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending, error, data } = useSignIn();

  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/" replace />;

  const code = data?.code;
  const errorMessage =
    (code !== undefined && AUTH_ERRORS[code]) ||
    (error ? "Не удалось подключиться к серверу" : null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ login, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm bg-color-primary p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-text-secondary">Вход в Anixart</h2>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-text-primary">Логин или email</span>
        <Input
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Введите логин"
          autoComplete="username"
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-text-primary">Пароль</span>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
          autoComplete="current-password"
          required
        />
      </label>

      {errorMessage && <p className="text-red text-sm">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-red text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Входим..." : "Войти"}
      </button>
    </form>
  );
};

export default LoginForm;
