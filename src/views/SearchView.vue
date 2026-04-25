<script setup lang="ts">
import SearchPromo from '@/components/SearchSections/SearchPromo.vue'
import type { CollectionsType } from '@/types/movies'
import { ref } from 'vue'

const currentTheme = ref<CollectionsType>('POPULAR_SERIES')

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
    </div>
</template>

<style scoped></style>
