import { AnimeItem } from "@entities/anime/types"
import { formatDate } from "@shared/lib/utils"

const FormatEpisodes = ({anime}: {anime: AnimeItem}) => {
    return (
        <>
            {anime.episodes_released
                  ? `${anime.episodes_released} из ${
                      anime.episodes_total || "?"
                    } эп`
                  : formatDate(anime.aired_on_date)}
        </>
    )
}
export default FormatEpisodes