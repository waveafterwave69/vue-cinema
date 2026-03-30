interface Country {
    country: string
}

interface Genre {
    genre: string
}

export type CollectionsType =
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

export interface Movie {
    countries: Country[]
    coverUrl: null | string
    description: string
    genres: Genre[]
    imdbId: null | number
    kinopoiskId: null | number
    logoUrl: null | string
    nameEn: null | string
    nameOriginal: string
    nameRu: string
    posterUrl: string
    posterUrlPreview: string
    ratingAgeLimits: null | string
    ratingImdb: number
    ratingKinopoisk: number
    type: string
    year: number
}
