<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGetMovieFrames } from '@/composables/useGetMovieFrames'
import type { MovieFullInfo } from '@/types/movies'

interface Props {
    movie: MovieFullInfo
}

const props = defineProps<Props>()
const { movieImages } = useGetMovieFrames(props.movie.kinopoiskId)

const selectedImage = ref<string | null>(null)
const maxFrames = ref<number>(8)

const isMaxFrames = computed(() => {
    return maxFrames.value < movieImages.value.length
})

const handleShowFrames = () => {
    if (isMaxFrames.value) {
        maxFrames.value += 8
    }
}

const handleResetFrames = () => {
    maxFrames.value = 8
}

const showFrames = computed(() => {
    return movieImages.value.slice(0, maxFrames.value)
})

const openImage = (url: string) => {
    selectedImage.value = url
    document.body.style.overflow = 'hidden'
}

const closeImage = () => {
    selectedImage.value = null
    document.body.style.overflow = ''
}
</script>

<template>
    <section class="frames" v-if="movieImages.length > 0">
        <div class="container">
            <h2 class="frames__title">Кадры из фильма</h2>
            <ul class="frames__list">
                <li
                    v-for="(image, index) in showFrames"
                    :key="index"
                    class="frames__item"
                    @click="openImage(image.imageUrl)"
                >
                    <img
                        :src="image.imageUrl"
                        alt="Кадр из фильма"
                        class="frames__img"
                        loading="lazy"
                    />
                </li>
            </ul>

            <div class="button__row">
                <button
                    @click="handleResetFrames"
                    :class="['button-glass', 'more-button', maxFrames < 9 && 'button-blocked']"
                >
                    Скрыть
                </button>
                <button
                    @click="handleShowFrames"
                    :class="['button-glass', 'more-button', !isMaxFrames && 'button-blocked']"
                >
                    Больше
                </button>
            </div>
        </div>

        <Transition name="fade">
            <div v-if="selectedImage" class="modal" @click="closeImage">
                <img :src="selectedImage" class="modal__content" @click.stop />
            </div>
        </Transition>
    </section>
</template>

<style scoped>
.frames {
    margin-top: 50px;
}

.frames__list {
    display: grid;
    margin-top: 30px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
}

.frames__item {
    overflow: hidden;
    border-radius: 12px;
    aspect-ratio: 16 / 9;
    transition: transform 0.3s ease;
    cursor: pointer;
}

.frames__item:hover {
    transform: translateY(-3px);
}

.frames__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: scale 0.5s ease;
}

.frames__item:hover .frames__img {
    scale: 1.05;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.705);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: zoom-out;
}

.modal__content {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
    cursor: default;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
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
    .frames {
        margin-top: 40px;
    }

    .frames__list {
        margin-top: 30px;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
    }

    .frames__item:hover {
        transform: translateY(-3px);
    }

    .modal__content {
        max-width: 90%;
        max-height: 90%;
    }
}

@media (max-width: 768px) {
    .frames {
        margin-top: 40px;
    }

    .frames__list {
        margin-top: 15px;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 15px;
    }
}

@media (max-width: 425px) {
    .frames {
        margin-top: 30px;
    }

    .frames__list {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    .button__row {
        margin-top: 25px;
        column-gap: 10px;
    }
}
</style>
