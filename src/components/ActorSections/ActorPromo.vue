<script setup lang="ts">
import type { Actor } from '@/types/actors'
import { formatAge } from '@/utils/formatters'
import { motion } from 'motion-v'
import { computed } from 'vue'

interface Props {
    actor: Actor
}

const props = defineProps<Props>()

const professions = computed(() => {
    return props.actor.profession?.split(', ').join(' • ')
})

const randomFact = computed(() => {
    if (!props.actor.facts?.length) return null
    const fact = props.actor.facts[Math.floor(Math.random() * props.actor.facts.length)]
    return fact
})
</script>

<template>
    <motion.section
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1.2 }"
    >
        <div class="actor-hero__bg">
            <img :src="actor.posterUrl" alt="" />
        </div>

        <div class="actor-hero__container container">
            <motion.div
                class="actor-hero__poster-wrapper"
                :initial="{ x: -50, opacity: 0 }"
                :animate="{ x: 0, opacity: 1 }"
                :transition="{ delay: 0.3, duration: 0.8 }"
            >
                <img :src="actor.posterUrl" :alt="actor.nameRu" class="actor-hero__poster" />
            </motion.div>

            <div class="actor-hero__info">
                <motion.div
                    :initial="{ y: 20, opacity: 0 }"
                    :animate="{ y: 0, opacity: 1 }"
                    :transition="{ delay: 0.3, duration: 0.8 }"
                >
                    <div class="actor-hero__head">
                        <h1 class="actor-hero__title">{{ actor.nameRu }}</h1>
                        <p class="actor-hero__en-name">{{ actor.nameEn }}</p>
                    </div>

                    <div class="actor-hero__meta">
                        <div class="meta-badge" v-if="actor.age">{{ formatAge(actor.age) }}</div>
                        <span class="meta-dot"></span>
                        <span class="meta-item">{{ actor.birthplace }}</span>
                    </div>

                    <p class="actor-hero__professions">{{ professions }}</p>

                    <div v-if="randomFact" class="actor-hero__quote">
                        <p class="quote-text">{{ randomFact }}</p>
                    </div>

                    <div class="actor-hero__footer">
                        <div class="actor-hero__actions">
                            <button class="button-default">Полная биография</button>
                            <button class="button-glass">
                                Фильмография <span>({{ actor.films?.length }})</span>
                            </button>
                        </div>

                        <div class="actor-hero__social">
                            <button class="btn-icon">
                                <img src="../../img/heart.png" alt="" />
                            </button>
                            <button class="btn-icon">
                                <img src="../../img/like.png" alt="" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </motion.section>
</template>

<style scoped>
.actor-hero__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
}

.actor-hero__bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(100px) brightness(0.2);
}

.actor-hero__bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 50%, transparent 0%, #0a0a0a 80%);
}

.actor-hero__container {
    margin-top: 50px;
    position: relative;
    z-index: 1;
    display: flex;
    column-gap: 50px;
}

.actor-hero__poster-wrapper {
    position: relative;
    aspect-ratio: 2/3;
    border-radius: 24px;
    width: 400px;
    overflow: hidden;
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.actor-hero__poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.actor-hero__title {
    font-size: 62px;
    font-weight: 900;
    line-height: 1;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: -2px;
}

.actor-hero__en-name {
    font-size: 22px;
    opacity: 0.4;
    margin: 10px 0 30px;
    letter-spacing: 4px;
    text-transform: uppercase;
}

.actor-hero__meta {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 25px;
}

.meta-badge {
    background: rgba(255, 255, 255, 0.1);
    padding: 6px 16px;
    border-radius: 100px;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.meta-dot {
    width: 5px;
    height: 5px;
    background: var(--color-gold, #ffd700);
    border-radius: 50%;
}

.meta-item {
    font-size: 18px;
}

.actor-hero__professions {
    font-size: 16px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-gold, #ffd700);
    margin-bottom: 30px;
    font-weight: 700;
}

.actor-hero__quote {
    position: relative;
    padding-left: 25px;
    margin-bottom: 40px;
    border-left: 3px solid rgba(255, 255, 255, 0.1);
}

.quote-text {
    font-size: 18px;
    line-height: 1.6;
    font-style: italic;
    color: rgba(255, 255, 255, 0.6);
}

.actor-hero__footer {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.actor-hero__actions {
    display: flex;
    gap: 15px;
}

.actor-hero__social {
    display: flex;
    gap: 15px;
}

.btn-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
}

.btn-icon:hover {
    background: rgba(255, 255, 255, 0.2);
}

.btn-icon img {
    width: 25px;
    filter: brightness(2);
}

@media (max-width: 1024px) {
    .actor-hero__container {
        column-gap: 30px;
        margin-top: 30px;
    }

    .actor-hero__poster-wrapper {
        width: 320px;
    }

    .actor-hero__title {
        font-size: 48px;
    }

    .actor-hero__bg::after {
        background: radial-gradient(circle at 50% 50%, transparent 0%, #0a0a0a 90%);
    }
}

@media (max-width: 768px) {
    section {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100vh;
        top: -140px;
    }

    .actor-hero__container {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 30px;
        margin-top: 170px;
        padding-bottom: 100px;
    }

    .actor-hero__poster-wrapper {
        width: 280px;
        margin: 0 auto;
    }

    .actor-hero__meta {
        justify-content: center;
    }

    .actor-hero__quote {
        padding-left: 0;
        border-left: none;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 20px;
    }

    .actor-hero__actions {
        justify-content: center;
    }

    .actor-hero__social {
        justify-content: center;
    }
}

@media (max-width: 425px) {
    section {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100vh;
        top: -80px;
    }

    .actor-hero__container {
        margin-top: 100px;
        padding: 0 15px;
        padding-bottom: 50px;
    }

    .actor-hero__poster-wrapper {
        width: 100%;
        max-width: 240px;
    }

    .actor-hero__title {
        font-size: 26px;
        letter-spacing: -1px;
    }

    .actor-hero__en-name {
        font-size: 14px;
        letter-spacing: 2px;
        margin-bottom: 10px;
    }

    .actor-hero__meta {
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 15px;
    }

    .meta-item {
        font-size: 14px;
        width: 100%;
    }

    .meta-dot {
        display: none;
    }

    .actor-hero__professions {
        font-size: 14px;
    }

    .actor-hero__actions {
        flex-direction: column;
        width: 100%;
    }

    .quote-text {
        font-size: 16px;
    }

    .btn-icon {
        width: 50px;
        height: 50px;
    }
}
</style>
