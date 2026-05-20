<script setup lang="ts">
import { moviesApi } from '@/services/movies'
import type { Actor } from '@/types/actors'
import type { MovieFullInfo } from '@/types/movies'
import SwiperComponent from '@/UI/Swiper/SwiperComponent.vue'
import { SwiperSlide } from 'swiper/vue'
import { onMounted, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
    movie: MovieFullInfo
}

const props = defineProps<Props>()

const actors = ref<Actor[]>([])
const currentPage = ref(1)
const isLoading = ref(false)
const isEnd = ref(false)

const failedActorIds = ref<number[]>([])

const fetchMovies = async () => {
    if (isLoading.value || isEnd.value) return

    isLoading.value = true
    try {
        const actorsData = await moviesApi.getMovieActors(props.movie.kinopoiskId)

        if (actorsData.length) {
            actors.value.push(...actorsData)
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

const validActors = computed(() => {
    return actors.value.filter((actor) => {
        return actor.posterUrl && actor.staffId && !failedActorIds.value.includes(actor.staffId)
    })
})

const handleImageError = (id: number) => {
    if (id && !failedActorIds.value.includes(id)) {
        failedActorIds.value.push(id)
    }
}

onMounted(fetchMovies)
</script>

<template>
    <div class="actors">
        <div class="container">
            <SwiperComponent
                :slidesPerView="7"
                :slidesPerViewMedium="6"
                :slidesPerViewSmall="4"
                v-if="validActors.length"
                swiperTitle="Актёры"
                @loadMore="fetchMovies"
            >
                <SwiperSlide v-for="actor in validActors" :key="actor.staffId">
                    <RouterLink :to="`/name/${actor.staffId}`">
                        <div class="actor__poster">
                            <img
                                :src="actor.posterUrl"
                                :alt="actor.nameRu"
                                class="card__img"
                                loading="lazy"
                                @error="handleImageError(actor.staffId)"
                            />
                            <p class="actor__name">{{ actor.nameRu }}</p>
                        </div>
                    </RouterLink>
                </SwiperSlide>
            </SwiperComponent>
        </div>
    </div>
</template>

<style scoped>
.actors {
    margin-top: 50px;
}

.card__img {
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 3;
    border-radius: 8px;
    display: block;
    object-fit: cover;
}

.actor__poster {
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 3;
    border-radius: 8px;
    display: block;
    object-fit: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.actor__name {
    color: var(--color-main);
    text-align: center;
}

.movie__rating {
    position: absolute;
    top: 8px;
    left: 8px;
    background-color: var(--color-gold);
    color: var(--color-bg2);
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 13px;
    z-index: 10;
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

    .actor__name {
        font-size: 14px;
    }
}
</style>
