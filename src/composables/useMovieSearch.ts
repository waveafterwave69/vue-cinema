import { ref, watch, onUnmounted } from 'vue'
import { moviesApi } from '@/services/movies'
import type { Movie, CollectionsType } from '@/types/movies'
import axios from 'axios'

export const useMoviesSearch = (
    getSearchValue: () => string,
    getCurrentTheme: () => CollectionsType,
) => {
    const movies = ref<Movie[]>([])
    const isLoading = ref(false)

    let debounceTimeout: ReturnType<typeof setTimeout>
    let abortController: AbortController | null = null

    const fetchMovies = async () => {
        if (abortController) abortController.abort()
        abortController = new AbortController()

        const query = getSearchValue().trim()
        const theme = getCurrentTheme()

        isLoading.value = true

        try {
            let data
            if (query) {
                data = await moviesApi.getMovieSearchValue(query, 1)
            } else {
                data = await moviesApi.getMoviesCategory(theme, 1)
            }
            movies.value = data.films || data.items || []
            console.log(movies.value)
        } catch (err: unknown) {
            if (axios.isCancel(err) || (err instanceof Error && err.name === 'AbortError')) return
        } finally {
            isLoading.value = false
        }
    }

    watch(
        [getSearchValue, getCurrentTheme],
        () => {
            clearTimeout(debounceTimeout)
            debounceTimeout = setTimeout(fetchMovies, 400)
        },
        { immediate: true },
    )

    onUnmounted(() => {
        clearTimeout(debounceTimeout)
        abortController?.abort()
    })

    return { movies, isLoading }
}
