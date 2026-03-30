import axios from 'axios'

export const moviesBaseApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'X-API-KEY': import.meta.env.VITE_API_KEY,
    },
})
