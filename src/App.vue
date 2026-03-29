<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/Header/HeaderComponent.vue'
</script>

<template>
    <div class="container">
        <HeaderComponent />
        <RouterView />
    </div>
</template>
