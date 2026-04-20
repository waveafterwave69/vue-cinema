<script setup lang="ts">
import MovieAbout from '@/components/MovieSections/MovieAbout.vue'
import MovieActors from '@/components/MovieSections/MovieActors.vue'
import MovieFacts from '@/components/MovieSections/MovieFacts.vue'
import MovieFrames from '@/components/MovieSections/MovieFrames.vue'
import MoviePlatforms from '@/components/MovieSections/MoviePlatforms.vue'
import MoviePromo from '@/components/MovieSections/MoviePromo.vue'
import { moviesApi } from '@/services/movies'
import type { MovieFullInfo } from '@/types/movies'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const movie = ref<MovieFullInfo | null>(null)
const isLoading = ref(true)
const showLater = ref(true)
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
        setTimeout(() => {
            showLater.value = false
        }, 500)
        console.log(movie.value)
    }
})
</script>

<template>
    <main>
        <img v-if="isLoading" class="loading" src="../img/spinner.svg" alt="" />
        <div class="movie" v-if="movie && !isLoading">
            <MoviePromo :movie="movie" />
            <div class="movie" v-if="!showLater && !isLoading">
                <MovieAbout :movie="movie" />
                <MovieFrames :movie="movie" />
                <MoviePlatforms :movie="movie" />
                <MovieActors :movie="movie" />
                <MovieFacts :movie="movie" />
            </div>
        </div>
    </main>
</template>

<style scoped>
.movie {
    margin-bottom: 50px;
}

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
