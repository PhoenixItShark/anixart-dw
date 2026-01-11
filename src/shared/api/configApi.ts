import axios from "axios"
import { API_URLS } from "../lib/const"

const BASE_URL = import.meta.env.VITE_BASE_URL
const TOKEN = import.meta.env.VITE_TOKEN



export const getUrls = async () => {  
    const res = await axios.get(`${BASE_URL}${API_URLS.config}/urls`, {
        params: {
            version_code: import.meta.env.VITE_VERSION_CODE,
            is_beta: import.meta.env.VITE_IS_BETA,
            token: TOKEN,
        }
    })
    return res.data
}

export const getPageUrls = async () => {  
    const res = await axios.get(`${BASE_URL}${API_URLS.pages}/urls.json`, {
    })
    return res.data
}

export const getToggles = async () => {  
    const res = await axios.get(`${BASE_URL}${API_URLS.config}/toggles`, {
        params: {
            version_code: import.meta.env.VITE_VERSION_CODE,
            is_beta: import.meta.env.VITE_IS_BETA,
            is_api_alt: import.meta.env.VITE_IS_API_ALT,
            token: TOKEN,
        }
    })
    return res.data
}
