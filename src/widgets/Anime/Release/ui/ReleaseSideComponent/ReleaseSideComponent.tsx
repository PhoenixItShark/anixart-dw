import { AnimeItem } from "@entities/anime/types"
import ReleasePoster from "./ReleasePoster"

const ReleaseSideComponent = ({anime}: {anime: AnimeItem}) => {
  return (
      <ReleasePoster anime={anime}/>
  )
}

export default ReleaseSideComponent