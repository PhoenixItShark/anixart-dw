import { AnimeItem } from "@entities/anime/types";
import { formatDate } from "@shared/lib/utils";
import { Clapperboard, FileClock } from "lucide-react";

const ReleaseEpisodes = ({ anime }: { anime: AnimeItem }) => {
  const lastUpdate = anime.episode_last_update;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-bold text-text-secondary">Серии</h2>

      <div className="flex items-center gap-4 bg-color-primary rounded-xl border border-text-primary/20 p-5">
        <div className="flex items-center gap-3">
          <Clapperboard className="text-red" width={32} height={32} />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-text-secondary leading-none">
              {anime.episodes_released}
              <span className="text-text-primary text-lg font-normal">
                {" "}/ {anime.episodes_total || "?"}
              </span>
            </span>
            <span className="text-xs text-text-primary mt-1">серий вышло</span>
          </div>
        </div>

        {lastUpdate ? (
          <div className="flex items-center gap-2 text-sm text-text-secondary ml-auto">
            <FileClock width={16} height={16} className="text-text-primary" />
            <span className="text-text-primary">Последнее обновление:</span>
            <span className="font-medium">{lastUpdate.last_episode_update_name}</span>
            <span className="text-text-primary">
              · {formatDate(lastUpdate.last_episode_update_date)}
            </span>
          </div>
        ) : null}
      </div>

      {anime.last_view_episode ? (
        <p className="text-sm text-text-primary">
          Продолжить с {anime.last_view_episode.position} серии
        </p>
      ) : null}
    </section>
  );
};

export default ReleaseEpisodes;
