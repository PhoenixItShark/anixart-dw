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
  comments: unknown[]; // можно детализировать позже
  comments_count: number;
  completed_count: number;
  country: string;
  creation_date: number;
  description: string;
  director: string | null;
  dropped_count: number;
  duration: number;
  episode_last_update: EpisodeLastUpdate | null;
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
  last_view_episode: ReleaseEpisode | null;
  last_view_timestamp: number;
  note: string | null;
  plan_count: number;
  poster: string;
  profile_list_status: ProfileListStatus | null;
  profile_release_type_notification_preference_count: number;
  rating: number;
  recommended_releases: AnimeItem[];
  related: AnimeRelated | null;
  related_count: number;
  related_releases: AnimeItem[];
  release_date: string;
  screenshot_images: string[];
  screenshots: string[];
  season: number;
  source: string | null;
  status: AnimeStatus;
  status_id: number;
  studio: string;
  title_alt: string;
  title_original: string;
  title_ru: string;
  translators: string;
  video_banners: VideoBanner[];
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

export interface AnimeRelated {
  description: string;
  id: number;
  image: string;
  images: string[];
  name: string;
  name_ru: string;
  release_count: number;
}

export interface ReleaseEpisode {
  '@id': number;
  position: number;
  release: number;
  source: number;
  name: string;
  url: string;
  iframe: boolean;
  addedDate: number;
  is_filter: boolean;
  is_watched: boolean;
}

export interface EpisodeLastUpdate {
  lastEpisodeTypeUpdateName: string;
  last_episode_source_update_id: number;
  last_episode_source_update_name: string;
  last_episode_type_update_id: number;
  last_episode_update_date: number;
  last_episode_update_name: string;
}

export interface VideoBanner {
  name: string;
  image: string;
  value: string;
  action_id: number;
  is_new: boolean;
}

export interface AnimePageResponse {
  code: number;
  content: AnimeItem[];
  current_page: number;
  total_count: number;
  total_page_count: number;
}

export interface AnimeReleaseResponse {
  code: number;
  release: AnimeItem;
}

export type ProfileListStatus = 0 | 1 | 2 | 3 | 4 | 5;

export enum CommentSort {
  Newest = 1,
  Oldest = 2,
  Popular = 3,
}

export enum CommentVote {
  Dislike = 1,
  Like = 2,
}

export interface ProfileShort {
  id: number;
  login: string;
  avatar: string | null;
  is_banned: boolean;
  is_online: boolean;
  is_verified: boolean;
  is_sponsor: boolean;
}

export interface ReleaseComment {
  id: number;
  message: string;
  timestamp: number;
  type: number;
  vote: number;
  profile: ProfileShort;
  parent_comment_id: number;
  vote_count: number;
  likes_count: number;
  is_spoiler: boolean;
  is_edited: boolean;
  is_deleted: boolean;
  is_reply: boolean;
  reply_count: number;
  can_like: boolean;
}

export interface CommentPagedResponse {
  code: number;
  content: ReleaseComment[];
  current_page: number;
  total_count: number;
  total_page_count: number;
}
