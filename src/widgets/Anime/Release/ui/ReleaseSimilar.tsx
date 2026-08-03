import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { AnimeItem } from "@entities/anime/types";
import ReleaseCard from "./ReleaseCard";

const CARD_WIDTH = 176;
const CARD_GAP = 16;

const ReleaseSimilar = ({ anime }: { anime: AnimeItem }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const items = anime.recommended_releases;

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  if (!items.length) return null;

  const scrollByCards = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: dir * (CARD_WIDTH + CARD_GAP) * 3,
      behavior: "smooth",
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollerRef.current?.scrollBy({ left: e.deltaY });
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 text-xl font-bold text-text-secondary border-l-[3px] border-red pl-3">
        <Sparkles width={20} height={20} className="text-red" />
        Похожие релизы
        <span className="text-sm font-normal text-text-primary">{items.length}</span>
      </h2>

      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={updateArrows}
          onWheel={handleWheel}
          className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
        >
          {items.map((item) => (
            <ReleaseCard
              key={item.id}
              anime={item}
              className="w-44 shrink-0"
            />
          ))}
        </div>

        {canScrollLeft && (
          <button
            onClick={() => scrollByCards(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-color-primary border border-text-primary/30 flex items-center justify-center text-text-secondary hover:text-red hover:border-red/50 shadow-lg shadow-black/40 transition-colors"
            title="Назад"
          >
            <ChevronLeft width={20} height={20} />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scrollByCards(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-color-primary border border-text-primary/30 flex items-center justify-center text-text-secondary hover:text-red hover:border-red/50 shadow-lg shadow-black/40 transition-colors"
            title="Вперёд"
          >
            <ChevronRight width={20} height={20} />
          </button>
        )}
      </div>
    </section>
  );
};

export default ReleaseSimilar;
