import { moviesApi } from '@/services/movies'
import { collections } from '@/static/static'
import type { Movie } from '@/types/movies'
import { ref } from 'vue'

export const useGetRandomMovie = () => {
    const movie = ref<Movie>()
    const error = ref<string | null>(null)

    const randomNumberOne = Math.floor(Math.random() * 35) + 1
    const randomNumberTwo = Math.floor(Math.random() * 20)
    const randomNumberThree = Math.floor(Math.random() * collections.length)

    const getMovies = async () => {
        try {
            const movieData = await moviesApi.getMoviesCategory(
                collections[randomNumberThree]!,
                randomNumberOne,
            )

            if (movieData.items && movieData.items[randomNumberTwo]) {
                movie.value = movieData.items[randomNumberTwo]
            } else {
                movie.value = movieData.items[0]
            }
        } catch (err) {
            error.value = 'Не удалось загрузить фильм.'
            console.log(err)
        }
    }

    return {
        movie,
        getMovies,
    }
}
