<script setup lang="ts">
import { moviesApi } from '@/services/movies'
import type { MovieFullInfo } from '@/types/movies'
import type { Review } from '@/types/reviews'
import SwiperComponent from '@/UI/Swiper/SwiperComponent.vue'
import { SwiperSlide } from 'swiper/vue'
import { onMounted, ref } from 'vue'
import iconLike from '@/img/like.png'
import iconDislike from '@/img/dislike.png'
import { formatDate } from '@/utils/formatters'

interface Props {
    movie: MovieFullInfo
}

const props = defineProps<Props>()

const reviews = ref<Review[]>([])
const currentPage = ref(1)
const isLoading = ref(false)
const isEnd = ref(false)

const fetchMovies = async () => {
    if (isLoading.value || isEnd.value) return

    isLoading.value = true
    try {
        const reviewsData = await moviesApi.getMovieReviews(props.movie.kinopoiskId)
        console.log(reviewsData)
        if (reviewsData.length) {
            reviews.value.push(...reviewsData)
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
    <section class="reviews card" v-if="reviews.length > 0">
        <div class="container">
            <h2>Оценки пользователей</h2>
            <SwiperComponent
                v-if="reviews.length"
                swiperTitle=""
                @loadMore="fetchMovies"
                :slidesPerView="3"
                :slidesPerViewMedium="2"
                :slidesPerViewSmall="1"
                :autoplayDelay="0"
            >
                <SwiperSlide v-for="review in reviews" :key="review.kinopoiskId">
                    <div class="review__card">
                        <div class="card__img-wrap">
                            <img
                                class="card__img"
                                :src="review.type === 'POSITIVE' ? iconLike : iconDislike"
                                alt="status"
                            />
                        </div>

                        <div class="review__header">
                            <span class="review__user">{{ review.author }}</span>
                            <span class="review__date">{{ formatDate(review.date) }}</span>
                        </div>

                        <div class="review__body">
                            <p class="review__text" v-html="review.description"></p>
                        </div>
                    </div>
                </SwiperSlide>
            </SwiperComponent>
        </div>
    </section>
</template>

<style scoped>
.reviews {
    margin-top: 80px;
}

:deep(.swiper) {
    overflow-y: visible !important;
    padding-top: 50px !important;
}

.review__card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 40px 20px 25px;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.card__img-wrap {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    background: var(--color-bg2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 100%;
}

.card__img {
    width: 35px;
    height: 35px;
}

.review__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.review__user {
    font-weight: 600;
    font-size: 16px;
}

.review__date {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
}

.review__body {
    flex-grow: 1;
    overflow: hidden;
}

.review__text {
    font-size: 15px;
    line-height: 1.6;
    height: 450px;
    overflow-y: auto;
    padding-right: 10px;
}

.review__text::-webkit-scrollbar {
    width: 4px;
}

.review__text::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
}

.review__text::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
}

.review__text::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}

.review__text {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
}

@media (max-width: 1024px) {
    .reviews {
        margin-top: 70px;
    }

    :deep(.swiper) {
        padding-top: 30px !important;
    }

    .review__card {
        padding: 40px 15px 20px;
    }

    .card__img-wrap {
        padding: 18px;
    }

    .card__img {
        width: 30px;
        height: 30px;
    }

    .review__header {
        margin-bottom: 10px;
        padding-bottom: 8px;
    }

    .review__user {
        font-size: 16px;
    }

    .review__date {
        font-size: 13px;
    }

    .review__text {
        font-size: 15px;
        line-height: 1.6;
        height: 450px;
        padding-right: 10px;
    }

    .review__text::-webkit-scrollbar {
        width: 4px;
    }
}

@media (max-width: 768px) {
    .reviews {
        margin-top: 70px;
    }

    :deep(.swiper) {
        padding-top: 20px !important;
    }

    .review__card {
        padding: 40px 15px 20px;
    }

    .card__img-wrap {
        padding: 15px;
        top: -20px;
    }

    .card__img {
        width: 23px;
        height: 23px;
    }

    .review__header {
        margin-bottom: 10px;
        padding-bottom: 8px;
    }

    .review__user {
        font-size: 15px;
    }

    .review__date {
        font-size: 12px;
    }

    .review__text {
        font-size: 15px;
        height: 450px;
    }
}

@media (max-width: 425px) {
    .reviews {
        margin-top: 60px;
    }

    .review__card {
        padding: 40px 10px 20px;
    }

    .review__text {
        height: 400px;
    }
}
</style>
