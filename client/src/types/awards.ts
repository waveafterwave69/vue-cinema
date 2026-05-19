import type { Actor } from './actors'

export interface Awards {
    imageUrl: string
    name: string
    nominationName: string
    persons: Actor[]
    win: boolean
    year: number
}
