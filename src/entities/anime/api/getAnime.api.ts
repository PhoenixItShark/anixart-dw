import { API_URLS } from "@shared/lib/const"
import axios from "axios"

import { AnimePageResponse, AnimeReleaseResponse, GetFilteredAnimeProps } from "../types"
const BASE_URL = import.meta.env.VITE_BASE_URL
const TOKEN = import.meta.env.VITE_TOKEN



export const getFilteredAnime = async ({filters, page}: GetFilteredAnimeProps): Promise<AnimePageResponse> => {
    const res = await axios.post(`${BASE_URL}${API_URLS.filters}/${page}`, filters, {
        params: {
            extended_mode: import.meta.env.VITE_EXTENDED_MODE,
            token: TOKEN,
        }
    })
    return res.data
}

export const getRelease = async (id: string): Promise<AnimeReleaseResponse> => {
    const res = await axios.get(`${BASE_URL}${API_URLS.release}/${id}`, {
        params: {
            extended_mode: import.meta.env.VITE_EXTENDED_MODE,
            token: TOKEN,
        },
    })
    return res.data
}