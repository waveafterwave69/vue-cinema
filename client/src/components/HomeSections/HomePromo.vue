<script setup lang="ts">
import { useGetRandomMovie } from '@/composables/useGetRandomMovie'
import { formatAgeLabel } from '@/utils/formatters'
import { onMounted, ref } from 'vue'

const { movie, getMovies } = useGetRandomMovie()
const isLoading = ref(true)

const loadRandomMovie = async () => {
    isLoading.value = true
    try {
        await getMovies()
        if (!movie.value?.posterUrl) {
            await loadRandomMovie()
        }
    } catch (err) {
        console.error('Ошибка загрузки рандомного фильма:', err)
    } finally {
        setTimeout(() => {
            isLoading.value = false
        }, 500)
    }
}

const handleImageError = async () => {
    await loadRandomMovie()
}

onMounted(loadRandomMovie)
</script>

<template>
    <div class="promo__container">
        <div v-if="isLoading" class="promo skeleton">
            <div class="promo__left">
                <div class="skeleton-item skeleton-img"></div>
            </div>
            <div class="promo__right">
                <div class="promo__head">
                    <div class="skeleton-item skeleton-title"></div>
                    <div class="skeleton-item skeleton-age"></div>
                </div>
                <div class="skeleton-item skeleton-text"></div>
                <div class="skeleton-item skeleton-text"></div>
                <div class="skeleton-item skeleton-text short"></div>
                <div class="promo__meta">
                    <div class="skeleton-item skeleton-pill"></div>
                    <div class="skeleton-item skeleton-pill"></div>
                </div>
                <div class="skeleton-item skeleton-btn"></div>
            </div>
        </div>

        <div v-else-if="movie" class="promo">
            <div class="promo__left">
                <RouterLink class="promo__img-wrapper" :to="`/film/${movie.kinopoiskId}`">
                    <img
                        :src="movie.posterUrl"
                        alt=""
                        class="promo__img"
                        @error="handleImageError"
                    />
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
                            :href="`https://imdb.com{movie.imdbId}`"
                            target="_blank"
                            class="rating-pill imdb"
                        >
                            <span>IMDb</span> <strong>{{ movie.ratingImdb }}</strong>
                        </a>
                        <a
                            v-if="movie.ratingKinopoisk"
                            :href="`https://kinopoisk.ru{movie.kinopoiskId}/`"
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
                    О фильме
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

.skeleton-item {
    background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite linear;
    border-radius: 8px;
}

@keyframes skeleton-loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

.skeleton-img {
    width: 100%;
    height: 500px;
    border-radius: 10px;
}
.skeleton-title {
    width: 60%;
    height: 48px;
}
.skeleton-age {
    width: 50px;
    height: 24px;
    margin-top: 17px;
}
.skeleton-text {
    width: 100%;
    height: 18px;
    margin-bottom: 12px;
}
.skeleton-text.short {
    width: 40%;
}
.skeleton-pill {
    width: 120px;
    height: 36px;
    border-radius: 100px;
}
.skeleton-btn {
    width: 200px;
    height: 56px;
    border-radius: 12px;
    margin-top: auto;
}

.promo__left {
    position: relative;
}
.promo__img-wrapper {
    display: block;
    overflow: hidden;
    border-radius: 10px;
    position: relative;
}
.promo__img-wrapper:hover img {
    transform: scale(1.05);
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
    font-weight: 700;
    line-height: 1.1;
    margin: 0;
}
.promo__age {
    padding: 2px 8px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    font-size: 14px;
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

.rating-pill strong {
    color: var(--color-gold);
}

.rating-pill:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
}

.promo__button:hover {
    filter: brightness(1.15);
}

.promo__button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: fit-content;
    padding: 16px 48px;
    background: var(--color-main, var(--color-gold));
    color: var(--color-bg2);
    border: none;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
}

@media (max-width: 1440px) {
    .promo {
        grid-template-columns: 280px 1fr;
        gap: 30px;
    }
    .promo__title {
        font-size: 36px;
    }
    .skeleton-img {
        height: 400px;
    }
}

@media (max-width: 768px) {
    .promo {
        grid-template-columns: 1fr;
        text-align: center;
    }
    .promo__img-wrapper,
    .skeleton-img {
        max-width: 260px;
        margin: 0 auto;
        height: 380px;
    }
    .promo__head,
    .promo__meta {
        justify-content: center;
    }
    .promo__meta {
        flex-direction: column;
        gap: 20px;
    }
    .promo__button,
    .skeleton-btn {
        width: 90%;
        margin: 0 auto;
    }
}

@media (max-width: 425px) {
    .promo__text,
    .meta-item,
    .promo__age,
    .skeleton-text,
    .skeleton-age {
        display: none;
    }
    .promo {
        gap: 15px;
    }
    .promo__title {
        font-size: 28px;
    }
    .skeleton-title {
        height: 30px;
        width: 100%;
    }
    .promo__meta {
        flex-direction: row;
        gap: 20px;
        margin-bottom: 25px;
    }
    .promo__container {
        min-height: auto;
    }
    .promo__button {
        padding: 8px;
    }
}
</style>
