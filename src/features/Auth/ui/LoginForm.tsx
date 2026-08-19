import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSignIn } from "../model/useSignIn";
import { AuthCode, useUserStore } from "@entities/User";
import { Input } from "@shared/shadcn/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const AUTH_ERRORS: Record<number, string> = {
  [AuthCode.InvalidLogin]: "Аккаунт с таким логином не найден",
  [AuthCode.InvalidPassword]: "Неверный пароль",
  [AuthCode.Ban]: "Аккаунт заблокирован",
  [AuthCode.PermBan]: "Аккаунт заблокирован навсегда",
};

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      className="flex flex-col gap-5 w-full bg-color-primary p-8 rounded-2xl border border-text-primary/20 shadow-xl"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold text-text-secondary">Вход в аккаунт</h2>
        <p className="text-sm text-text-primary mt-1">Войди, чтобы продолжить</p>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-text-primary">Логин или email</span>
        <Input
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Введите логин"
          autoComplete="username"
          autoFocus
          required
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-text-primary">Пароль</span>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            autoComplete="current-password"
            className="pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-primary hover:text-text-secondary transition"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff width={18} height={18} /> : <Eye width={18} height={18} />}
          </button>
        </div>
      </label>

      {errorMessage && (
        <p className="text-red text-sm bg-red/10 border border-red/30 rounded-md px-3 py-2">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-red text-white font-bold py-2.5 px-4 rounded-lg hover:opacity-90 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin" width={18} height={18} />
            Входим...
          </>
        ) : (
          "Войти"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
