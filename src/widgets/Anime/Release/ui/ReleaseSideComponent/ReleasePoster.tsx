import { AnimeItem } from "@entities/anime/types"

const ReleasePoster = ({anime}: {anime: AnimeItem}) => {
  return (
    <img className='rounded-lg h-full max-w-[35%] object-cover shadow-md shadow-black/30' src={anime.image} alt={anime.poster} />
  )
}

export default ReleasePoster