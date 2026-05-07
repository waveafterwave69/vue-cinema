<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'
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

onMounted(fetchBestMovies)
useScrollTop()
</script>

<template>
    <MoviesWheel />
    <main class="container">
        <HomePromo class="section-margin" />

        <div class="best">
            <SwiperComponent
                v-if="bestMovies.length"
                swiperTitle="Лучшие фильмы"
                @loadMore="fetchBestMovies"
            >
                <SwiperSlide v-for="movie in bestMovies" :key="movie.kinopoiskId">
                    <RouterLink :to="`/film/${movie.kinopoiskId}`" class="card">
                        <div class="movie__poster">
                            <img
                                :src="movie.posterUrl"
                                :alt="movie.nameRu"
                                class="card__img"
                                loading="lazy"
                            />
                            <div v-if="movie.ratingKinopoisk" class="movie__rating">
                                {{ movie.ratingKinopoisk }}
                            </div>
                        </div>
                    </RouterLink>
                </SwiperSlide>
            </SwiperComponent>
        </div>

        <div class="categories">
            <CategoriesComponent />
            <SwiperComponent v-if="categoryMovies.length" swiperTitle="" @loadMore="fetchNextPage">
                <SwiperSlide
                    v-for="movie in categoryMovies"
                    :key="movie.kinopoiskId || movie.filmId"
                >
                    <RouterLink :to="`/film/${movie.kinopoiskId || movie.filmId}`" class="card">
                        <div class="movie__poster">
                            <img
                                :src="movie.posterUrl"
                                :alt="movie.nameRu"
                                class="card__img"
                                loading="lazy"
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
