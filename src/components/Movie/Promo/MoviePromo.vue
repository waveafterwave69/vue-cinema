<script setup lang="ts">
import { moviesApi } from '@/services/movies'
import type { MovieFullInfo } from '@/types/movies'
import { formatTimeToHoursAndMinutes } from '@/utils/formatters'
import { motion } from 'motion-v'
import { onMounted, ref, computed } from 'vue'

interface Props {
    movie: MovieFullInfo
}

const props = defineProps<Props>()
const movieImages = ref<{ imageUrl: string }[]>([])
const isLoading = ref(true)

const promoImage = computed(() => {
    if (!movieImages.value.length) return props.movie.coverUrl || props.movie.posterUrl
    const randomIndex = Math.floor(Math.random() * movieImages.value.length)
    return movieImages.value[randomIndex]?.imageUrl
})

const starRating = computed(() => Math.round((props.movie.ratingKinopoisk || 0) / 2))

onMounted(async () => {
    try {
        const imagesData = await moviesApi.getMovieImages(props.movie.kinopoiskId)
        movieImages.value = imagesData.items
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <motion.div
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1.5 }"
        class="promo"
        v-if="!isLoading"
    >
        <img :src="promoImage" class="promo__img" alt="" />

        <div class="promo__content">
            <h1 class="promo__title">{{ movie.nameRu || movie.nameEn }}</h1>

            <div class="promo__meta">
                <div class="promo__rating">
                    <span
                        v-for="star in 5"
                        :key="star"
                        class="promo__star"
                        :class="{ 'promo__star--active': star <= starRating }"
                        >★</span
                    >
                    <span class="promo__rating-num">{{ movie.ratingKinopoisk }}</span>
                </div>

                <span v-if="movie.filmLength" class="promo__divider">|</span>
                <span v-if="movie.filmLength">{{
                    formatTimeToHoursAndMinutes(movie.filmLength)
                }}</span>

                <span v-if="movie.countries?.length" class="promo__divider">|</span>
                <span class="promo__countries">{{
                    movie.countries?.map((c) => c.country).join(', ')
                }}</span>
            </div>

            <p class="promo__genres">
                {{ movie.genres?.map((g) => g.genre).join(' • ') }}
            </p>

            <div class="promo__actions">
                <button class="promo__btn promo__btn--primary">Смотреть</button>
                <button class="promo__btn promo__btn--secondary">О фильме</button>
            </div>
        </div>
    </motion.div>
</template>

<style scoped>
.promo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 130px;
}

.promo__img {
    opacity: 0.3;
    filter: blur(3px);
    width: 100%;
    height: 100vh;
    position: absolute;
    object-fit: cover;
    object-position: center center;
    z-index: -1;
    left: 0px;
    top: 0px;
}

.promo__content {
    max-width: 900px;
    text-align: center;
    z-index: 1;
}

.promo__title {
    font-size: 72px;
    font-weight: 800;
    margin-bottom: 24px;
    text-transform: uppercase;
    letter-spacing: -1px;
}

.promo__meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;
    opacity: 0.9;
}

.promo__divider {
    opacity: 0.4;
}

.promo__rating {
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(255, 255, 255, 0.1);
    padding: 4px 12px;
    border-radius: 20px;
    backdrop-filter: blur(4px);
}

.promo__star {
    color: rgba(255, 255, 255, 0.3);
    font-size: 20px;
}

.promo__star--active {
    color: var(--color-gold);
}

.promo__rating-num {
    margin-left: 6px;
    font-weight: 700;
}

.promo__genres {
    font-size: 16px;
    text-transform: capitalize;
    opacity: 0.7;
    margin-bottom: 40px;
}

.promo__actions {
    display: flex;
    gap: 16px;
    justify-content: center;
}

.promo__btn {
    padding: 14px 32px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
}

.promo__btn--primary {
    background: var(--color-main);
    color: var(--color-bg2);
}

.promo__btn--primary:hover {
    background: #e2e2e2;
}

.promo__btn--secondary {
    background: rgba(255, 255, 255, 0.2);
    color: var(--color-main);
    backdrop-filter: blur(10px);
}

.promo__btn--secondary:hover {
    background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 1024px) {
    .promo {
        margin-top: 80px;
    }

    .promo__content {
        max-width: 900px;
    }

    .promo__title {
        font-size: 52px;
        margin-bottom: 25px;
        letter-spacing: 1px;
    }

    .promo__meta {
        gap: 10px;
        font-size: 16px;
        margin-bottom: 20px;
    }

    .promo__rating {
        gap: 3px;
        padding: 4px 12px;
    }

    .promo__star {
        font-size: 18px;
    }

    .promo__rating-num {
        margin-left: 5px;
    }

    .promo__genres {
        font-size: 14px;
        margin-bottom: 35px;
    }

    .promo__actions {
        gap: 13px;
    }

    .promo__btn {
        padding: 12px 30px;
        font-size: 16px;
    }
}

@media (max-width: 768px) {
    .promo {
        margin-top: 90px;
    }

    .promo__title {
        font-size: 34px;
        margin-bottom: 20px;
        letter-spacing: 0px;
    }

    .promo__meta {
        gap: 8px;
        font-size: 16px;
        flex-direction: column;
        row-gap: 10px;
        margin-bottom: 20px;
    }

    .promo__rating {
        margin-bottom: 15px;
    }

    .promo__divider {
        display: none;
    }

    .promo__rating {
        gap: 2px;
        padding: 3px 10px;
    }

    .promo__rating-num {
        margin-left: 4px;
    }

    .promo__genres {
        font-size: 14px;
        margin-bottom: 30px;
    }

    .promo__actions {
        gap: 10px;
    }

    .promo__btn {
        padding: 10px 25px;
        font-size: 15px;
    }
}

@media (max-width: 425px) {
    .promo {
        margin-top: 50px;
    }

    .promo__img {
        height: 600px;
    }

    .promo__title {
        font-size: 30px;
    }

    .promo__divider,
    .promo__genres,
    .promo__countries {
        display: none;
    }
}
</style>
