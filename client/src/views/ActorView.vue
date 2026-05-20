<script setup lang="ts">
import ActorMovies from '@/components/ActorSections/ActorMovies.vue'
import ActorPromo from '@/components/ActorSections/ActorPromo.vue'
import { useScrollTop } from '@/composables/useScrollTop'
import { actorsApi } from '@/services/actors'
import type { Actor } from '@/types/actors'
import type { Movie } from '@/types/movies'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const actor = ref<Actor | null>(null)
const actorMovies = ref<Movie[] | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const route = useRoute()

onMounted(async () => {
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

    if (!id) return

    try {
        const actorData = await actorsApi.getActorInfo(id)
        actor.value = actorData
        actorMovies.value = actorData.films
        console.log(actor.value)
    } catch (err) {
        error.value = 'Не удалось загрузить данные'
        console.error(err)
    } finally {
        isLoading.value = false
    }
})

useScrollTop()
</script>

<template>
    <div v-if="actor" class="actor">
        <ActorPromo :actor="actor" />
        <ActorMovies id="movies-section" v-if="actorMovies" :movies="actorMovies" />
    </div>
</template>

<style scoped>
.actor {
    background-color: #131313;
}
</style>
