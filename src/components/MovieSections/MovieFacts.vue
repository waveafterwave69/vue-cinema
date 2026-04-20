<script setup lang="ts">
import { moviesApi } from '@/services/movies'
import type { MovieFact } from '@/types/facts'
import type { MovieFullInfo } from '@/types/movies'
import { onMounted, ref, computed } from 'vue'

interface Props {
    movie: MovieFullInfo
}

const props = defineProps<Props>()
const facts = ref<MovieFact[]>([])
const showSpoilers = ref(false)

const maxFacts = ref<number>(3)

const isMaxFacts = computed(() => {
    return maxFacts.value < facts.value.length
})

const handleShowFacts = () => {
    if (isMaxFacts.value) {
        maxFacts.value += 3
    }
}

const handleResetFacts = () => {
    maxFacts.value = 3
}

const filteredFacts = computed(() => {
    return showSpoilers.value ? facts.value : facts.value.filter((f) => !f.spoiler)
})

const showFacts = computed(() => {
    return filteredFacts.value.slice(0, maxFacts.value)
})

onMounted(async () => {
    try {
        facts.value = await moviesApi.getMovieFacts(props.movie.kinopoiskId)
    } catch (err) {
        console.error('Ошибка при загрузке фактов:', err)
    }
})
</script>

<template>
    <section class="facts card">
        <div class="container">
            <div class="facts__header">
                <h2 class="facts__title">Факты о фильме</h2>

                <div class="facts__filter">
                    <span class="filter-label">Фильтр:</span>
                    <div class="select-wrapper">
                        <select
                            v-model="showSpoilers"
                            id="facts__type"
                            class="button-glass select-input"
                        >
                            <option :value="false">Без спойлеров</option>
                            <option :value="true">Все подробности</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="facts__grid">
                <div
                    v-for="(fact, index) in showFacts"
                    :key="index"
                    class="fact-card"
                    :class="{ 'fact-card--spoiler': fact.spoiler }"
                >
                    <div class="fact-card__body">
                        <div class="fact-card__icon">
                            <span v-if="fact.spoiler">⚠️</span>
                            <span v-else>✨</span>
                        </div>
                        <p class="fact-card__text" v-html="fact.text"></p>
                    </div>
                    <div v-if="fact.spoiler" class="fact-card__badge">Спойлер</div>
                </div>
            </div>

            <div class="button__row">
                <button
                    @click="handleResetFacts"
                    :class="['button-glass', 'more-button', maxFacts < 9 && 'button-blocked']"
                >
                    Скрыть
                </button>
                <button
                    @click="handleShowFacts"
                    :class="['button-glass', 'more-button', !isMaxFacts && 'button-blocked']"
                >
                    Больше
                </button>
            </div>

            <div v-if="filteredFacts.length === 0" class="facts__empty">
                Интересных фактов пока не добавлено
            </div>
        </div>
    </section>
</template>

<style scoped>
.facts {
    margin-top: 60px;
    display: flex;
    justify-content: center;
}

.facts__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 40px;
    gap: 20px;
}

.facts__filter {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.filter-label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0.5;
    font-weight: 700;
    margin-left: 4px;
}

.select-input {
    appearance: none;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 10px 40px 10px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    outline: none;
    transition: 0.3s;
}

.select-input option {
    background-color: var(--color-bg2);
    padding: 10px;
    font-size: 14px;
}

.select-input:hover {
    background: rgba(255, 255, 255, 0.15);
}

.facts__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(auto, 1fr));
    gap: 20px;
}

.fact-card {
    position: relative;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 24px;
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.fact-card:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
}

.fact-card--spoiler {
    border-left: 2px solid #e74c3c;
}

.fact-card__body {
    display: flex;
    gap: 16px;
}

.fact-card__icon {
    font-size: 20px;
    opacity: 0.8;
}

.fact-card__text {
    font-size: 16px;
    line-height: 1.6;
    opacity: 0.9;
    margin: 0;
}

.fact-card__badge {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #e74c3c;
    color: white;
    font-size: 10px;
    font-weight: 900;
    padding: 4px 12px;
    border-top-left-radius: 12px;
    text-transform: uppercase;
}

:deep(a) {
    color: #42b983;
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    transition: 0.3s;
}

:deep(a:hover) {
    border-bottom-color: #42b983;
}

.facts__empty {
    text-align: center;
    padding: 100px 0;
    opacity: 0.4;
    font-size: 18px;
}

.button__row {
    margin-top: 25px;
    display: flex;
    align-items: center;
    column-gap: 20px;
    justify-content: center;
}

.button-blocked {
    cursor: not-allowed;
    opacity: 0.4;
}

@media (max-width: 1024px) {
    .facts {
        margin-top: 50px;
    }

    .facts__header {
        margin-bottom: 30px;
    }

    .select-input {
        padding: 10px 20px 10px 20px;
    }

    .facts__grid {
        gap: 15px;
    }

    .fact-card {
        padding: 20px;
    }

    .fact-card__body {
        gap: 12px;
    }

    .fact-card__icon {
        font-size: 20px;
    }

    .fact-card__text {
        font-size: 16px;
    }

    .button__row {
        margin-top: 20px;
        column-gap: 15px;
    }
}

@media (max-width: 768px) {
    .facts {
        margin-top: 50px;
    }

    .facts__header {
        flex-wrap: wrap;
        margin-bottom: 30px;
    }

    .facts__filter {
        gap: 8px;
    }

    .filter-label {
        font-size: 12px;
        margin-left: 4px;
    }

    .select-input {
        padding: 8px 20px 8px 15px;
        font-size: 14px;
    }

    .facts__grid {
        gap: 10px;
    }

    .fact-card {
        padding: 15px;
    }

    .fact-card__body {
        gap: 10px;
    }

    .fact-card__icon {
        font-size: 18px;
    }

    .button__row {
        margin-top: 20px;
        column-gap: 15px;
    }
}

@media (max-width: 425px) {
    .facts {
        margin-top: 30px;
    }

    .facts__header {
        margin-bottom: 20px;
    }

    .filter-label {
        font-size: 12px;
        margin-left: 4px;
    }

    .facts__grid {
        gap: 8px;
    }

    .fact-card {
        padding: 13px;
    }

    .button__row {
        column-gap: 10px;
    }
}
</style>
