<script setup lang="ts">
import { ref, computed } from 'vue'

const mediaId = ref('258687')
const mediaType = ref<'kp' | 'imdb'>('kp')
const selectedSource = ref<'reyohoho' | 'flcksbr' | 'kinobox'>('reyohoho')

// Определяем тип ID
const detectType = (id: string) => {
    const trimmed = id.trim()
    if (/^tt\d+$/i.test(trimmed)) return 'imdb'
    if (/^\d+$/.test(trimmed)) return 'kp'
    return null
}

// Обновляем тип
const updateType = () => {
    const type = detectType(mediaId.value)
    if (type) mediaType.value = type
}

// URL плеера в зависимости от выбранного источника
const playerUrl = computed(() => {
    const id = mediaId.value.trim()
    if (!id) return ''

    const type = detectType(id)
    if (!type) return ''

    switch (selectedSource.value) {
        case 'reyohoho':
            // Reyohoho — работает с KP ID через #
            if (type === 'kp') return `https://reyohoho.vercel.app/#${id}`
            // IMDb ID
            return `https://reyohoho.vercel.app/#${id}`

        case 'flcksbr':
            // Flicksbar — только KP ID
            if (type === 'kp') return `https://flcksbr.top/film/${id}/`
            return '' // IMDb не поддерживается

        case 'kinobox':
            // Kinobox — только KP ID
            if (type === 'kp') return `https://kinobox.tv/${id}`
            return ''

        default:
            return ''
    }
})

// Название для отображения
const mediaTitle = computed(() => {
    const id = mediaId.value.trim()
    if (!id) return '—'

    const examples: Record<string, string> = {
        '258687': 'Интерстеллар',
        '326': 'Побег из Шоушенка',
        '435': 'Зеленая миля',
        tt0816692: 'Интерстеллар',
        tt0111161: 'Побег из Шоушенка',
    }

    return examples[id] || `${mediaType.value === 'kp' ? 'KP' : 'IMDb'}: ${id}`
})

const setExample = (value: string) => {
    mediaId.value = value
    updateType()
}
</script>

<template>
    <div class="player-container">
        <h2>🎬 Видео плеер</h2>

        <!-- Выбор источника -->
        <div class="source-selector">
            <label class="source-option">
                <input type="radio" value="reyohoho" v-model="selectedSource" />
                <span>Reyohoho</span>
            </label>
            <label class="source-option">
                <input type="radio" value="flcksbr" v-model="selectedSource" />
                <span>Flicksbar</span>
            </label>
            <label class="source-option">
                <input type="radio" value="kinobox" v-model="selectedSource" />
                <span>Kinobox</span>
            </label>
        </div>

        <div class="iframe-wrapper">
            <iframe
                v-if="playerUrl"
                :src="playerUrl"
                frameborder="0"
                allowfullscreen
                scrolling="no"
                :key="playerUrl"
            ></iframe>
            <div v-else class="placeholder">
                ⚠️
                {{
                    selectedSource === 'flcksbr' || selectedSource === 'kinobox'
                        ? 'Этот источник работает только с Kinopoisk ID (число)'
                        : 'Введите корректный ID'
                }}
            </div>
        </div>

        <div class="controls">
            <input
                v-model="mediaId"
                @input="updateType"
                type="text"
                placeholder="258687 или tt0816692"
            />

            <div class="info">
                <p>📺 {{ mediaTitle }}</p>
                <p class="source-info">
                    Источник: <strong>{{ selectedSource }}</strong> |
                    {{ mediaType === 'kp' ? 'KP ID' : 'IMDb ID' }}
                </p>
            </div>

            <div class="examples">
                <button @click="setExample('258687')">🌌 Интерстеллар (KP)</button>
                <button @click="setExample('tt0816692')">🌌 Интерстеллар (IMDb)</button>
                <button @click="setExample('326')">🏢 Побег из Шоушенка (KP)</button>
            </div>

            <p class="hint">
                💡 Reyohoho — лучший выбор, работает с IMDb<br />
                🎥 Flicksbar/Kinobox — только KP ID
            </p>
        </div>
    </div>
</template>

<style scoped>
.player-container {
    max-width: 900px;
    margin: 0 auto;
    font-family: system-ui, sans-serif;
    padding: 20px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.source-selector {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 20px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 12px;
}

.source-option {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 20px;
    transition: background 0.2s;
}

.source-option:hover {
    background: #e0e0e0;
}

.source-option input {
    margin: 0;
}

.iframe-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    background: #000;
    border-radius: 12px;
    overflow: hidden;
}

.iframe-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

.placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1a1a1a;
    color: #888;
    text-align: center;
    border-radius: 12px;
}

.controls {
    margin-top: 20px;
}

input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    box-sizing: border-box;
}

.info {
    margin: 15px 0;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
    text-align: center;
}

.info p {
    margin: 5px 0;
}

.source-info {
    font-size: 13px;
    color: #666;
}

.examples {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin: 15px 0;
}

.examples button {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
}

.examples button:hover {
    background: #0056b3;
}

.hint {
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-top: 15px;
    padding-top: 10px;
    border-top: 1px solid #eee;
}
</style>
