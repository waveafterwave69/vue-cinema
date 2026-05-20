<script setup lang="ts">
import { inject, onMounted, ref, type Ref, computed, watch } from 'vue'
import { SwiperSlide } from 'swiper/vue'
import SwiperComponent from '@/UI/Swiper/SwiperComponent.vue'
import HomePromo from '@/components/HomeSections/HomePromo.vue'
import { moviesApi } from '@/services/movies'
import type { CollectionsType, Movie } from '@/types/movies'
import CategoriesComponent from '@/components/CategoriesComponent.vue'
import { useScrollTop } from '@/composables/useScrollTop'
import { useMoviesSearch } from '@/composables/useMovieSearch'
import MoviesWheel from '@/components/MoviesWheel.vue'

const bestMovies = ref<Movie[]>([])
const bestPage = ref(1)
const isBestLoading = ref(false)
const isBestEnd = ref(false)

const failedBestImageIds = ref<string[]>([])
const failedCategoryImageIds = ref<string[]>([])

const fetchBestMovies = async () => {
    if (isBestLoading.value || isBestEnd.value) return
    isBestLoading.value = true
    try {
        const movieData = await moviesApi.getMoviesCategory('TOP_250_MOVIES', bestPage.value)
        if (movieData.items?.length) {
            bestMovies.value.push(...movieData.items)
            bestPage.value++
        } else {
            isBestEnd.value = true
        }
    } catch (err) {
        console.error('Ошибка загрузки лучших фильмов:', err)
    } finally {
        isBestLoading.value = false
    }
}

const searchValue = inject<Ref<string>>('search-value')
const currentTheme = inject<Ref<CollectionsType>>('current-theme')

const {
    movies: categoryMovies,
    fetchNextPage,
    isLoading: isCategoryLoading,
} = useMoviesSearch(
    () => searchValue?.value ?? '',
    () => currentTheme?.value ?? 'TOP_POPULAR_ALL',
)

watch([searchValue, currentTheme], () => {
    failedCategoryImageIds.value = []
})

// Вычисляемый массив для лучших фильмов
const validBestMovies = computed(() => {
    return bestMovies.value.filter((movie) => {
        const id = movie.kinopoiskId || movie.filmId
        return movie.posterUrl && id && !failedBestImageIds.value.includes(id)
    })
})

// Вычисляемый массив для фильмов по категориям
const validCategoryMovies = computed(() => {
    return categoryMovies.value.filter((movie) => {
        const id = movie.kinopoiskId || movie.filmId
        return movie.posterUrl && id && !failedCategoryImageIds.value.includes(id)
    })
})

const handleBestImageError = (id: string | undefined) => {
    if (id && !failedBestImageIds.value.includes(id)) {
        failedBestImageIds.value.push(id)
    }
}

const handleCategoryImageError = (id: string | undefined) => {
    if (id && !failedCategoryImageIds.value.includes(id)) {
        failedCategoryImageIds.value.push(id)
    }
}

onMounted(fetchBestMovies)
useScrollTop()
</script>

<template>
    <MoviesWheel />
    <main class="container">
        <HomePromo class="section-margin" />

        <!-- Используем validBestMovies -->
        <div class="best" v-if="validBestMovies.length">
            <SwiperComponent swiperTitle="Лучшие фильмы" @loadMore="fetchBestMovies">
                <SwiperSlide
                    v-for="movie in validBestMovies"
                    :key="movie.kinopoiskId || movie.filmId"
                >
                    <RouterLink :to="`/film/${movie.kinopoiskId || movie.filmId}`" class="card">
                        <div class="movie__poster">
                            <img
                                :src="movie.posterUrl"
                                :alt="movie.nameRu"
                                class="card__img"
                                loading="lazy"
                                @error="handleBestImageError(movie.kinopoiskId || movie.filmId)"
                            />
                            <div v-if="movie.ratingKinopoisk" class="movie__rating">
                                {{ movie.ratingKinopoisk }}
                            </div>
                        </div>
                    </RouterLink>
                </SwiperSlide>
            </SwiperComponent>
        </div>

        <!-- Используем validCategoryMovies -->
        <div class="categories" v-if="validCategoryMovies.length">
            <CategoriesComponent />
            <SwiperComponent swiperTitle="" @loadMore="fetchNextPage">
                <SwiperSlide
                    v-for="movie in validCategoryMovies"
                    :key="movie.kinopoiskId || movie.filmId"
                >
                    <RouterLink :to="`/film/${movie.kinopoiskId || movie.filmId}`" class="card">
                        <div class="movie__poster">
                            <img
                                :src="movie.posterUrl"
                                :alt="movie.nameRu"
                                class="card__img"
                                loading="lazy"
                                @error="handleCategoryImageError(movie.kinopoiskId || movie.filmId)"
                            />
                            <div v-if="movie.ratingKinopoisk || movie.rating" class="movie__rating">
                                {{ movie.ratingKinopoisk || movie.rating }}
                            </div>
                        </div>
                    </RouterLink>
                </SwiperSlide>
            </SwiperComponent>

            <div v-if="isCategoryLoading" class="loader">Загрузка...</div>
        </div>
    </main>
</template>

<style scoped>
/* Стили оставлены без изменений */
.container {
    margin-bottom: 50px;
}

.section-margin {
    margin-bottom: 50px;
}

.card__img {
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 3;
    border-radius: 8px;
    display: block;
    object-fit: cover;
    background-color: var(--color-bg2);
}

.movie__poster {
    position: relative;
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
.categories {
    margin-top: 50px;
}

.loader {
    text-align: center;
    padding: 20px;
}
</style>
