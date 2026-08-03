import AnimeList from '@widgets/Anime/AnimeList/ui/AnimeList/AnimeList'
import { ANNOUNCEMENTS_FILTERS } from '@entities/anime/const/filters.const'

const Announcements = () => { 
  return (
    <section className='' >
      <AnimeList filters={ANNOUNCEMENTS_FILTERS}/>
    </section>
  )
}

export default Announcements