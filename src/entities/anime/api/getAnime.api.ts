import { apiClient } from "@shared/api/client";
import { API_URLS } from "@shared/lib/const";
import { AnimePageResponse, AnimeReleaseResponse, GetFilteredAnimeProps } from "@entities/anime/types";

export const getFilteredAnime = async ({filters, page}: GetFilteredAnimeProps): Promise<AnimePageResponse> => {
    const res = await apiClient.post(`${API_URLS.filters}/${page}`, filters, {
        params: {
            extended_mode: import.meta.env.VITE_EXTENDED_MODE,
        }
    })
    return res.data
}

export const getRelease = async (id: string): Promise<AnimeReleaseResponse> => {
    const res = await apiClient.get(`${API_URLS.release}/${id}`, {
        params: {
            extended_mode: import.meta.env.VITE_EXTENDED_MODE,
        },
    })
    return res.data
}
