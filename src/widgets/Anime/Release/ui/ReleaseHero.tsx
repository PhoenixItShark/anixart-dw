import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Check,
  Clock3,
  Flame,
  Heart,
  Play,
  Share2,
} from "lucide-react";
import { AnimeItem } from "@entities/anime/types";
import { useToggleFavorite } from "@entities/anime/model";
import { useUserStore } from "@entities/User";
import { cn, formatDate } from "@shared/lib/utils";
import formatAgeRating from "../lib/utils/formatAgeRating";
import ReleaseVote from "./ReleaseVote";
import ReleaseStatusSelect from "./ReleaseStatusSelect";

const ReleaseHero = ({ anime }: { anime: AnimeItem }) => {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const backdrop = anime.screenshot_images[0] || anime.image;
  const favoriteMutation = useToggleFavorite(String(anime.id), anime.is_favorite);

  const requireAuth = () => navigate("/auth");

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const voteCounts: [number, number, number, number, number] = [
    anime.vote_1_count,
    anime.vote_2_count,
    anime.vote_3_count,
    anime.vote_4_count,
    anime.vote_5_count,
  ];

  return (
    <section className="relative rounded-xl">
      <div className="absolute inset-0 overflow-hidden rounded-xl">
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

          <div className="flex items-center gap-6 mt-2 flex-wrap">
            <ReleaseVote
              releaseId={String(anime.id)}
              grade={anime.grade}
              voteCount={anime.vote_count}
              yourVote={anime.your_vote}
              voteCounts={voteCounts}
              isAuthenticated={isAuthenticated}
              onRequireAuth={requireAuth}
            />
          </div>

          <div className="flex items-center gap-2.5 mt-2">
            <button
              disabled={anime.is_play_disabled}
              className="flex items-center gap-2 bg-red text-white font-bold py-2.5 px-6 rounded-lg hover:opacity-90 active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed"
              title="Плеер в разработке"
            >
              <Play width={20} height={20} fill="currentColor" />
              Смотреть
            </button>

            <ReleaseStatusSelect
              releaseId={String(anime.id)}
              currentStatus={anime.profile_list_status}
              isAuthenticated={isAuthenticated}
              onRequireAuth={requireAuth}
            />

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  requireAuth();
                  return;
                }
                favoriteMutation.mutate();
              }}
              disabled={favoriteMutation.isPending}
              className={cn(
                "flex items-center gap-2 py-2.5 px-4 rounded-lg border text-sm font-semibold transition active:scale-[0.98] disabled:opacity-50",
                anime.is_favorite
                  ? "bg-red/15 border-red/50 text-red hover:bg-red/25"
                  : "bg-color-primary/80 border-text-primary/20 text-text-secondary hover:border-red/40 hover:text-red"
              )}
              title={
                anime.is_favorite ? "Убрать из избранного" : "Добавить в избранное"
              }
            >
              {anime.is_favorite ? (
                <Heart width={18} height={18} fill="currentColor" />
              ) : (
                <Heart width={18} height={18} />
              )}
              {anime.is_favorite ? "В избранном" : "В избранное"}
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 bg-color-primary/80 border border-text-primary/20 rounded-lg text-text-secondary hover:text-red hover:border-red/40 transition"
              title="Скопировать ссылку"
            >
              {copied ? (
                <Check width={20} height={20} className="text-green-500" />
              ) : (
                <Share2 width={20} height={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReleaseHero;
