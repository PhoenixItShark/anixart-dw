// src/entities/anime/types/animeApiResponse.ts

export interface AnimeCategory {
  id: number;
  name: string;
}

export interface AnimeStatus {
  id: number;
  name: string;
}

export interface AnimeItem {
  '@id': number;
  age_rating: number;
  aired_on_date: number | null;
  author: string | null;
  broadcast: number;
  can_torlook_search: boolean;
  can_video_appeal: boolean;
  category: AnimeCategory;
  collection_count: number;
  comment_count: number;
  comment_per_day_count: number;
  comments: any[]; // можно детализировать позже
  comments_count: number;
  completed_count: number;
  country: string;
  creation_date: number;
  description: string;
  director: string | null;
  dropped_count: number;
  duration: number;
  episode_last_update: number | null;
  episodes_released: number;
  episodes_total: number | null;
  favorites_count: number;
  genres: string; // приходит строкой через запятую
  grade: number;
  hold_on_count: number;
  id: number;
  image: string;
  is_adult: boolean;
  is_deleted: boolean;
  is_favorite: boolean;
  is_play_disabled: boolean;
  is_release_type_notifications_enabled: boolean;
  is_tpp_disabled: boolean;
  is_view_blocked: boolean;
  is_viewed: boolean;
  last_update_date: number;
  last_view_episode: number | null;
  last_view_timestamp: number;
  note: string | null;
  plan_count: number;
  poster: string;
  profile_list_status: any | null;
  profile_release_type_notification_preference_count: number;
  rating: number;
  recommended_releases: any[];
  related: any | null;
  related_count: number;
  related_releases: any[];
  release_date: string;
  screenshot_images: any[];
  screenshots: any[];
  season: number;
  source: string | null;
  status: AnimeStatus;
  status_id: number;
  studio: string;
  title_alt: string;
  title_original: string;
  title_ru: string;
  translators: string;
  video_banners: any[];
  vote_1_count: number;
  vote_2_count: number;
  vote_3_count: number;
  vote_4_count: number;
  vote_5_count: number;
  vote_count: number;
  watching_count: number;
  year: string;
  your_vote: number;
}

export interface AnimePageResponse {
  code: number;
  content: AnimeItem[];
  current_page: number;
  total_count: number;
  total_page_count: number;
}