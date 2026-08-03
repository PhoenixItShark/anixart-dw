// Типы ответов авторизации Anixart API 9.0

export interface UserProfile {
  id: number;
  login: string;
  avatar: string | null;
  status: string;
  sponsorship_expires: number;
  last_activity_time: number;
  register_date: number;
  vk_page: string;
  tg_page: string;
  inst_page: string;
  tt_page: string;
  discord_page: string;
  ban_expires: number;
  ban_reason: string;
  ban_note: string | null;
  privilege_level: number;
  watching_count: number;
  plan_count: number;
  completed_count: number;
  hold_on_count: number;
  dropped_count: number;
  favorite_count: number;
  comment_count: number;
  collection_count: number;
}

export interface ProfileToken {
  id: string;
  token: string;
}

export enum AuthCode {
  Success = 0,
  UnexpectedError = 1,
  InvalidLogin = 2,
  InvalidPassword = 3,
  Unauthorized = 401,
  Ban = 402,
  PermBan = 403,
}

export interface AuthResponse {
  code: AuthCode;
  profile: UserProfile;
  profileToken: ProfileToken;
}

export interface RegisterResponse {
  code: number;
  hash: string;
  codeTimestampExpires: number;
}
