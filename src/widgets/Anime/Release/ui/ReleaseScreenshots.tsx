import { AnimeItem } from "@entities/anime/types";
import { ImageOff } from "lucide-react";

const ReleaseScreenshots = ({ anime }: { anime: AnimeItem }) => {
  const images = anime.screenshot_images.length ? anime.screenshot_images : anime.screenshots;

  if (!images.length) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-text-secondary">Кадры</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.slice(0, 9).map((src, i) => (
          <a
            key={i}
            href={src}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-video overflow-hidden rounded-lg border border-text-primary/20 bg-color-primary"
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
          </a>
        ))}
      </div>
    </section>
  );
};

export default ReleaseScreenshots;
