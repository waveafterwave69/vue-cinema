import { ref, watch, onUnmounted, onMounted } from 'vue'
import { moviesApi } from '@/services/movies'
import type { Movie, CollectionsType } from '@/types/movies'
import axios from 'axios'

export const useMoviesSearch = (
    getSearchValue: () => string,
    getCurrentTheme: () => CollectionsType,
) => {
    const movies = ref<Movie[]>([])
    const isLoading = ref(false)
    const currentPage = ref<number>(1)
    const totalPages = ref<number>(0)

    let debounceTimeout: ReturnType<typeof setTimeout>
    let abortController: AbortController | null = null

    const isAppendMode = ref(false)

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

            const newItems = data.films || data.items || []

            if (currentPage.value === 1 || !isAppendMode.value) {
                movies.value = newItems
            } else {
                movies.value.push(...newItems)
            }

            totalPages.value = data.totalPages || data.pagesCount
        } catch (err: unknown) {
            if (axios.isCancel(err) || (err instanceof Error && err.name === 'AbortError')) return
        } finally {
            isLoading.value = false
            isAppendMode.value = false
        }
    }

    const changePageCount = (newPage: number) => {
        isAppendMode.value = false
        currentPage.value = newPage
    }

    const fetchNextPage = () => {
        if (!isLoading.value && currentPage.value < totalPages.value) {
            isAppendMode.value = true
            currentPage.value++
        }
    }

    watch(currentPage, () => {
        fetchMovies()
    })

    onMounted(() => {
        fetchMovies()
    })

    watch([getSearchValue, getCurrentTheme], () => {
        clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(() => {
            isAppendMode.value = false
            if (currentPage.value === 1) {
                fetchMovies()
            } else {
                currentPage.value = 1
            }
        }, 400)
    })

    onUnmounted(() => {
        clearTimeout(debounceTimeout)
        abortController?.abort()
    })

    return { movies, isLoading, totalPages, currentPage, changePageCount, fetchNextPage }
}
