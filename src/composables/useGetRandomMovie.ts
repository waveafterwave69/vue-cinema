import { moviesApi } from '@/services/movies'
import type { Movie } from '@/types/movies'
import { ref } from 'vue'

export const useGetRandomMovie = () => {
    const movie = ref<Movie>()

    const randomNumberOne = Math.floor(Math.random() * 35) + 1
    const randomNumberTwo = Math.floor(Math.random() * 20)

    const getMovies = async () => {
        const movieData = await moviesApi.getMoviesCategory('TOP_POPULAR_ALL', randomNumberOne)

        movie.value = movieData.items[randomNumberTwo]
    }

    return {
        movie,
        getMovies,
    }
}
