<script setup lang="ts">
interface Props {
    isLoading: boolean
}

defineProps<Props>()
</script>

<template>
    <img v-if="isLoading" class="loading" src="../../img/spinner.svg" alt="Загрузка..." />
</template>

<style scoped>
.loading {
    width: 120px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

@media (max-width: 768px) {
    .loading {
        width: 90px;
    }
}
</style>
