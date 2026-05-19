<script setup lang="ts">
interface Props {
    isShowBlocked: boolean
    isResetBlocked: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['show', 'reset'])

const handleShow = () => {
    emit('show')
}

const handleReset = () => {
    emit('reset')
}
</script>

<template>
    <div class="">
        <div class="button__row">
            <button
                @click="handleReset"
                :class="['button-glass', 'more-button', props.isResetBlocked && 'button-blocked']"
            >
                Скрыть
            </button>
            <button
                @click="handleShow"
                :class="['button-glass', 'more-button', props.isShowBlocked && 'button-blocked']"
            >
                Больше
            </button>
        </div>
    </div>
</template>

<style scoped>
.button__row {
    margin-top: 25px;
    display: flex;
    align-items: center;
    column-gap: 20px;
    justify-content: center;
}

.button-blocked {
    cursor: not-allowed;
    opacity: 0.4;
}

@media (max-width: 1024px) {
    .button__row {
        margin-top: 20px;
        column-gap: 15px;
    }
}

@media (max-width: 768px) {
    .button__row {
        margin-top: 20px;
        column-gap: 15px;
    }
}

@media (max-width: 425px) {
    .button__row {
        column-gap: 10px;
    }
}
</style>
