<script setup lang="ts">
import WheelOfFortune from '@/UI/WheelOfFortune/WheelOfFortune.vue'
import { onMounted, ref, watch } from 'vue'
import { moviesApi } from '@/services/movies'
import { type CollectionsType, type Movie } from '@/types/movies'
import { searchCollection } from '@/static/static'
import { firstLetterUpCase } from '@/utils/formatters'
import { useRandomNumber } from 'wave-hooks'
import wheelAudio from '../sounds/wheel-of-fortune.mp3'

const movies = ref<Movie[]>([])
const category = ref<CollectionsType>('TOP_250_MOVIES')
const { refresh } = useRandomNumber(1, 10)
const isLoading = ref(false)
const isEnd = ref(false)

const fetchMovies = async () => {
    if (isLoading.value || isEnd.value) return
    isLoading.value = true
    try {
        const movieData = await moviesApi.getMoviesCategory(category.value, 1)
        movies.value = movieData.items
    } catch (err) {
        console.error('Ошибка загрузки фильмов:', err)
    } finally {
        isLoading.value = false
    }
}

onMounted(fetchMovies)

watch(category, () => {
    refresh()
    fetchMovies()
})
</script>

<template>
    <div>
        <WheelOfFortune
            v-if="movies.length"
            :prizes="
                movies.slice(0, 14).map((m) => ({
                    text: m.nameRu || m.nameEn,
                    id: m.kinopoiskId,
                    img: m.posterUrl,
                }))
            "
            buttonText="🎡 Рандомайзер"
            whellText="Крути колесо, чтобы выбрать фильм!"
            :audio="wheelAudio"
        >
            <template v-slot:selection-theme>
                <div class="select__container">
                    <label for="category__select" class="select__label">Категория поиска:</label>
                    <select id="category__select" v-model="category" class="custom__select">
                        <option
                            :value="collection.type"
                            v-for="collection in searchCollection"
                            :key="collection.id"
                        >
                            {{ firstLetterUpCase(collection.name) }}
                        </option>
                    </select>
                </div>
            </template>
        </WheelOfFortune>
    </div>
</template>

<style scoped>
.select__container {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
}

.select__label {
    color: var(--color-secondary);
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.custom__select {
    width: 100%;
    max-width: 300px;
    padding: 12px 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 12px;
    color: var(--color-main);
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    appearance: none;
}

.custom__select:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: var(--color-gold, #ffd700);
}

.custom__select:focus {
    border-color: var(--color-gold, #ffd700);
}

.custom__select option {
    background-color: var(--color-bg2);
    color: var(--color-main);
    padding: 10px;
}

@media (max-width: 768px) {
    .select__container {
        gap: 10px;
    }

    .select__label {
        font-size: 12px;
    }

    .custom__select {
        width: 100%;
        max-width: 300px;
        padding: 10px 19px;
        font-size: 16px;
    }
}

@media (max-width: 425px) {
    .select__container {
        gap: 10px;
    }

    .select__label {
        font-size: 12px;
    }

    .custom__select {
        width: 100%;
        max-width: 250px;
        padding: 8px 17px;
        font-size: 14px;
    }
}
</style>
