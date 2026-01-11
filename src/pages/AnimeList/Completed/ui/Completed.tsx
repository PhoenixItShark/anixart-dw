import { COMPLETED_FILTERS } from "@entities/anime/const"
import { AnimeList } from "@widgets/Anime/AnimeList"

const Completed = () => { 
  return (
    <section className='' >
      <AnimeList filters={COMPLETED_FILTERS}/>
    </section>
  )
}

export default Completed