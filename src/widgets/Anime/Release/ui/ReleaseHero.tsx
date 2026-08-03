import { AnimeItem } from "@entities/anime/types";
import formatAgeRating from "../lib/utils/formatAgeRating";
import { formatDate } from "@shared/lib/utils";
import { CalendarDays, Clock3, Flame, Play, Share2, Star } from "lucide-react";

const ReleaseHero = ({ anime }: { anime: AnimeItem }) => {
  const backdrop = anime.screenshot_images[0] || anime.image;

  return (
    <section className="relative overflow-hidden rounded-xl border border-text-primary/20">
      <div className="absolute inset-0">
        <img
          src={backdrop}
          alt=""
          className="w-full h-full object-cover blur-lg brightness-[0.35] scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-background-primary/60 to-transparent" />
      </div>

      <div className="relative z-10 flex gap-8 p-8">
        <img
          src={anime.image}
          alt={anime.title_ru}
          className="w-56 h-80 object-cover rounded-xl shadow-2xl shadow-black/60 ring-1 ring-white/10 shrink-0"
        />

        <div className="flex flex-col gap-3 justify-end min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-text-secondary text-black font-bold text-sm px-2 py-0.5 rounded-md">
              {formatAgeRating(anime)}
            </span>
            <span className="bg-color-primary/80 text-text-secondary text-sm px-2.5 py-0.5 rounded-md border border-text-primary/20">
              {anime.category.name}
            </span>
            <span className="bg-color-primary/80 text-text-secondary text-sm px-2.5 py-0.5 rounded-md border border-text-primary/20">
              {anime.status.name}
            </span>
            <span className="bg-color-primary/80 text-text-secondary text-sm px-2.5 py-0.5 rounded-md border border-text-primary/20">
              {anime.year}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-text-secondary leading-tight line-clamp-2">
            {anime.title_ru}
          </h1>
          <p className="text-text-primary text-lg line-clamp-1">{anime.title_alt}</p>
          <p className="text-text-primary italic text-sm line-clamp-1">{anime.title_original}</p>

          <div className="flex items-center gap-4 text-text-secondary text-sm mt-1">
            <span className="flex items-center gap-1.5">
              <CalendarDays width={16} height={16} />
              {formatDate(anime.aired_on_date)}
            </span>
            {anime.episodes_released ? (
              <span className="flex items-center gap-1.5">
                <Flame width={16} height={16} />
                {anime.episodes_released} из {anime.episodes_total || "?"} эп.
              </span>
            ) : null}
            {anime.duration ? (
              <span className="flex items-center gap-1.5">
                <Clock3 width={16} height={16} />
                ~{anime.duration} мин.
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <Star className="text-red fill-red" width={28} height={28} />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-text-secondary leading-none">
                  {anime.grade ? anime.grade.toFixed(1) : "—"}
                </span>
                <span className="text-text-primary text-xs">
                  {anime.vote_count} {anime.vote_count === 1 ? "голос" : anime.vote_count < 5 ? "голоса" : "голосов"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={anime.is_play_disabled}
                className="flex items-center gap-2 bg-red text-white font-bold py-2.5 px-6 rounded-lg hover:opacity-90 active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed"
                title="Плеер в разработке"
              >
                <Play width={20} height={20} fill="currentColor" />
                Смотреть
              </button>
              <button className="p-2.5 bg-color-primary/80 border border-text-primary/20 rounded-lg text-text-secondary hover:text-red hover:border-red/40 transition">
                <Share2 width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReleaseHero;
