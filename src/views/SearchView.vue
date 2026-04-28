<script setup lang="ts">
import SearchMovies from '@/components/SearchSections/SearchMovies.vue'
import SearchPromo from '@/components/SearchSections/SearchPromo.vue'
import { useScrollTop } from '@/composables/useScrollTop'

useScrollTop()
</script>

<template>
    <div class="container">
        <SearchPromo />
        <SearchMovies />
    </div>
</template>

<style scoped></style>
