<script setup lang="ts">
import ActorPromo from '@/components/ActorSections/ActorPromo.vue'
import { useScrollTop } from '@/composables/useScrollTop'
import { actorsApi } from '@/services/actors'
import type { Actor } from '@/types/actors'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const actor = ref<Actor | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const route = useRoute()

onMounted(async () => {
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

    if (!id) return

    try {
        actor.value = await actorsApi.getActorInfo(id)
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
    <div v-if="actor">
        <ActorPromo :actor="actor" />
    </div>
</template>

<style scoped></style>
