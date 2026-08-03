import { Link } from "react-router-dom";
import useSharedStore from "@shared/storage/useSharedStore";
import { AnimeItem } from "@entities/anime/types";
import { FormatEpisodes } from "../../lib/utils";
import { Star } from "lucide-react";
import { Suspense } from "react";


type Props = {
  anime: AnimeItem;
};

const AnimeCard = ({ anime }: Props) => {
  const saveCurrentScroll = useSharedStore((state) => state.saveCurrentScroll);

  return (
    <>
      <Link
        className='p-1 flex flex-col select-none group hover:bg-text-primary rounded-md hover:scale-105 transition-all duration-150 ease-in-out'
        to={`/release/${anime.id}`}
        onClick={saveCurrentScroll}
      >
        <li className='w-full flex flex-col flex-1' >
          <div className='flex flex-col flex-1'>
            <Suspense>
            <img
              src={anime.image}
              alt={anime.title_ru}
              className='w-full h-100 object-cover mb-3 rounded-md'
            />
            </Suspense>
            <h3 className='text-ellipsis overflow-hidden line-clamp-2 text-text-secondary font-bold text-lg'>{anime.title_ru}</h3>

            <div className='flex items-center justify-start pt-1 mt-auto'>
              <span className='text-text-secondary font-bold'>
                <FormatEpisodes anime={anime}/>
              </span>
              {anime.episodes_released ? (
                <i className=' inline-block w-1.5 h-1.5 rounded-full text-text-secondary' />
              ) : null}
              <span className='text-text-secondary ml-1 font-bold'>
                {anime.episodes_released ? anime.grade.toFixed(1) : ""}
              </span>
              {anime?.episodes_released ? (
                <Star className="text-text-secondary ml-1.5" width={22} height={22} />
              ) : null}
            </div>
          </div>
        </li>
      </Link>
    </>
  );
};

export default AnimeCard;