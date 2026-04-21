<script setup lang="ts">
import { moviesApi } from '@/services/movies'
import type { MovieFullInfo } from '@/types/movies'
import SwiperComponent from '@/UI/Swiper/SwiperComponent.vue'
import { SwiperSlide } from 'swiper/vue'
import { onMounted, ref } from 'vue'
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

const movies = ref<SameMovie[]>([])
const isLoading = ref(false)

const fetchMovies = async () => {
    isLoading.value = true
    try {
        const moviesData = await moviesApi.getMovieSequelsPrequels(props.movie.kinopoiskId)
        movies.value.push(...moviesData)
        console.log(movies.value)
    } catch (err) {
        console.error('Ошибка загрузки фильмов:', err)
    } finally {
        isLoading.value = false
    }
}

onMounted(fetchMovies)
</script>

<template>
    <section class="movies" v-if="movies.length > 0">
        <div class="container">
            <SwiperComponent v-if="movies.length" swiperTitle="Другие части фильма">
                <SwiperSlide v-for="movie in movies" :key="movie.filmId">
                    <RouterLink :to="`/film/${movie.filmId}`">
                        <div class="movie__poster">
                            <img
                                :src="movie.posterUrl"
                                :alt="movie.nameRu"
                                class="card__img"
                                loading="lazy"
                            />
                        </div>
                    </RouterLink>
                </SwiperSlide>
            </SwiperComponent>
        </div>
    </section>
</template>

<style scoped>
.movies {
    margin-top: 50px;
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
    .movies {
        margin-top: 30px;
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
