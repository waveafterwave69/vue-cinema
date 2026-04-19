import axios from 'axios'

export const moviesBaseApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'X-API-KEY': import.meta.env.VITE_API_KEY,
    },
})

export const moviesOldApi = axios.create({
    baseURL: import.meta.env.VITE_OLD_API_KEY,
    headers: {
        'X-API-KEY': import.meta.env.VITE_API_KEY,
    },
})
