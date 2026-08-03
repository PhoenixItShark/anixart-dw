import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Expand,
  Link2,
  Loader2,
  X,
} from "lucide-react";
import { AnimeItem } from "@entities/anime/types";
import { useRelatedReleases } from "@entities/anime/model";
import ReleaseCard from "./ReleaseCard";

const RelatedModal = ({
  open,
  onClose,
  items,
  total,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  isPending,
}: {
  open: boolean;
  onClose: () => void;
  items: AnimeItem[];
  total: number;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isPending: boolean;
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-background-primary border border-text-primary/30 rounded-2xl w-full max-w-5xl max-h-[85vh] flex flex-col shadow-2xl shadow-black/50">
        <header className="flex items-center justify-between px-6 py-4 border-b border-text-primary/20 shrink-0">
          <h3 className="flex items-center gap-2 text-lg font-bold text-text-secondary">
            <Link2 width={18} height={18} className="text-red" />
            Связанные релизы
            <span className="text-sm font-normal text-text-primary">{total}</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-primary hover:text-red hover:bg-color-primary transition-colors"
            title="Закрыть (Esc)"
          >
            <X width={20} height={20} />
          </button>
        </header>

        <div className="overflow-y-auto p-6">
          {isPending && !items.length ? (
            <div className="flex justify-center py-16">
              <Loader2 width={32} height={32} className="animate-spin text-red" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.map((item) => (
                <ReleaseCard key={item.id} anime={item} />
              ))}
            </div>
          )}
          {hasNextPage && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="flex items-center gap-2 text-sm font-semibold text-text-secondary border border-text-primary/30 rounded-lg px-5 py-2.5 hover:border-red/50 hover:text-red transition-colors disabled:opacity-50"
              >
                {isFetchingNextPage ? (
                  <Loader2 width={16} height={16} className="animate-spin" />
                ) : null}
                Показать ещё
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReleaseRelated = ({ anime }: { anime: AnimeItem }) => {
  const [open, setOpen] = useState(false);
  const franchiseId = anime.related?.id ?? null;
  const relatedQuery = useRelatedReleases(franchiseId, true);

  const related = anime.related_releases;
  const apiTotal = relatedQuery.data?.pages[0]?.total_count ?? 0;
  const total = Math.max(apiTotal, anime.related_count, related.length);
  if (total === 0) return null;

  const apiItems = relatedQuery.data?.pages.flatMap((p) => p.content) ?? [];
  const items = apiItems.length ? apiItems : related;
  const preview = related.length ? related : items;
  const hasMore = total > preview.length || relatedQuery.hasNextPage;

  return (
    <>
      <section className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2 text-xl font-bold text-text-secondary border-l-[3px] border-red pl-3">
          <Link2 width={20} height={20} className="text-red" />
          Связанные релизы
          <span className="text-sm font-normal text-text-primary">{total}</span>
        </h2>

        <div className="flex flex-col gap-2">
          {preview.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              to={`/release/${item.id}`}
              className="group flex items-center gap-3 bg-color-primary border border-text-primary/25 rounded-lg p-2 hover:border-red/50 hover:bg-color-primary/80 transition-colors"
            >
              <img
                src={item.image}
                alt={item.title_ru}
                loading="lazy"
                className="w-10 h-14 object-cover rounded-md shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-text-secondary truncate group-hover:text-red transition-colors">
                  {item.title_ru}
                </div>
                <div className="text-xs text-text-primary truncate">
                  {item.category.name} · {item.status.name}
                  {item.episodes_released ? ` · ${item.episodes_released} эп.` : ""}
                </div>
              </div>
              <ChevronRight
                width={16}
                height={16}
                className="text-text-primary shrink-0 group-hover:text-red transition-colors"
              />
            </Link>
          ))}
        </div>

        {hasMore && (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-red rounded-lg px-5 py-2.5 hover:opacity-90 transition-opacity"
          >
            <Expand width={15} height={15} />
            Показать все связанные ({total})
          </button>
        )}
      </section>

      <RelatedModal
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        total={total}
        hasNextPage={relatedQuery.hasNextPage}
        fetchNextPage={relatedQuery.fetchNextPage}
        isFetchingNextPage={relatedQuery.isFetchingNextPage}
        isPending={relatedQuery.isPending}
      />
    </>
  );
};

export default ReleaseRelated;
