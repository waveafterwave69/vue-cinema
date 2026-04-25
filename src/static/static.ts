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
        name: 'популярное',
        type: 'TOP_POPULAR_ALL',
    },

    {
        id: 2,
        name: 'любовь',
        type: 'LOVE_THEME',
    },
    {
        id: 3,
        name: 'катастрофа',
        type: 'CATASTROPHE_THEME',
    },
    {
        id: 4,
        name: 'зомби',
        type: 'ZOMBIE_THEME',
    },
    {
        id: 5,
        name: 'вампиры',
        type: 'VAMPIRE_THEME',
    },
    {
        id: 6,
        name: 'для семьи',
        type: 'FAMILY',
    },
    {
        id: 7,
        name: 'комиксы',
        type: 'COMICS_THEME',
    },
    {
        id: 8,
        name: 'для детей',
        type: 'KIDS_ANIMATION_THEME',
    },
]
