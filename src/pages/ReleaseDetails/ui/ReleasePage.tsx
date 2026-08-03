import {
  ReleaseHero,
  ReleaseDescription,
  ReleaseInfoCard,
  ReleaseEpisodes,
  ReleaseScreenshots,
  ReleaseRelated,
} from "@widgets/Anime/Release";
import { Navigate, useParams } from "react-router-dom";
import { useGetRelease } from "@entities/anime/model";

const ReleasePage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetRelease(id ?? "");

  if (!id) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-96 bg-color-primary rounded-xl" />
        <div className="flex gap-6">
          <div className="flex-1 flex flex-col gap-6">
            <div className="h-40 bg-color-primary rounded-xl" />
            <div className="h-24 bg-color-primary rounded-xl" />
          </div>
          <div className="w-80 h-96 bg-color-primary rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !data) return <div>Ошибка загрузки</div>;

  const anime = data.release;

  return (
    <section className="flex flex-col gap-6">
      <ReleaseHero anime={anime} />

      <div className="flex gap-6 items-start">
        <div className="flex-1 flex flex-col gap-8 min-w-0">
          <ReleaseDescription anime={anime} />
          <ReleaseEpisodes anime={anime} />
          <ReleaseScreenshots anime={anime} />
          <ReleaseRelated anime={anime} />
        </div>
        <ReleaseInfoCard anime={anime} />
      </div>
    </section>
  );
};

export default ReleasePage;
