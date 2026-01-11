import { AnimeFilter } from "./animeFilter.type";

export interface GetFilteredAnimeProps {
  filters: AnimeFilter;
  page: number;
}