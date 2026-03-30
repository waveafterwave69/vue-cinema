interface Country {
    country: string
}

interface Genre {
    genre: string
}

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
