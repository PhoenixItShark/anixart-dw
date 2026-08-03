
import { AnimeItem } from "@entities/anime/types"
import ReleaseNamesInfo from "./ReleaseNamesInfo"



const ReleaseName = ({anime}: {anime: AnimeItem}) => {
  return (
    <div className='flex gap-2 items-center'>
      <h1 className='text-text-secondary text-lg font-bold'>{anime.title_ru}</h1>
      <ReleaseNamesInfo anime={anime}/>
    </div>
  )
}

export default ReleaseName