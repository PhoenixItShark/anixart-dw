
import { AnimeItem } from "@entities/anime/types"
import ReleaseAgeRating from "./ReleaseAgeRating"

const ReleaseOriginalName = ({anime}: {anime: AnimeItem}) => {
  return (
    <div className='flex gap-2'>
    <h3 className='text-text-secondary font-medium'>{anime.title_original}</h3>
    <ReleaseAgeRating anime={anime}/>
    </div>
  )
}

export default ReleaseOriginalName