import axios from "axios"
import { API_URLS } from "../../../shared/const"
import { AnimeFilterParams } from "../types";

const BASE_URL = import.meta.env.VITE_BASE_URL
const TOKEN = import.meta.env.VITE_TOKEN

interface GetFilteredAnimeParams {
  filters: AnimeFilterParams;
  page: number;
}

export const getFilteredAnime = async ({filters, page}: GetFilteredAnimeParams) => {
    const res = await axios.post(`${BASE_URL}${API_URLS.filters}/${page}`, filters, {
        params: {
            extended_mode: import.meta.env.VITE_EXTENDED_MODE,
            token: TOKEN,
        }
    })
    return res.data
}