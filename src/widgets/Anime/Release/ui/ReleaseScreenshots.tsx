import { useCallback, useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Images,
  ImageOff,
  X,
} from "lucide-react";
import { AnimeItem } from "@entities/anime/types";
import { cn } from "@shared/lib/utils";

const PREVIEW_COUNT = 5;

const ReleaseScreenshots = ({ anime }: { anime: AnimeItem }) => {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = anime.screenshot_images.length ? anime.screenshot_images : anime.screenshots;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, closeLightbox, prev, next]);

  if (!images.length) return null;

  const visible = expanded ? images : images.slice(0, PREVIEW_COUNT);
  const hiddenCount = images.length - PREVIEW_COUNT;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 text-xl font-bold text-text-secondary border-l-[3px] border-red pl-3">
        <Images width={20} height={20} className="text-red" />
        Кадры
        <span className="text-sm font-normal text-text-primary">{images.length}</span>
      </h2>
      <div className="grid grid-cols-5 gap-3">
        {visible.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-video overflow-hidden rounded-lg border border-text-primary/30 bg-color-primary cursor-zoom-in"
            title="Открыть в галерее"
          >
            <img
              src={src}
              alt={`Кадр ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            {!src && (
              <span className="absolute inset-0 flex items-center justify-center text-text-primary">
                <ImageOff width={24} height={24} />
              </span>
            )}
          </button>
        ))}
      </div>

      {hiddenCount > 0 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            "flex items-center justify-center gap-2 mx-auto text-sm font-semibold rounded-lg px-5 py-2 transition-colors",
            expanded
              ? "text-text-secondary border border-text-primary/30 hover:border-red/50 hover:text-red"
              : "bg-red text-white hover:opacity-90"
          )}
        >
          {expanded ? (
            <>
              <ChevronUp width={16} height={16} />
              Свернуть
            </>
          ) : (
            <>
              <ChevronDown width={16} height={16} />
              Показать все кадры ({hiddenCount})
            </>
          )}
        </button>
      )}

      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="Закрыть (Esc)"
          >
            <X width={22} height={22} />
          </button>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="Предыдущий кадр (←)"
          >
            <ChevronLeft width={24} height={24} />
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="Следующий кадр (→)"
          >
            <ChevronRight width={24} height={24} />
          </button>

          <img
            src={images[lightboxIndex]}
            alt={`Кадр ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl select-none"
            draggable={false}
          />

          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-semibold text-white/90 bg-black/50 rounded-full px-4 py-1.5">
            {lightboxIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </section>
  );
};

export default ReleaseScreenshots;
