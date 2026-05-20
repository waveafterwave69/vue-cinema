<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import { provide, ref } from 'vue'
import type { CollectionsType } from './types/movies'

const currentTheme = ref<CollectionsType>('TOP_POPULAR_ALL')

const searchValue = ref<string>('')

const changeTheme = (newTheme: CollectionsType) => {
    console.log(newTheme)
    currentTheme.value = newTheme
}

provide('current-theme', currentTheme)
provide('change-theme', changeTheme)
provide('search-value', searchValue)
</script>

<template>
    <HeaderComponent />
    <RouterView :key="$route.fullPath" />
</template>
