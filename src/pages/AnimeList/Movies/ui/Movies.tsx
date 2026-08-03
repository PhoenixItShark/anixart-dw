import { MOVIES_FILTERS } from "@entities/anime/const"
import { AnimeList } from "@widgets/Anime/AnimeList"

const Movies = () => { 
  return (
    <section className='' >
      <AnimeList filters={MOVIES_FILTERS}/>
    </section>
  )
}

export default Movies