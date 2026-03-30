import type { CollectionsType } from '@/types/movies'
import { moviesBaseApi } from './baseApi'

export const moviesApi = {
    async getMoviesCategory(collectionType: CollectionsType, page: number) {
        const response = await moviesBaseApi.get(`/collections?type=${collectionType}&page=${page}`)
        return response.data
    },
}
