import { AnimeItem } from "@entities/anime/types";

const ReleaseDescription = ({ anime }: { anime: AnimeItem }) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-text-secondary border-l-[3px] border-red pl-3">
        Описание
      </h2>
      <p className="text-text-secondary/90 leading-relaxed whitespace-pre-line">
        {anime.description}
      </p>
      {anime.note ? (
        <p className="text-text-primary text-sm italic">Примечание: {anime.note}</p>
      ) : null}
    </section>
  );
};

export default ReleaseDescription;
