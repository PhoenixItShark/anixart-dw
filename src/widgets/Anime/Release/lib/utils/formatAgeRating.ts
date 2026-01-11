// src/shared/lib/utils/formatAgeRating.ts

import { AnimeItem } from "@entities/anime/types";

 const formatAgeRating = (anime: AnimeItem): string => {
  switch (anime.age_rating) {
    case 5: return "18+";
    case 4: return "16+";
    case 3: return "12+";
    case 2: return "6+";
    case 1: return "0+";
    default: return "?";
  }
};
export default formatAgeRating