import { moviesBaseApi } from './baseApi'

type CollectionsType =
    | 'TOP_POPULAR_ALL'
    | 'TOP_POPULAR_MOVIES'
    | 'TOP_250_TV_SHOWS'
    | 'TOP_250_MOVIES'
    | 'VAMPIRE_THEME'
    | 'COMICS_THEME'
    | 'CLOSES_RELEASES'
    | 'FAMILY'
    | 'OSKAR_WINNERS_2021'
    | 'LOVE_THEME'
    | 'ZOMBIE_THEME'
    | 'CATASTROPHE_THEME'
    | 'KIDS_ANIMATION_THEME'
    | 'POPULAR_SERIES'

export const moviesApi = {
    async getMoviesCategory(collectionType: CollectionsType, page: number) {
        const response = await moviesBaseApi.get(`/collections?type=${collectionType}&page=${page}`)
        return response.data
    },
}
