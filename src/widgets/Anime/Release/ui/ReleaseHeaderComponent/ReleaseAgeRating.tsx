
import { AnimeItem } from '@entities/anime/types'
import formatAgeRating from '@widgets/Anime/Release/lib/utils/formatAgeRating'


const ReleaseAgeRating = ({anime}: {anime: AnimeItem}) => {
  return (
    <div className='flex items-center justify-center bg-text-secondary rounded-sm w-7 h-7'>
        <p className='text-black font-medium'>
        {formatAgeRating(anime)}
        </p>
    </div>
  )
}

export default ReleaseAgeRating