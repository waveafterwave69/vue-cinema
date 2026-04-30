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
import WheelOfFortune from '@/UI/WheelOfFortune/WheelOfFortune.vue'

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

const searchValue = inject<Ref<string>>('search-value')
const currentTheme = inject<Ref<CollectionsType>>('current-theme')

const { movies } = useMoviesSearch(
    () => searchValue?.value ?? '',
    () => currentTheme?.value ?? 'TOP_POPULAR_ALL',
)

onMounted(fetchMovies)

useScrollTop()
</script>

<template>
    <main class="container">
        <HomePromo class="section-margin" />
        <WheelOfFortune
            v-if="bestFilms.length"
            :prizes="
                bestFilms.slice(0, 14).map((m) => ({
                    text: m.nameRu || m.nameEn,
                    id: m.kinopoiskId,
                    img: m.posterUrl,
                }))
            "
            buttonText="🎡 Рандомайзер"
            whellText="Крути колесо, чтобы выбрать фильм!"
        />
        <div class="best">
            <SwiperComponent
                v-if="bestFilms.length"
                swiperTitle="Лучшие фильмы"
                @loadMore="fetchMovies"
            >
                <SwiperSlide v-for="movie in bestFilms" :key="movie.kinopoiskId">
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
            <SwiperComponent v-if="bestFilms.length" swiperTitle="" @loadMore="fetchMovies">
                <SwiperSlide v-for="movie in movies" :key="movie.kinopoiskId">
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
    </main>
</template>

<style scoped>
.container {
    margin-bottom: 50px;
}

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

.categories {
    margin-top: 50px;
}

@media (max-width: 768px) {
    .component__margin {
        margin-bottom: 40px;
    }

    .loader {
        width: 100px;
        margin-top: 0px;
    }

    .categories {
        margin-top: 20px;
    }
}
</style>
