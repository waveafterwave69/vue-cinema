import type { CollectionsType } from '@/types/movies'
import { moviesBaseApi, moviesOldApi } from './baseApi'

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

    async getMovieFacts(movieId: string) {
        const response = await moviesBaseApi.get(`/${movieId}/facts`)
        return response.data.items
    },

    async getMovieBoxOffice(movieId: string) {
        const response = await moviesBaseApi.get(`/${movieId}/box_office`)
        return response.data
    },

    async getMovieAwards(movieId: string) {
        const response = await moviesBaseApi.get(`/${movieId}/awards`)
        return response.data
    },

    async getMovieVideos(movieId: string) {
        const response = await moviesBaseApi.get(`/${movieId}/videos`)
        return response.data
    },

    async getMovieSimilars(movieId: string) {
        const response = await moviesBaseApi.get(`/${movieId}/similars`)
        return response.data
    },

    async getMovieRelations(movieId: string) {
        const response = await moviesBaseApi.get(`/${movieId}/relations`)
        return response.data
    },

    async getMovieReviews(movieId: string) {
        const response = await moviesBaseApi.get(`/${movieId}/reviews`)
        return response.data
    },

    async getMovieOtherSource(movieId: string) {
        const response = await moviesBaseApi.get(`/${movieId}/external_sources`)
        return response.data.items
    },

    async getMovieSequelsPrequels(movieId: string) {
        const response = await moviesBaseApi.get(`/${movieId}/sequels_and_prequels`)
        return response.data
    },

    async getMovieActors(movieId: string) {
        const response = await moviesOldApi.get(`/staff?filmId=${movieId}`)
        return response.data
    },
}
