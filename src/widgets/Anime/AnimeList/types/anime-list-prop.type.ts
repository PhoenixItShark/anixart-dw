import { AnimeFilter } from "@entities/anime/types";

export interface AnimeListProp {
  filters: AnimeFilter;
  page: number;
}