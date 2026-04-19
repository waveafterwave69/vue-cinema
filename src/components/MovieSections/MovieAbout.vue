<script setup lang="ts">
import type { MovieFullInfo } from '@/types/movies'

interface Props {
    movie: MovieFullInfo
}

defineProps<Props>()
</script>

<template>
    <div class="about card">
        <div class="container">
            <h2 class="about__title">О фильме "{{ movie.nameRu }}"</h2>
            <div class="about__text">
                <p class="description__short">{{ movie.shortDescription }}</p>
                <p>{{ movie.description }}</p>
            </div>

            <div class="about-card__footer">
                <span class="genres__label">Жанры:</span>
                <div class="genres__list">
                    <button
                        v-for="genre in movie.genres"
                        :key="genre.genre"
                        class="genre__tag button-glass"
                    >
                        {{ genre.genre }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.description__short {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.4;
}

.about__text {
    font-size: 18px;
    line-height: 1.8;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    row-gap: 13px;
}

.about-card__footer {
    margin-top: 50px;
    padding-top: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
}

.genres__label {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--color-secondary);
}

.genres__list {
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
}

.genre__tag {
    padding: 8px 18px;
    font-size: 14px;
}

@media (max-width: 1024px) {
    .description__short {
        font-size: 19px;
    }

    .about__text {
        font-size: 17px;
        line-height: 1.8;
        margin-top: 30px;
    }

    .about-card__footer {
        margin-top: 30px;
        padding-top: 30px;
    }

    .genres__label {
        font-size: 14px;
    }

    .genres__list {
        column-gap: 10px;
    }

    .genre__tag {
        padding: 8px 18px;
        font-size: 14px;
    }
}

@media (max-width: 768px) {
    .description__short {
        font-size: 18px;
    }

    .about__text {
        font-size: 16px;
        margin-top: 20px;
    }

    .about-card__footer {
        margin-top: 25px;
        padding-top: 25px;
    }

    .genres__label {
        font-size: 12px;
    }

    .genres__list {
        column-gap: 8px;
    }

    .genre__tag {
        padding: 7px 15px;
        font-size: 13px;
    }
}

@media (max-width: 425px) {
    .about-card__footer {
        margin-top: 20px;
        padding-top: 20px;
    }

    .description__short {
        display: none;
    }
}
</style>
