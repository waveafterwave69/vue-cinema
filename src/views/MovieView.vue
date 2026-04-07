<script setup lang="ts">
import MoviePromo from '@/components/Movie/Promo/MoviePromo.vue'
import { moviesApi } from '@/services/movies'
import type { MovieFullInfo } from '@/types/movies'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const movie = ref<MovieFullInfo | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const route = useRoute()

onMounted(async () => {
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

    if (!id) return

    try {
        movie.value = await moviesApi.getMovieInfo(id)
    } catch (err) {
        error.value = 'Не удалось загрузить данные о фильме'
        console.error(err)
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <main>
        <img v-if="isLoading" class="loading" src="../img/spinner.svg" alt="" />
        <MoviePromo v-if="movie && !isLoading" :movie="movie" />
    </main>
</template>

<style scoped>
.loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
