<script setup lang="ts">
import { searchCollection } from '@/static/static'
import type { CollectionsType } from '@/types/movies'
import SwiperComponent from '@/UI/Swiper/SwiperComponent.vue'
import { firstLetterUpCase } from '@/utils/formatters'
import { SwiperSlide } from 'swiper/vue'

interface Props {
    currentTheme: CollectionsType
    searchValue: string
}

defineProps<Props>()

const emit = defineEmits<{
    (e: 'change-theme', theme: CollectionsType): void
    (e: 'update:searchValue', value: string): void
}>()

const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    emit('update:searchValue', target.value)
}

const handleThemeChange = (theme: CollectionsType) => {
    emit('change-theme', theme)
}
</script>

<template>
    <section class="promo">
        <h2 class="promo__title">Поиск фильмов</h2>

        <div class="promo__card">
            <div class="promo__bg-wrapper">
                <img class="promo__bg-img" src="../../img/cinema.png" alt="Background" />
            </div>

            <div class="promo__content">
                <div class="search-bar">
                    <input
                        type="text"
                        :value="searchValue"
                        @input="onInput"
                        placeholder="Поиск фильма..."
                        class="search-bar__input"
                    />
                    <button class="search-bar__btn">
                        <img src="../../img/search.svg" alt="Search" />
                    </button>
                </div>

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
            </div>
        </div>
    </section>
</template>

<style scoped>
.promo {
    margin-top: 25px;
}

.promo__title {
    margin-bottom: 15px;
}

.promo__card {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--color-secondary);
    border-radius: 24px;
    padding: 50px 40px;
}

.promo__bg-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
}

.promo__bg-img {
    position: absolute;
    right: -50px;
    bottom: -50px;
    width: 550px;
    opacity: 0.15;
    filter: grayscale(1);
    transform: rotate(-10deg);
}

.search-bar {
    display: flex;
    align-items: center;
    border: 1px solid var(--color-secondary);
    border-radius: 16px;
    padding: 8px 8px 8px 24px;
    backdrop-filter: blur(12px);
    margin-bottom: 40px;
}

.search-bar:focus-within {
    background: rgba(255, 255, 255, 0.025);
}

.search-bar__input {
    flex: 1;
}

.search-bar__btn {
    padding: 12px;
    display: flex;
}

.search-bar__btn:hover {
    transform: scale(1.05);
}

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

@media (max-width: 1024px) {
    .promo {
        margin-top: 25px;
    }

    .promo__title {
        margin-bottom: 10px;
    }

    .promo__card {
        border: none;
        border-radius: 0px;
        padding: 0px;
    }

    .promo__bg-img {
        display: none;
    }

    .search-bar {
        margin-top: 10px;
        padding: 15px 18px;
        font-size: 16px;
        margin-bottom: 20px;
    }

    .search-bar__btn {
        padding: 0px;
        display: flex;
    }

    .category-btn {
        width: 100%;
        padding: 10px 15px;
        font-size: 14px;
    }
}

@media (max-width: 768px) {
    .promo {
        margin-top: 25px;
    }

    .promo__title {
        margin-bottom: 0px;
    }

    .search-bar {
        margin-top: 10px;
        padding: 10px 18px;
        font-size: 16px;
        margin-bottom: 15px;
    }

    .category-btn {
        width: 100%;
        padding: 10px 5px;
        font-size: 14px;
    }
}
</style>
