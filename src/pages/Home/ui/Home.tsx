import { DEFAULT_FILTERS } from "@entities/anime/const"
import { AnimeList } from "@widgets/Anime/AnimeList"

const Home = () => { 
  return (
    <section className='' >
      <AnimeList filters={DEFAULT_FILTERS}/>
    </section>
  )
}

export default Home