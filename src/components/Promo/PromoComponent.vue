<script setup lang="ts">
import { useGetRandomMovie } from '@/composables/useGetRandomMovie'
import { onMounted } from 'vue'
import { formatAgeLabel } from '../utils/formatters'

const { movie, getMovies } = useGetRandomMovie()

onMounted(async () => {
    await getMovies()
})
</script>

<template>
    <div v-if="movie" class="promo__container">
        <div class="promo">
            <div class="promo__left">
                <RouterLink class="promo__img-wrapper" :to="`/movie/${movie.kinopoiskId}`">
                    <img :src="movie.posterUrl" alt="" class="promo__img" />
                    <span class="promo__badge" v-if="movie.year === new Date().getFullYear()"
                        >Новинка</span
                    >
                </RouterLink>
            </div>

            <div class="promo__right">
                <div class="promo__head">
                    <h2 class="promo__title">{{ movie.nameRu || movie.nameEn }}</h2>
                    <span v-if="movie.ratingAgeLimits" class="promo__age">
                        {{ formatAgeLabel(movie.ratingAgeLimits) }}
                    </span>
                </div>

                <p class="promo__text">{{ movie.description }}</p>

                <div
                    class="promo__meta"
                    v-if="movie.year || movie.ratingImdb || movie.ratingKinopoisk"
                >
                    <div class="meta-item">
                        <span class="meta-label">Год:</span>
                        <span class="meta-value">{{ movie.year }}</span>
                    </div>

                    <div class="promo__ratings">
                        <a
                            v-if="movie.ratingImdb"
                            :href="`https://www.imdb.com/title/${movie.imdbId}`"
                            target="_blank"
                            class="rating-pill imdb"
                        >
                            <span>IMDb</span> <strong>{{ movie.ratingImdb }}</strong>
                        </a>
                        <a
                            v-if="movie.ratingKinopoisk"
                            :href="`https://www.kinopoisk.ru/film/${movie.kinopoiskId}`"
                            target="_blank"
                            class="rating-pill kp"
                        >
                            <span>Кинопоиск</span> <strong>{{ movie.ratingKinopoisk }}</strong>
                        </a>
                    </div>
                </div>

                <button class="promo__button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    Смотреть
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.promo__container {
    position: relative;
    overflow: hidden;
    margin-top: 30px;
    min-height: 500px;
    display: flex;
    align-items: center;
}

.promo {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 40px;
    width: 100%;
}

.promo__img-wrapper {
    display: block;
    overflow: hidden;
    border-radius: 10px;
    position: relative;
}

.promo__img-wrapper:hover img {
    transform: scale(1.05);
    box-shadow: 0px 0px 2px var(--color-secondary);
}

.promo__img-wrapper:hover {
    box-shadow: 0px 0px 25px -20px var(--color-secondary);
}

.promo__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.promo__badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #e50914;
    color: var(--color-main);
    padding: 4px 12px;
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.promo__right {
    display: flex;
    flex-direction: column;
}

.promo__head {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.promo__title {
    font-size: 48px;
    font-weight: 800;
    line-height: 1.1;
    margin: 0;
}

.promo__age {
    padding: 2px 8px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    font-size: 14px;
    margin-top: 17px;
}

.promo__text {
    font-size: 18px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 30px;
}

.promo__meta {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 40px;
}

.meta-item {
    display: flex;
    align-items: center;
    column-gap: 10px;
}

.meta-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
}

.meta-value {
    font-weight: 600;
    font-size: 18px;
}

.promo__ratings {
    display: flex;
    gap: 12px;
}

.rating-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.1);
    text-decoration: none;
    color: var(--color-main);
    backdrop-filter: blur(10px);
}

.rating-pill:hover {
    background: rgba(255, 255, 255, 0.2);
}

.rating-pill strong {
    color: #f5c518;
}

.promo__button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: fit-content;
    padding: 16px 48px;
    background: var(--color-secondary);
    color: var(--color-bg);
    border: none;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
}

.promo__button:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
}

@media (max-width: 1024px) {
    .promo {
        grid-template-columns: 280px 1fr;
        gap: 30px;
    }
    .promo__title {
        font-size: 36px;
    }
}

@media (max-width: 768px) {
    .promo__container {
        border-radius: 0;
    }
    .promo {
        grid-template-columns: 1fr;
        text-align: center;
    }
    .promo__img-wrapper {
        max-width: 260px;
        margin: 0 auto;
    }
    .promo__head {
        align-items: center;
        justify-content: center;
    }
    .promo__meta {
        flex-direction: column;
        gap: 20px;
    }
    .promo__button {
        width: 100%;
    }
    .promo__age {
        margin-top: 8px;
    }
}

@media (max-width: 425px) {
    .promo__text,
    .meta-item,
    .promo__age {
        display: none;
    }

    .promo__meta {
        margin-bottom: 20px;
    }

    .rating-pill {
        font-size: 16px;
    }

    .promo {
        gap: 10px;
    }

    .promo__container {
        margin-top: 15px;
    }

    .promo__title {
        font-size: 28px;
    }

    .promo__button {
        padding: 8px;
        font-size: 16px;
        max-width: 260px;
        margin: 0 auto;
    }
}
</style>
