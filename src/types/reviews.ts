export interface Review {
    author: string
    date: string
    description: string
    kinopoiskId: number
    negativeRating: number
    positiveRating: number
    title: string
    type: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'
}
