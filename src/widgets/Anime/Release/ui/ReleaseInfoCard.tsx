import { AnimeItem } from "@entities/anime/types";
import { formatDate } from "@shared/lib/utils";
import ReactCountryFlag from "react-country-flag";
import {
  BookOpen,
  Building2,
  CalendarDays,
  Clapperboard,
  Eye,
  Heart,
  Languages,
  Users,
} from "lucide-react";

const COUNTRY_FLAGS: Record<string, string> = {
  "Япония": "JP",
  "Китай": "CN",
  "Корея": "KR",
  "Южная Корея": "KR",
  "США": "US",
  "Россия": "RU",
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-2.5 text-sm">
    <span className="text-text-primary shrink-0 mt-0.5">{icon}</span>
    <div className="min-w-0">
      <span className="text-text-primary">{label}: </span>
      <span className="text-text-secondary font-medium">{value}</span>
    </div>
  </div>
);

const CountStat = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center gap-0.5 bg-background-primary rounded-lg py-2.5 px-1 flex-1">
    <span className="text-lg font-bold text-text-secondary">{value}</span>
    <span className="text-xs text-text-primary text-center leading-tight">{label}</span>
  </div>
);

const ReleaseInfoCard = ({ anime }: { anime: AnimeItem }) => {
  const flag = COUNTRY_FLAGS[anime.country] || null;

  return (
    <aside className="flex flex-col gap-6 bg-color-primary rounded-xl border border-text-primary/20 p-5 sticky top-4">
      <div className="flex flex-col gap-4">
        <InfoRow
          icon={<BookOpen width={18} height={18} />}
          label="Первоисточник"
          value={anime.source || "—"}
        />
        <InfoRow
          icon={<Building2 width={18} height={18} />}
          label="Студия"
          value={anime.studio || "—"}
        />
        <InfoRow
          icon={<Clapperboard width={18} height={18} />}
          label="Режиссёр"
          value={anime.director || "—"}
        />
        {anime.author ? (
          <InfoRow
            icon={<Users width={18} height={18} />}
            label="Автор"
            value={anime.author}
          />
        ) : null}
        {anime.translators ? (
          <InfoRow
            icon={<Languages width={18} height={18} />}
            label="Озвучка"
            value={anime.translators}
          />
        ) : null}
        <InfoRow
          icon={<CalendarDays width={18} height={18} />}
          label="Дата выхода"
          value={
            <span className="inline-flex items-center gap-1.5">
              {flag ? (
                <ReactCountryFlag
                  countryCode={flag}
                  svg
                  style={{ width: "18px", height: "14px", borderRadius: "3px" }}
                />
              ) : null}
              {anime.country} · {formatDate(anime.aired_on_date)}
            </span>
          }
        />
      </div>

      <div className="flex flex-col gap-2 border-t border-text-primary/15 pt-5">
        <span className="text-sm text-text-primary">Жанры</span>
        <div className="flex flex-wrap gap-1.5">
          {anime.genres.split(",").filter(Boolean).map((genre) => (
            <span
              key={genre}
              className="text-xs text-text-secondary bg-background-primary border border-text-primary/20 rounded-md px-2 py-1"
            >
              {genre.trim()}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 border-t border-text-primary/15 pt-5">
        <CountStat value={anime.watching_count} label="Смотрят" />
        <CountStat value={anime.favorites_count} label="В избранном" />
        <CountStat value={anime.comments_count} label="Комментарии" />
      </div>
      <div className="flex gap-2">
        <CountStat value={anime.plan_count} label="В планах" />
        <CountStat value={anime.completed_count} label="Просмотрено" />
        <CountStat value={anime.collection_count} label="В коллекциях" />
      </div>

      <div className="flex items-center justify-between border-t border-text-primary/15 pt-5 text-xs text-text-primary">
        <span className="flex items-center gap-1">
          <Eye width={14} height={14} />
          {anime.comment_per_day_count} комм./день
        </span>
        <span className="flex items-center gap-1">
          <Heart width={14} height={14} />
          {anime.related_count} связанных
        </span>
      </div>
    </aside>
  );
};

export default ReleaseInfoCard;
