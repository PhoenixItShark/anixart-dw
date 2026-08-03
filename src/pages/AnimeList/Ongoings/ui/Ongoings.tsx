import { ONGOING_FILTERS } from "@entities/anime/const"
import { AnimeList } from "@widgets/Anime/AnimeList"

const Ongoings = () => { 
  return (
    <section className='' >
      <AnimeList filters={ONGOING_FILTERS}/>
    </section>
  )
}

export default Ongoings