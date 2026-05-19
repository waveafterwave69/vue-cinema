<script setup lang="ts">
import { Swiper } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import { computed } from 'vue'
import 'swiper/css'

interface Props {
    swiperTitle: string
    slidesPerView?: number
    slidesPerViewMedium?: number
    slidesPerViewSmall?: number
    autoplayDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
    slidesPerView: 6,
    slidesPerViewMedium: 4,
    slidesPerViewSmall: 3,
    autoplayDelay: 3000,
})

const emit = defineEmits<{ (e: 'loadMore'): void }>()
const modules = [Autoplay]

const autoplayConfig = computed(() => {
    if (props.autoplayDelay === 0) return false

    return {
        delay: props.autoplayDelay,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    }
})

const swiperBreakpoints = {
    320: { slidesPerView: props.slidesPerViewSmall, spaceBetween: 10 },
    768: { slidesPerView: props.slidesPerViewMedium, spaceBetween: 15 },
    1200: { slidesPerView: props.slidesPerView, spaceBetween: 20 },
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
            :autoplay="autoplayConfig"
            @reachEnd="onReachEnd"
        >
            <slot />
        </swiper>
    </div>
</template>

<style scoped>
.swiper__title {
    font-size: 32px;
    margin-bottom: 20px;
    font-weight: 700;
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
