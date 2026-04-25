<script setup lang="ts">
import SearchPromo from '@/components/SearchSections/SearchPromo.vue'
import type { CollectionsType } from '@/types/movies'
import { ref } from 'vue'

const currentTheme = ref<CollectionsType>('POPULAR_SERIES')

const changeTheme = (newTheme: CollectionsType) => {
    console.log(newTheme)
    currentTheme.value = newTheme
}
</script>

<template>
    <div class="container">
        <SearchPromo :currentTheme="currentTheme" @changeTheme="changeTheme" />
    </div>
</template>

<style scoped></style>
