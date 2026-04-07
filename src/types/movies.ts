export interface Country {
    country: string
}

export interface Genre {
    genre: string
}

interface MovieBase {
    kinopoiskId: string
    imdbId: string | null
    nameRu: string
    nameEn: string | null
    nameOriginal: string | null
    posterUrl: string
    posterUrlPreview: string
    coverUrl: string | null
    logoUrl: string | null
    ratingKinopoisk: number | null
    ratingImdb: number | null
    year: number | null
    type: 'FILM' | 'VIDEO' | 'TV_SERIES' | 'TV_SHOW' | 'MINI_SERIES'
    countries: Country[]
    genres: Genre[]
}

export interface Movie extends MovieBase {
    description: string
    ratingAgeLimits: string | null
}

export interface MovieFullInfo extends MovieBase {
    kinopoiskHDId: string | null
    reviewsCount: number
    ratingGoodReview: number | null
    ratingGoodReviewVoteCount: number | null
    ratingKinopoiskVoteCount: number | null
    ratingImdbVoteCount: number | null
    ratingFilmCritics: number | null
    ratingFilmCriticsVoteCount: number | null
    ratingAwait: number | null
    ratingAwaitCount: number | null
    ratingRfCritics: number | null
    ratingRfCriticsVoteCount: number | null
    webUrl: string
    filmLength: number | null
    slogan: string | null
    description: string | null
    shortDescription: string | null
    editorAnnotation: string | null
    isTicketsAvailable: boolean
    productionStatus: string | null
    ratingMpaa: string | null
    ratingAgeLimits: string | null
    startYear: number | null
    endYear: number | null
    serial: boolean
    shortFilm: boolean
    completed: boolean
    hasImax: boolean
    has3D: boolean
    lastSync: string
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
