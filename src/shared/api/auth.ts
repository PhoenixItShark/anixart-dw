import { apiClient } from "./client";
import { API_URLS } from "@shared/lib/const";
import { AuthResponse, RegisterResponse } from "./auth.types";

export const signIn = async (login: string, password: string): Promise<AuthResponse> => {
  const res = await apiClient.post(`${API_URLS.auth}/signIn`, null, {
    params: { login, password },
  });
  return res.data;
};

export const signUp = async (
  email: string,
  login: string,
  password: string
): Promise<RegisterResponse> => {
  const res = await apiClient.post(`${API_URLS.auth}/signUp`, null, {
    params: { email, login, password },
  });
  return res.data;
};

export const verifyRegistration = async (data: {
  email: string;
  login: string;
  password: string;
  hash: string;
  code: string;
}): Promise<AuthResponse> => {
  const res = await apiClient.post(`${API_URLS.auth}/verify`, null, { params: data });
  return res.data;
};

export const restorePassword = async (login: string): Promise<RegisterResponse> => {
  const res = await apiClient.post(`${API_URLS.auth}/restore`, null, {
    params: { login },
  });
  return res.data;
};

export const restoreVerify = async (data: {
  login: string;
  password: string;
  hash: string;
  code: string;
}): Promise<AuthResponse> => {
  const res = await apiClient.post(`${API_URLS.auth}/restore/verify`, null, { params: data });
  return res.data;
};
