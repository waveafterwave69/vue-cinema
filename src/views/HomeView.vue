<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SwiperSlide } from 'swiper/vue'
import SwiperComponent from '@/UI/Swiper/SwiperComponent.vue'
import HomePromo from '@/components/HomeSections/HomePromo.vue'
import { moviesApi } from '@/services/movies'
import 'swiper/css'
import type { Movie } from '@/types/movies'

const bestFilms = ref<Movie[]>([])
const currentPage = ref(1)
const isLoading = ref(false)
const isEnd = ref(false)

const fetchMovies = async () => {
    if (isLoading.value || isEnd.value) return

    isLoading.value = true
    try {
        const movieData = await moviesApi.getMoviesCategory('TOP_250_MOVIES', currentPage.value)

        if (movieData.items?.length) {
            bestFilms.value.push(...movieData.items)
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

onMounted(fetchMovies)
</script>

<template>
    <main class="container">
        <HomePromo class="section-margin" />

        <SwiperComponent
            v-if="bestFilms.length"
            swiperTitle="Лучшие фильмы"
            @loadMore="fetchMovies"
        >
            <SwiperSlide v-for="movie in bestFilms" :key="movie.kinopoiskId">
                <RouterLink :to="`/movie/${movie.kinopoiskId}`" class="card">
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

        <div v-if="isLoading" class="loader-wrapper">
            <div class="spinner"></div>
        </div>
    </main>
</template>

<style scoped>
.component__margin {
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
    .component__margin {
        margin-bottom: 40px;
    }

    .loader {
        width: 100px;
        margin-top: 0px;
    }
}
</style>
