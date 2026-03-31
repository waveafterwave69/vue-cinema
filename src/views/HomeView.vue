<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PromoComponent from '@/components/Promo/PromoComponent.vue'
import SwiperComponent from '@/UI/Swiper/SwiperComponent.vue'
import { moviesApi } from '@/services/movies'
import type { Movie } from '@/types/movies'

const bestFilms = ref<Movie[]>([])
const currentPage = ref(1)
const isLoading = ref(false)
const isEnd = ref(false)

const fetchMovies = async () => {
    if (isLoading.value || isEnd.value) return

    isLoading.value = true
    try {
        const movieData = await moviesApi.getMoviesCategory('TOP_250_MOVIES', currentPage.value)

        if (movieData.items.length > 0) {
            bestFilms.value.push(...movieData.items)
            currentPage.value++
        } else {
            isEnd.value = true
        }
    } catch (err) {
        console.error('Ошибка при загрузке фильмов:', err)
    } finally {
        isLoading.value = false
    }
}

const handleLoadMore = () => {
    fetchMovies()
}

onMounted(() => {
    fetchMovies()
})
</script>

<template>
    <main>
        <PromoComponent class="component__margin" />

        <SwiperComponent
            v-if="bestFilms.length"
            :swiperItems="bestFilms"
            swiperTitle="Лучшие фильмы"
            @loadMore="handleLoadMore"
            :isLoading="isLoading"
            class="component__margin"
        />

        <img v-if="isLoading" class="loader" src="../img/spinner.svg" alt="" />
    </main>
</template>

<style scoped>
.component__margin {
    margin-bottom: 50px;
}

.loader {
    width: 120px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    margin-top: -50px;
}

@media (max-width: 768px) {
    .component__margin {
        margin-bottom: 40px;
    }

    .loader {
        width: 100px;
        margin-top: 0px;
    }
}
</style>
