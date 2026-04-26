<script setup lang="ts">
import SearchMovies from '@/components/SearchSections/SearchMovies.vue'
import SearchPromo from '@/components/SearchSections/SearchPromo.vue'
import type { CollectionsType } from '@/types/movies'
import { ref } from 'vue'

const currentTheme = ref<CollectionsType>('TOP_POPULAR_ALL')

const searchValue = ref<string>('')

const changeTheme = (newTheme: CollectionsType) => {
    console.log(newTheme)
    currentTheme.value = newTheme
}
</script>

<template>
    <div class="container">
        <SearchPromo
            v-model:searchValue="searchValue"
            :currentTheme="currentTheme"
            @change-theme="changeTheme"
        />
        <SearchMovies :searchValue="searchValue" :currentTheme="currentTheme" />
    </div>
</template>

<style scoped></style>
