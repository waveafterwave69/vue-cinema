<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'

interface Prize {
    text: string | null
    id: number | string
    img: string
}

interface Props {
    prizes: Prize[]
    buttonText: string
    whellText: string
}

const props = defineProps<Props>()
const isOpen = ref(false)
const rotation = ref(0)
const isSpinning = ref(false)
const winner = ref<Prize | null>(null)

const sectors = computed(() => {
    if (!props.prizes.length) return []
    const angleStep = 360 / props.prizes.length
    return props.prizes.map((prize, i) => {
        const startAngle = i * angleStep
        const endAngle = (i + 1) * angleStep
        const x1 = 100 + 100 * Math.cos((Math.PI * (startAngle - 90)) / 180)
        const y1 = 100 + 100 * Math.sin((Math.PI * (startAngle - 90)) / 180)
        const x2 = 100 + 100 * Math.cos((Math.PI * (endAngle - 90)) / 180)
        const y2 = 100 + 100 * Math.sin((Math.PI * (endAngle - 90)) / 180)
        return {
            ...prize,
            path: `M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`,
            imgRotation: startAngle + angleStep / 2,
            patternId: `pattern-${prize.id}-${i}`,
        }
    })
})

const spin = () => {
    if (isSpinning.value || !props.prizes.length) return
    winner.value = null
    isSpinning.value = true
    rotation.value += 2880 + Math.floor(Math.random() * 360)
    setTimeout(() => {
        isSpinning.value = false
        const actualDeg = rotation.value % 360
        const index =
            Math.floor((360 - actualDeg) / (360 / props.prizes.length)) % props.prizes.length
        winner.value = props.prizes[index] || null
    }, 5000)
}

const toggleWheel = () => {
    if (isSpinning.value) return
    isOpen.value = !isOpen.value
}

watch(isOpen, (newValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})

onUnmounted(() => {
    document.body.style.overflow = ''
})
</script>

<template>
    <button class="wheel__trigger" @click="toggleWheel" :class="{ hidden: isOpen }">
        <span>{{ buttonText }}</span>
    </button>

    <Transition name="fade">
        <div v-if="isOpen" class="wheel__overlay">
            <div class="wheel__modal">
                <slot name="selection-theme" />
                <button class="close__btn" @click="toggleWheel">✕</button>
                <div class="wheel__container">
                    <div class="wheel-outer-decoration"></div>
                    <div class="arrow__container"><div class="arrow"></div></div>

                    <svg
                        viewBox="0 0 200 200"
                        class="wheel__svg"
                        :style="{
                            transform: `rotate(${rotation}deg)`,
                            transition: isSpinning
                                ? 'transform 4.5s cubic-bezier(0.15, 0, 0.15, 1)'
                                : 'none',
                        }"
                    >
                        <defs>
                            <pattern
                                v-for="sector in sectors"
                                :key="sector.patternId"
                                :id="sector.patternId"
                                patternUnits="userSpaceOnUse"
                                width="200"
                                height="200"
                            >
                                <image
                                    :href="sector.img"
                                    x="65"
                                    y="0"
                                    width="70"
                                    height="100"
                                    preserveAspectRatio="xMidYMid slice"
                                    :style="{
                                        transform: `rotate(${sector.imgRotation}deg)`,
                                        transformOrigin: '100px 100px',
                                        opacity: '0.9',
                                    }"
                                />
                            </pattern>
                        </defs>
                        <g v-for="sector in sectors" :key="sector.id">
                            <path
                                :d="sector.path"
                                :fill="`url(#${sector.patternId})`"
                                stroke="rgba(255,215,0,0.5)"
                                stroke-width="0.5"
                            />
                        </g>
                    </svg>

                    <button class="spin__button" @click="spin" :disabled="isSpinning">
                        <div class="spin__button-inner">
                            <span>{{ isSpinning ? '...' : 'GO' }}</span>
                        </div>
                    </button>
                </div>

                <div class="winner__box">
                    <Transition name="slide-up" mode="out-in">
                        <div v-if="winner" :key="winner.id" class="winner-content">
                            <span class="winner__label">ВАШ ВАРИАНТ</span>
                            <h2>
                                <RouterLink class="winner__name" :to="`/film/${winner.id}`">{{
                                    winner.text
                                }}</RouterLink>
                            </h2>
                        </div>
                        <p v-else class="hint__text">{{ whellText }}</p>
                    </Transition>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.wheel__trigger {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 99;
    background: var(--color-gold);
    color: var(--color-bg2);
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 0px 15px rgba(255, 215, 0, 0.3);
    transition: all 0.3s;
}

.wheel__trigger.hidden {
    opacity: 0;
    transform: scale(0);
}

.wheel__overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.wheel__modal {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
}

.close__btn {
    position: absolute;
    top: -30px;
    right: 0;
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.4);
    color: var(--color-main);
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.wheel__container {
    position: relative;
    width: min(80vw, 550px);
    height: min(80vw, 550px);
    background: #000;
    border-radius: 50%;
    padding: 8px;
    box-shadow: 0 0 60px rgba(255, 215, 0, 0.15);
}

.wheel-outer-decoration {
    position: absolute;
    inset: -8px;
    border: 2px dashed var(--color-gold);
    border-radius: 50%;
    opacity: 0.2;
    animation: rotate 20s linear infinite;
}

.wheel__svg {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.arrow__container {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
}

.arrow {
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 30px solid var(--color-gold);
}

.spin__button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 65px;
    height: 65px;
    background: var(--color-bg2);
    border-radius: 50%;
    z-index: 15;
}

.spin__button-inner {
    width: 100%;
    height: 100%;
    background: var(--color-gold);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-bg2);
    font-weight: 900;
}

.winner__box {
    margin-top: 40px;
    height: 100px;
    text-align: center;
}

.winner__label {
    color: var(--color-gold);
    letter-spacing: 4px;
    font-size: 11px;
    font-weight: 700;
}

.winner__name {
    color: var(--color-main);
    font-size: 32px;
    margin-top: 8px;
    font-weight: 800;
    text-decoration: underline;
}

.hint__text {
    color: var(--color-secondary);
    font-style: italic;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-up-enter-active {
    transition: all 0.5s ease-out;
}
.slide-up-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

@media (max-width: 1024px) {
    .wheel__trigger {
        bottom: 15px;
        right: 15px;
        padding: 12px 24px;
        border-radius: 50px;
        gap: 8px;
    }

    .wheel__modal {
        width: 90%;
    }

    .close__btn {
        top: -20px;
        right: 0;
        width: 40px;
        height: 40px;
    }

    .wheel__container {
        width: min(80vw, 450px);
        height: min(80vw, 450px);
    }

    .wheel-outer-decoration {
        inset: -6px;
    }

    .spin__button {
        width: 55px;
        height: 55px;
    }

    .winner__box {
        margin-top: 30px;
        height: 100px;
    }

    .winner__label {
        font-size: 12px;
    }

    .winner__name {
        color: var(--color-main);
        font-size: 32px;
        margin-top: 8px;
        font-weight: 800;
        text-decoration: underline;
    }
}

@media (max-width: 768px) {
    .wheel__trigger {
        bottom: 15px;
        right: 15px;
        padding: 10px 22px;
        gap: 5px;
        font-size: 16px;
    }

    .close__btn {
        top: -30px;
        width: 40px;
        height: 40px;
    }

    .wheel__container {
        width: min(80vw, 430px);
        height: min(80vw, 430px);
    }

    .wheel-outer-decoration {
        inset: -5px;
    }

    .spin__button {
        width: 45px;
        height: 45px;
        font-size: 16px;
    }

    .winner__box {
        margin-top: 20px;
        height: 100px;
        margin-bottom: 20px;
    }

    .winner__label {
        font-size: 12px;
    }

    .winner__name {
        color: var(--color-main);
        font-size: 26px;
        margin-top: 8px;
    }
}

@media (max-width: 425px) {
    .close__btn {
        top: -75px;
        width: 40px;
        height: 40px;
    }

    .wheel__container {
        width: min(80vw, 420px);
        height: min(80vw, 420px);
    }

    .spin__button {
        width: 45px;
        height: 45px;
        font-size: 16px;
    }

    .winner__label {
        font-size: 11px;
    }

    .winner__name {
        color: var(--color-main);
        font-size: 24px;
        margin-top: 8px;
    }
}
</style>
