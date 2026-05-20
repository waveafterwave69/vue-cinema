<script setup lang="ts">
import { moviesApi } from '@/services/movies'
import type { MovieFullInfo } from '@/types/movies'
import SwiperComponent from '@/UI/Swiper/SwiperComponent.vue'
import { SwiperSlide } from 'swiper/vue'
import { onMounted, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
    movie: MovieFullInfo
}

interface SameMovie {
    filmId: number
    nameEn: string
    nameOriginal: string
    nameRu: string
    posterUrl: string
    posterUrlPreview: string
    relationType: string
}

const props = defineProps<Props>()

const sameMovies = ref<SameMovie[]>([])
const currentPage = ref(1)
const isLoading = ref(false)
const isEnd = ref(false)

const failedMovieIds = ref<number[]>([])

const fetchMovies = async () => {
    if (isLoading.value || isEnd.value) return

    isLoading.value = true
    try {
        const moviesData = await moviesApi.getMovieSimilars(props.movie.kinopoiskId)

        if (moviesData.length) {
            sameMovies.value.push(...moviesData)
            currentPage.value++
        } else {
            isEnd.value = true
        }
    } catch (err) {
        console.error('Ошибка загрузки фильмов:', err)
    } finally {
        isLoading.value = false
    }
}

const validSameMovies = computed(() => {
    return sameMovies.value.filter((movie) => {
        return movie.posterUrl && movie.filmId && !failedMovieIds.value.includes(movie.filmId)
    })
})

const handleImageError = (id: number) => {
    if (id && !failedMovieIds.value.includes(id)) {
        failedMovieIds.value.push(id)
    }
}

onMounted(fetchMovies)
</script>

<template>
    <section class="same" v-if="validSameMovies.length > 0">
        <div class="container">
            <SwiperComponent swiperTitle="Похожие фильмы" @loadMore="fetchMovies">
                <SwiperSlide v-for="movie in validSameMovies" :key="movie.filmId">
                    <RouterLink :to="`/film/${movie.filmId}`">
                        <div class="movie__poster">
                            <img
                                :src="movie.posterUrl"
                                :alt="movie.nameRu"
                                class="card__img"
                                loading="lazy"
                                @error="handleImageError(movie.filmId)"
                            />
                        </div>
                    </RouterLink>
                </SwiperSlide>
            </SwiperComponent>
        </div>
    </section>
</template>

<style scoped>
.same {
    margin-top: 80px;
}

.card__img {
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 3;
    border-radius: 8px;
    display: block;
    object-fit: cover;
}

.movie__poster {
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 3;
    border-radius: 8px;
    display: block;
    object-fit: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.actor__name {
    color: var(--color-main);
    text-align: center;
}

.movie__rating {
    position: absolute;
    top: 8px;
    left: 8px;
    background-color: var(--color-gold);
    color: var(--color-bg2);
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 13px;
    z-index: 10;
}

.loader {
    width: 120px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    margin-top: -50px;
}

@media (max-width: 768px) {
    .same {
        margin-top: 50px;
    }

    .component__margin {
        margin-bottom: 40px;
    }

    .loader {
        width: 100px;
        margin-top: 0px;
    }

    .actor__name {
        font-size: 14px;
    }
}
</style>
