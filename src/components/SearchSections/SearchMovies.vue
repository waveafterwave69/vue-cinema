<script setup lang="ts">
import type { CollectionsType } from '@/types/movies'
import { useMoviesSearch } from '@/composables/useMovieSearch'

interface Props {
    searchValue: string
    currentTheme: CollectionsType
}

const props = defineProps<Props>()

const { movies, isLoading } = useMoviesSearch(
    () => props.searchValue,
    () => props.currentTheme,
)
</script>
<template>
    <section class="movies">
        <div v-if="isLoading" class="movies__status">
            <img class="spinner" src="../../img/spinner.svg" alt="Загрузка..." />
        </div>

        <div v-if="movies.length > 0 && !isLoading" class="movies__grid">
            <RouterLink
                v-for="movie in movies"
                :key="movie.filmId || movie.kinopoiskId"
                :to="`/film/${movie.filmId || movie.kinopoiskId}`"
                class="movie-card"
            >
                <div class="movie-card__poster">
                    <img
                        :src="movie.posterUrl"
                        :alt="movie.nameRu"
                        class="movie-card__img"
                        loading="lazy"
                    />
                    <div
                        v-if="movie.rating || (movie.ratingKinopoisk && movie.rating !== 'null')"
                        class="movie-card__rating"
                    >
                        {{ movie.rating || movie.ratingKinopoisk }}
                    </div>
                    <div class="movie-card__overlay">
                        <span class="movie-card__title">{{ movie.nameRu || movie.nameEn }}</span>
                    </div>
                </div>
            </RouterLink>
        </div>

        <div v-else-if="movies.length === 0 && searchValue" class="movies__empty">
            <p>По вашему запросу ничего не найдено 🍿</p>
        </div>
    </section>
</template>

<style scoped>
.movies {
    margin-top: 30px;
    min-height: 400px;
}

.movies__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 18px;
}

.movie-card {
    text-decoration: none;
    transition: transform 0.3s ease;
}

.movie-card:hover {
    transform: translateY(-8px);
}

.movie-card__poster {
    position: relative;
    aspect-ratio: 2/3;
    border-radius: 16px;
    overflow: hidden;
    background: var(--color-bg-alt);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.movie-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s ease;
}

.movie-card:hover .movie-card__img {
    filter: brightness(0.6);
}

.movie-card__rating {
    position: absolute;
    top: 12px;
    left: 12px;
    background: var(--color-gold, #f5c518);
    color: var(--color-bg2);
    padding: 4px 10px;
    border-radius: 8px;
    font-weight: 800;
    font-size: 14px;
    z-index: 2;
}

.movie-card__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    padding: 16px;
    opacity: 0;
    transition: opacity 0.3s ease;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}

.movie-card:hover .movie-card__overlay {
    opacity: 1;
}

.movie-card__title {
    color: var(--color-main);
    font-weight: 600;
    font-size: 15px;
}

.movies__status {
    display: flex;
    justify-content: center;
    padding: 40px;
}

.spinner {
    width: 60px;
}

.movies__empty {
    text-align: center;
    color: var(--color-secondary);
    margin-top: 50px;
}

@media (max-width: 768px) {
    .movies__grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }

    .movie-card__rating {
        top: 5px;
        left: 5px;
        padding: 2px 8px;
        font-size: 12px;
    }
}
</style>
