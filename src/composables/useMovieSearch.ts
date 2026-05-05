import { ref, watch, onUnmounted } from 'vue'
import { moviesApi } from '@/services/movies'
import type { Movie, CollectionsType } from '@/types/movies'
import axios from 'axios'

export const useMoviesSearch = (
    getSearchValue: () => string,
    getCurrentTheme: () => CollectionsType,
) => {
    const movies = ref<Movie[]>([])
    const isLoading = ref(true)
    const currentPage = ref<number>(1)
    const totalPages = ref<number>(0)

    let debounceTimeout: ReturnType<typeof setTimeout>
    let abortController: AbortController | null = null

    const changePageCount = (newPageCount: number) => {
        currentPage.value = newPageCount
    }

    const fetchMovies = async () => {
        if (abortController) abortController.abort()
        abortController = new AbortController()

        const query = getSearchValue().trim()
        const theme = getCurrentTheme()

        isLoading.value = true

        try {
            let data
            if (query) {
                data = await moviesApi.getMovieSearchValue(query, currentPage.value)
            } else {
                data = await moviesApi.getMoviesCategory(theme, currentPage.value)
            }
            console.log(data)
            movies.value = data.films || data.items || []
            totalPages.value = data.totalPages || data.pagesCount
        } catch (err: unknown) {
            if (axios.isCancel(err) || (err instanceof Error && err.name === 'AbortError')) return
        } finally {
            isLoading.value = false
        }
    }

    watch(
        [getSearchValue, getCurrentTheme, currentPage],
        () => {
            clearTimeout(debounceTimeout)
            debounceTimeout = setTimeout(fetchMovies, 400)
        },
        { immediate: true },
    )

    watch([getSearchValue, getCurrentTheme], () => {
        currentPage.value = 1
    })

    onUnmounted(() => {
        clearTimeout(debounceTimeout)
        abortController?.abort()
    })

    return { movies, isLoading, totalPages, currentPage, changePageCount }
}
