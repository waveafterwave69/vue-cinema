import { moviesApi } from '@/services/movies'
import { collections } from '@/static/static'
import type { Movie } from '@/types/movies'
import { ref } from 'vue'

export const useGetRandomMovie = () => {
    const movie = ref<Movie>()

    const randomNumberOne = Math.floor(Math.random() * 35) + 1
    const randomNumberTwo = Math.floor(Math.random() * 20)
    const randomNumberThree = Math.floor(Math.random() * collections.length)

    const getMovies = async () => {
        const movieData = await moviesApi.getMoviesCategory(
            collections[randomNumberThree]!,
            randomNumberOne,
        )

        console.log(movieData.totalPages)

        movie.value = movieData.items[randomNumberTwo]
    }

    return {
        movie,
        getMovies,
    }
}
