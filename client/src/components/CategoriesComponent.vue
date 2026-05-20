<script setup lang="ts">
import { searchCollection } from '@/static/static'
import type { CollectionsType } from '@/types/movies'
import SwiperComponent from '@/UI/Swiper/SwiperComponent.vue'
import { firstLetterUpCase } from '@/utils/formatters'
import { SwiperSlide } from 'swiper/vue'
import { inject, type Ref } from 'vue'

const changeTheme = inject<(theme: CollectionsType) => void>('change-theme')
const currentTheme = inject<Ref<CollectionsType>>('current-theme')

const handleThemeChange = (theme: CollectionsType) => {
    if (changeTheme) changeTheme(theme)
}
</script>

<template>
    <SwiperComponent :slidesPerView="5" :autoplayDelay="0" swiperTitle="Категории">
        <SwiperSlide v-for="item in searchCollection" :key="item.id">
            <button
                class="category-btn"
                :class="{ 'category-btn--active': item.type === currentTheme }"
                @click="handleThemeChange(item.type)"
            >
                {{ firstLetterUpCase(item.name) }}
            </button>
        </SwiperSlide>
    </SwiperComponent>
</template>

<style scoped>
.category-btn {
    width: 100%;
    padding: 12px 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    font-weight: 500;
}

.category-btn:hover {
    background: var(--color-bg2);
}

.category-btn--active {
    background: var(--color-bg2);
}

@media (max-width: 1440px) {
    .category-btn {
        width: 100%;
        padding: 10px 15px;
        font-size: 14px;
    }
}

@media (max-width: 768px) {
    .category-btn {
        width: 100%;
        padding: 10px 5px;
        font-size: 14px;
    }
}
</style>
