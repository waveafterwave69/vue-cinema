<script setup lang="ts">
import { useGetRandomMovie } from '@/composables/useGetRandomMovie'
import { onMounted } from 'vue'
import { formatAgeLabel } from '../utils/formatters'

const { movie, getMovies } = useGetRandomMovie()

onMounted(async () => {
    await getMovies()
    console.log(movie.value)
})
</script>

<template>
    <div v-if="movie" class="promo">
        <div class="promo__left">
            <RouterLink class="promo__img-container" :to="`/movie/${movie.kinopoiskId}`"
                ><img :src="movie.posterUrl" alt="" class="promo__img"
            /></RouterLink>
        </div>
        <div class="promo__right">
            <h2 class="promo__title">{{ movie.nameRu || movie.nameEn }}</h2>
            <p class="promo__text">{{ movie.description }}</p>
            <div class="promo__info">
                <p v-if="movie.year">Год выхода: {{ movie.year }}</p>
                <p v-if="movie.ratingAgeLimits">
                    Возрастное ограничение: {{ formatAgeLabel(movie.ratingAgeLimits) }}
                </p>
                <p v-if="movie.ratingImdb">IMDB рейтинг: {{ movie.ratingImdb }}</p>
                <p v-if="movie.ratingKinopoisk">Кинопоиск рейтинг: {{ movie.ratingKinopoisk }}</p>
            </div>
            <button class="promo__button">Смотреть</button>
        </div>
    </div>
</template>

<style scoped>
.promo {
    display: flex;
    justify-content: space-between;
    column-gap: 20px;
    margin-top: 20px;
}

.promo__right {
    width: 950px;
}

.promo__img-container {
    display: block;
    width: 450px;
    overflow: hidden;
    border-radius: 10px;
}

.promo__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.promo__img-container:hover img {
    transform: scale(1.05);
    box-shadow: 0px 0px 2px var(--color-secondary);
}

.promo__img-container:hover {
    box-shadow: 0px 0px 15px -3px var(--color-secondary);
}

.promo__title {
    font-size: 42px;
    margin-bottom: 20px;
    font-weight: 600;
    border-bottom: 1px solid var(--color-secondary);
}

.promo__text {
    font-size: 18px;
}

.promo__info {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.promo__button {
    margin-top: 50px;
    background-color: var(--color-secondary);
    color: var(--color-bg2);
    padding: 15px 80px;
    border-radius: 10px;
    font-weight: 900;
    font-size: 20px;
}

.promo__button:hover {
    box-shadow: 0px 0px 15px -3px var(--color-secondary);
}
</style>
