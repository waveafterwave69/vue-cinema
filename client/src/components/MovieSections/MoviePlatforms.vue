<script setup lang="ts">
import { moviesApi } from '@/services/movies'
import type { MovieFullInfo } from '@/types/movies'
import type { Platform } from '@/types/platfrom'
import { onMounted, ref } from 'vue'

interface Props {
    movie: MovieFullInfo
}

const props = defineProps<Props>()

const platforms = ref<Platform[] | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
    try {
        platforms.value = await moviesApi.getMovieOtherSource(props.movie.kinopoiskId)
    } catch (err) {
        error.value = 'Не удалось загрузить данные о фильме'
        console.error(err)
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <section v-if="platforms && platforms.length > 0" class="platforms card">
        <div class="container">
            <h2 class="about__title">Другие платформы для просмотра</h2>
            <ul class="platforms__list">
                <li class="platforms__item" v-for="(platform, index) in platforms" :key="index">
                    <a :href="platform.url" target="_blank">
                        <img
                            :src="platform.logoUrl"
                            class="platform__img"
                            :alt="platform.platform"
                        />
                    </a>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
.platforms {
    margin-top: 50px;
}

.platforms__list {
    display: flex;
    margin-top: 50px;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 30px;
}

.platform__img {
    border-radius: 15px;
    width: 80px;
}

@media (max-width: 1024px) {
    .platforms {
        margin-top: 50px;
    }

    .platforms__list {
        margin-top: 50px;
        gap: 30px;
    }

    .platform__img {
        width: 70px;
    }
}

@media (max-width: 768px) {
    .platforms {
        margin-top: 40px;
    }

    .platforms__list {
        margin-top: 40px;
        gap: 20px;
    }

    .platform__img {
        width: 60px;
    }
}

@media (max-width: 425px) {
    .platforms {
        margin-top: 35px;
    }

    .platforms__list {
        margin-top: 35px;
        gap: 20px;
    }

    .platform__img {
        width: 50px;
    }
}
</style>
