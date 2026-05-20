<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Movie } from '@/types/movies'
import { motion } from 'motion-v'

interface Props {
    movies: Movie[]
}

const props = defineProps<Props>()

const itemsPerPage = 15
const visibleCount = ref(itemsPerPage)
const observerTarget = ref<HTMLElement | null>(null)

const visibleMovies = computed(() => {
    return props.movies.slice(0, visibleCount.value)
})

const loadMore = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry && entry.isIntersecting && visibleCount.value < props.movies.length) {
        visibleCount.value += itemsPerPage
    }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
    observer = new IntersectionObserver(loadMore, {
        rootMargin: '200px',
    })
    if (observerTarget.value) {
        observer.observe(observerTarget.value)
    }
})

onUnmounted(() => {
    observer?.disconnect()
})

const formatDescription = (desc: string) => {
    if (!desc) return ''
    return desc.replace(/~/g, '').replace(/-/g, '•')
}
</script>

<template>
    <div class="movies container">
        <h2 class="movies__title">
            Фильмы с участием актёра <span>({{ movies.length }})</span>
        </h2>

        <div class="movies__grid">
            <motion.div
                v-for="movie in visibleMovies"
                :key="movie.filmId"
                class="movie-card"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.4 }"
            >
                <RouterLink :to="`/film/${movie.filmId}`" class="movie-card__link">
                    <div class="movie-card__body">
                        <div class="movie-card__main">
                            <div class="movie-card__header">
                                <span
                                    class="movie-card__rating"
                                    :class="{ 'rating--high': Number(movie.rating) > 7 }"
                                >
                                    {{ movie.rating || 'N/A' }}
                                </span>
                                <span class="movie-card__profession">{{
                                    movie.professionKey
                                }}</span>
                            </div>
                            <h3 class="movie-card__title">{{ movie.nameRu || movie.nameEn }}</h3>
                            <p class="movie-card__en-title">{{ movie.nameEn }}</p>
                            <div v-if="movie.description" class="movie-card__role">
                                <span class="role-dot"></span>
                                <p class="role-text">{{ formatDescription(movie.description) }}</p>
                            </div>
                        </div>
                        <div class="movie-card__action">
                            <div class="arrow-icon">→</div>
                        </div>
                    </div>
                </RouterLink>
            </motion.div>
        </div>

        <div v-if="visibleCount < movies.length" ref="observerTarget" class="observer-sentinel">
            <div class="loader-dots"><span></span><span></span><span></span></div>
        </div>
    </div>
</template>

<style scoped>
.movies {
    margin-top: 330px;
}

.movies__title {
    margin-bottom: 20px;
}

.movies__grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 0 auto;
}

.movie-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    transition: all 0.3s ease;
    overflow: hidden;
}

.movie-card:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: var(--color-gold, #ffd700);
    transform: translateX(10px);
}

.movie-card__link {
    text-decoration: none;
    color: var(--color-main);
    display: block;
    padding: 20px 25px;
}

.movie-card__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.movie-card__header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 10px;
}

.movie-card__rating {
    font-weight: 800;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 10px;
    border-radius: 6px;
    color: var(--color-main);
}

.rating--high {
    color: var(--color-bg2);
    background: var(--color-gold, #ffd700);
}

.movie-card__profession {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0.4;
}

.movie-card__title {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
}

.movie-card__en-title {
    font-size: 14px;
    opacity: 0.3;
    margin: 4px 0 12px;
}

.movie-card__role {
    display: flex;
    align-items: center;
    gap: 10px;
}

.role-dot {
    width: 4px;
    height: 4px;
    background: var(--color-gold, #ffd700);
    border-radius: 50%;
}

.role-text {
    font-size: 14px;
    color: var(--color-secondary);
    margin: 0;
    font-style: italic;
}

.arrow-icon {
    font-size: 24px;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.3s ease;
    color: var(--color-gold, #ffd700);
}

.movie-card:hover .arrow-icon {
    opacity: 1;
    transform: translateX(0);
}

@media (max-width: 1440px) {
    .movies {
        margin-top: -30px;
    }
}

@media (max-width: 768px) {
    .movies {
        margin-top: -40px;
    }

    .movies__title {
        margin-bottom: 20px;
    }
}

@media (max-width: 425px) {
    .movies {
        margin-top: -50px;
    }

    .movies__title {
        margin-bottom: 20px;
    }

    .movie-card__title {
        font-size: 16px;
    }
    .movie-card__link {
        padding: 15px;
    }
    .arrow-icon {
        display: none;
    }
}

@media (max-width: 600px) {
}
</style>
