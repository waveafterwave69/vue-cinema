import type { Movie } from './movies'

export interface Actor {
    description: string | null
    nameEn: string
    nameRu: string
    posterUrl: string
    professionKey: string
    professionText: string
    staffId: number
    kinopoiskId?: number
    birthplace?: string
    age?: number
    films?: Movie[]
    facts: string[]
    profession: string
}
