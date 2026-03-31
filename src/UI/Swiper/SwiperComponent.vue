<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import type { Movie } from '@/types/movies'

interface Props {
    swiperItems: Movie[]
    swiperTitle: string
    slidesPerView?: number
    autoplayDeelay?: number
}

const props = withDefaults(defineProps<Props>(), {
    slidesPerView: 6,
    autoplayDeelay: 3000,
})

const emit = defineEmits<{
    (e: 'loadMore'): void
}>()

const modules = [Autoplay]

const swiperBreakpoints = {
    320: {
        slidesPerView: 3,
        spaceBetween: 10,
    },
    768: {
        slidesPerView: 4,
        spaceBetween: 15,
    },
    1200: {
        slidesPerView: props.slidesPerView,
        spaceBetween: 20,
    },
}

const onReachEnd = () => {
    emit('loadMore')
}
</script>

<template>
    <div class="swiper__container">
        <h2 class="swiper__title">{{ swiperTitle }}</h2>
        <swiper
            :breakpoints="swiperBreakpoints"
            :modules="modules"
            :autoplay="{
                delay: props.autoplayDeelay,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }"
            @reachEnd="onReachEnd"
        >
            <swiper-slide v-for="(item, index) in swiperItems" :key="item.kinopoiskId || index">
                <div class="movie__card">
                    <img :src="item.posterUrl" :alt="item.nameRu" class="movie__poster" />
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<style scoped>
.swiper__title {
    font-size: 32px;
    margin-bottom: 20px;
    font-weight: 700;
}

.movie__poster {
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 3;
    border-radius: 8px;
    display: block;
    object-fit: cover;
    background-color: var(--color-bg2);
}

@media (max-width: 768px) {
    .swiper__title {
        font-size: 26px;
    }
}

@media (max-width: 425px) {
    .swiper__title {
        font-size: 22px;
        margin-bottom: 12px;
    }
}
</style>
