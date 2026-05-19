import type { CollectionsType } from '@/types/movies'

interface SearchCollection {
    name: string
    id: number
    type: CollectionsType
}

export const collections: CollectionsType[] = [
    'TOP_POPULAR_ALL',
    'TOP_POPULAR_MOVIES',
    'POPULAR_SERIES',
]

export const searchCollection: SearchCollection[] = [
    {
        id: 1,
        name: 'лучшее',
        type: 'TOP_250_MOVIES',
    },
    {
        id: 2,
        name: 'популярное',
        type: 'TOP_POPULAR_ALL',
    },

    {
        id: 3,
        name: 'любовь',
        type: 'LOVE_THEME',
    },
    {
        id: 4,
        name: 'катастрофа',
        type: 'CATASTROPHE_THEME',
    },
    {
        id: 5,
        name: 'зомби',
        type: 'ZOMBIE_THEME',
    },
    {
        id: 6,
        name: 'вампиры',
        type: 'VAMPIRE_THEME',
    },
    {
        id: 7,
        name: 'для семьи',
        type: 'FAMILY',
    },
    {
        id: 8,
        name: 'комиксы',
        type: 'COMICS_THEME',
    },
    {
        id: 9,
        name: 'для детей',
        type: 'KIDS_ANIMATION_THEME',
    },
]
