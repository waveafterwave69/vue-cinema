import { moviesApi } from '@/services/movies'
import { collections } from '@/static/static'
import type { Movie } from '@/types/movies'
import { ref } from 'vue'
import { useRandomNumber } from 'wave-hooks'

export const useGetRandomMovie = () => {
    const movie = ref<Movie>()
    const error = ref<string | null>(null)

    const { randomNumber: page, refresh: refreshPage } = useRandomNumber(1, 35)
    const { randomNumber: itemIndex, refresh: refreshItemIndex } = useRandomNumber(0, 19)
    const { randomNumber: collectionIndex, refresh: refreshCollectionIndex } = useRandomNumber(
        0,
        collections.length - 1,
    )

    const getMovies = async () => {
        try {
            refreshPage()
            refreshItemIndex()
            refreshCollectionIndex()

            const movieData = await moviesApi.getMoviesCategory(
                collections[collectionIndex.value]!,
                page.value,
            )

            if (movieData.items && movieData.items[itemIndex.value]) {
                movie.value = movieData.items[itemIndex.value]
            } else {
                movie.value = movieData.items[0]
            }
        } catch (err) {
            error.value = 'Не удалось загрузить фильм.'
            console.error(err)
        }
    }

    return {
        movie,
        error,
        getMovies,
    }
}
