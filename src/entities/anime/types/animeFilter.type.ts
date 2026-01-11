// src/entities/anime/types/animeFilters.ts
// Параметры фильтрации аниме для API /filter/0

export interface AnimeFilter {
  country: string | null;
  season: 'spring' | 'summer' | 'autumn' | 'winter' | null;
  sort: number;
  source: string | null;
  studio: string | null;
  age_ratings: string[];
  category_id: number | null;
  end_year: number | null;
  episode_duration_from: number | null;
  episode_duration_to: number | null;
  episodes_from: number | null;
  episodes_to: number | null;
  genres: number[] | string[];
  is_genres_exclude_mode_enabled: boolean;
  profile_list_exclusions: number[] | string[];
  start_year: number | null;
  status_id: number | null;
  types: number[];
}