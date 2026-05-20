import { moviesApi } from '@/services/movies'
import { onMounted, ref } from 'vue'

export const useGetMovieFrames = (id: string) => {
    const movieImages = ref<{ imageUrl: string }[]>([])
    const isLoading = ref(true)

    onMounted(async () => {
        try {
            const imagesData = await moviesApi.getMovieImages(id)
            movieImages.value = imagesData.items
        } finally {
            isLoading.value = false
        }
    })

    return { movieImages, isLoading }
}
