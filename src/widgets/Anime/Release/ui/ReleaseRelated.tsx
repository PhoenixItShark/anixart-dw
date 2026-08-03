import { Link } from "react-router-dom";
import { AnimeItem } from "@entities/anime/types";

const RelatedCard = ({ anime }: { anime: AnimeItem }) => (
  <Link
    to={`/release/${anime.id}`}
    className="group flex flex-col gap-2 bg-color-primary rounded-lg border border-text-primary/20 overflow-hidden hover:border-red/40 hover:scale-[1.02] transition-all duration-150"
  >
    <div className="aspect-[3/4] overflow-hidden bg-background-primary">
      <img
        src={anime.image}
        alt={anime.title_ru}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
    </div>
    <div className="flex flex-col gap-1 px-2.5 pb-2.5">
      <span className="text-sm font-medium text-text-secondary line-clamp-2">
        {anime.title_ru}
      </span>
      <span className="text-xs text-text-primary">
        {anime.status.name}
        {anime.episodes_released ? ` · ${anime.episodes_released} эп.` : ""}
      </span>
    </div>
  </Link>
);

const ReleaseRelated = ({ anime }: { anime: AnimeItem }) => {
  const related = anime.related_releases.length
    ? anime.related_releases
    : anime.recommended_releases;

  if (!related.length) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-text-secondary">Похожие релизы</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {related.slice(0, 10).map((item) => (
          <RelatedCard key={item.id} anime={item} />
        ))}
      </div>
    </section>
  );
};

export default ReleaseRelated;
