import { apiClient } from "./client"
import { API_URLS } from "@shared/lib/const"

export const getUrls = async () => {  
    const res = await apiClient.get(`${API_URLS.config}/urls`, {
        params: {
            version_code: import.meta.env.VITE_VERSION_CODE,
            is_beta: import.meta.env.VITE_IS_BETA,
        }
    })
    return res.data
}

export const getPageUrls = async () => {  
    const res = await apiClient.get(`${API_URLS.pages}/urls.json`)
    return res.data
}

export const getToggles = async () => {  
    const res = await apiClient.get(`${API_URLS.config}/toggles`, {
        params: {
            version_code: import.meta.env.VITE_VERSION_CODE,
            is_beta: import.meta.env.VITE_IS_BETA,
            is_api_alt: import.meta.env.VITE_IS_API_ALT,
        }
    })
    return res.data
}
