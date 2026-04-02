import type { CollectionsType } from '@/types/movies'
import { moviesBaseApi } from './baseApi'

export const moviesApi = {
    async getMoviesCategory(collectionType: CollectionsType, page: number) {
        const response = await moviesBaseApi.get(`/collections?type=${collectionType}&page=${page}`)
        return response.data
    },

    async getMovieInfo(movieId: string) {
        const response = await moviesBaseApi.get(`/${movieId}`)
        return response.data
    },

    async getMovieImages(movieId: string) {
        const response = await moviesBaseApi.get(`/${movieId}/images?type=STILL&page=1`)
        return response.data
    },
}
