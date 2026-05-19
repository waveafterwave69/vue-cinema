<script setup lang="ts">
import { moviesApi } from '@/services/movies'
import type { Awards } from '@/types/awards'
import type { MovieFullInfo } from '@/types/movies'
import ShowResetButtons from '@/UI/Buttons/ShowResetButtons.vue'
import { onMounted, ref, computed } from 'vue'

interface Props {
    movie: MovieFullInfo
}

const props = defineProps<Props>()
const awards = ref<Awards[]>([])
const filterWinOnly = ref(false)

const maxAwards = ref(4)

const isMaxAwards = computed(() => {
    return maxAwards.value < awards.value.length
})

const handleShowAwards = () => {
    if (isMaxAwards.value) {
        maxAwards.value += 4
    }
}

const handleResetAwards = () => {
    maxAwards.value = 4
}

const filteredAwards = computed(() => {
    return filterWinOnly.value ? awards.value.filter((award) => award.win) : awards.value
})

const showdAwards = computed(() => {
    return filteredAwards.value.slice(0, maxAwards.value)
})

onMounted(async () => {
    try {
        const response = await moviesApi.getMovieAwards(props.movie.kinopoiskId)
        awards.value = response || []
    } catch (err) {
        console.error('Ошибка при загрузке наград:', err)
    }
})
</script>

<template>
    <section class="awards" v-if="awards.length > 0">
        <div class="container">
            <div class="awards__header">
                <h2 class="awards__title">Награды и номинации</h2>
                <div class="awards__filter">
                    <span class="filter__label">Показать:</span>
                    <div class="select-wrapper">
                        <select
                            v-model="filterWinOnly"
                            class="select-input"
                            @change="handleResetAwards"
                        >
                            <option :value="false">Все события</option>
                            <option :value="true">🏆 Только победы</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="awards__grid">
                <div v-for="(award, index) in showdAwards" :key="index" class="award-card">
                    <div class="award-card__main">
                        <div class="award-card__image-box">
                            <img :src="award.imageUrl" :alt="award.name" class="award-icon" />
                            <div v-if="award.win" class="win-badge">Победитель</div>
                        </div>
                        <div class="award-card__content">
                            <span class="award-year">{{ award.year }}</span>
                            <h3 class="award-name">{{ award.name }}</h3>
                            <p class="award-nomination">{{ award.nominationName }}</p>
                        </div>
                    </div>
                    <div v-if="award.persons?.length" class="award-persons">
                        <div v-for="person in award.persons" :key="person.kinopoiskId">
                            <RouterLink
                                v-if="person.nameRu"
                                :to="`/name/${person.kinopoiskId}`"
                                class="person-tag"
                            >
                                <img
                                    :src="person.posterUrl"
                                    :alt="person.nameRu"
                                    class="person-avatar"
                                />
                                <span class="person-name">{{ person.nameRu }}</span>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>

            <ShowResetButtons
                @reset="handleResetAwards"
                @show="handleShowAwards"
                :isResetBlocked="maxAwards < 5"
                :isShowBlocked="!isMaxAwards"
            />

            <div v-if="filteredAwards.length === 0" class="empty-state">
                Наград в этой категории не найдено
            </div>
        </div>
    </section>
</template>

<style scoped>
.awards {
    margin-top: 50px;
}

.awards__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 48px;
    gap: 20px;
}

.awards__filter {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.filter__label {
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

.awards__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
}

.award-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 24px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.award-card:hover {
    background: rgba(255, 255, 255, 0.07);
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.15);
}

.award-card__main {
    display: flex;
    gap: 20px;
}

.award-card__image-box {
    position: relative;
    flex-shrink: 0;
}

.award-icon {
    width: 80px;
    height: 110px;
    object-fit: contain;
}

.win-badge {
    position: absolute;
    top: -10px;
    left: -10px;
    background: var(--color-gold);
    color: var(--color-bg2);
    font-size: 9px;
    font-weight: 900;
    padding: 4px 8px;
    border-radius: 6px;
    text-transform: uppercase;
}

.award-year {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-gold);
    margin-bottom: 4px;
    display: block;
}

.award-name {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px 0;
    line-height: 1.2;
}

.award-nomination {
    font-size: 15px;
    opacity: 0.6;
    margin: 0;
    line-height: 1.4;
}

.award-persons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.person-tag {
    color: var(--color-main);
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.05);
    padding: 4px 12px 4px 6px;
    border-radius: 30px;
}

.person-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
}

.person-name {
    font-size: 12px;
    font-weight: 500;
    opacity: 0.8;
}

.awards__actions {
    display: flex;
    justify-content: center;
    margin-top: 25px;
}

@media (max-width: 1024px) {
    .awards {
        margin-top: 50px;
    }

    .awards__header {
        margin-bottom: 30px;
        gap: 20px;
    }

    .awards__filter {
        gap: 8px;
    }

    .awards__grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 10px;
    }

    .award-card {
        padding: 20px;
        gap: 10px;
    }

    .award-card__main {
        gap: 20px;
    }

    .award-icon {
        width: 70px;
        height: 100px;
    }

    .win-badge {
        position: absolute;
        top: -18px;
        left: -20px;
        border-radius: 8px;
    }

    .award-year {
        font-size: 14px;
    }

    .award-name {
        font-size: 20px;
        margin: 0 0 5px 0;
    }

    .award-nomination {
        font-size: 15px;
    }

    .award-persons {
        gap: 5px;
        padding-top: 15px;
    }

    .person-tag {
        gap: 8px;
        padding: 3px 11px 3px 5px;
    }

    .person-avatar {
        width: 22px;
        height: 22px;
    }

    .person-name {
        font-size: 12px;
    }

    .select-input {
        padding: 10px 20px 10px 20px;
    }
}

@media (max-width: 768px) {
    .awards {
        margin-top: 40px;
    }

    .awards__header {
        margin-bottom: 30px;
        gap: 20px;
        flex-wrap: wrap;
    }

    .awards__filter {
        gap: 8px;
    }

    .awards__grid {
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        gap: 8px;
    }

    .award-card {
        padding: 0px 10px 12px 10px;
        gap: 5px;
    }

    .award-card__main {
        gap: 0px;
        flex-direction: column;
        align-items: center;
    }

    .award-card__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .award-icon {
        width: 65px;
        height: 95px;
    }

    .win-badge {
        display: none;
    }

    .award-year {
        font-size: 12px;
    }

    .award-name {
        font-size: 16px;
        margin: 0 0 2px 0;
    }

    .award-nomination {
        font-size: 14px;
    }

    .award-persons {
        padding-top: 10px;
        justify-content: center;
        align-items: center;
    }

    .person-tag {
        gap: 8px;
        padding: 3px 11px 3px 10px;
    }

    .person-avatar {
        display: none;
    }

    .person-name {
        font-size: 11px;
    }

    .select-input {
        padding: 8px 20px 8px 15px;
        font-size: 14px;
    }
}
</style>
