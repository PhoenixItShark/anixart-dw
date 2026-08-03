import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const USER_AGENT =
  import.meta.env.VITE_USER_AGENT ||
  "AnixartApp/9.0 BETA 9-25110702 (Android 16; SDK 36; x86_64; Google sdk_gphone64_x86_64; en)";

const getToken = (): string | undefined => {
  const fallback = import.meta.env.VITE_TOKEN;

  try {
    const raw = localStorage.getItem("user-storage");
    if (!raw) return fallback;
    const { state } = JSON.parse(raw);
    return state?.token || fallback;
  } catch {
    return fallback;
  }
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "User-Agent": USER_AGENT,
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token && !config.params?.token) {
    config.params = { ...config.params, token };
  }

  return config;
});
