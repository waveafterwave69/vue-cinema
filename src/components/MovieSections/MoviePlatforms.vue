<script setup lang="ts">
import { moviesApi } from '@/services/movies'
import type { Platform } from '@/types/platfrom'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const platforms = ref<Platform[] | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const route = useRoute()

onMounted(async () => {
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

    if (!id) return

    try {
        platforms.value = await moviesApi.getMovieOtherSource(id)
    } catch (err) {
        error.value = 'Не удалось загрузить данные о фильме'
        console.error(err)
    } finally {
        isLoading.value = false
        console.log(platforms.value)
    }
})
</script>

<template>
    <section class="platforms card">
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
