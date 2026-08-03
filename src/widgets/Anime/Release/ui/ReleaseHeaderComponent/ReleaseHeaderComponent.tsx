import { AnimeItem } from "@entities/anime/types";
import ReleaseOriginalName from "./ReleaseOriginalName";
import ReleaseName from "./ReleaseName";

const ReleaseHeader = ({ anime }: { anime: AnimeItem }) => {
  return (
    <section className=''>
      <div className="flex flex-col gap-3 shadow-sm shadow-black/30 rounded-md p-2">
        <ReleaseName anime={anime} />
        <ReleaseOriginalName anime={anime} />
      </div>
    </section>
  );
};

export default ReleaseHeader;
