<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { motion, AnimatePresence } from 'motion-v'
import { watch, onUnmounted } from 'vue'

import profileIcon from '@/img/profile.svg'
import searchIcon from '@/img/search.svg'
import chatIcon from '@/img/chat.png'

const props = defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

interface BurgerItem {
    text: string
    img: string
    link: string
}

const items: BurgerItem[] = [
    {
        text: 'Профиль',
        img: profileIcon,
        link: '/profile',
    },
    {
        text: 'Поиск',
        img: searchIcon,
        link: '/search',
    },
    {
        text: 'Глобальный чат',
        img: chatIcon,
        link: '/chat',
    },
]

const closeMenu = () => {
    emit('close')
}

watch(
    () => props.isOpen,
    (newValue) => {
        if (newValue) {
            document.documentElement.classList.add('lock-scroll')
            document.body.classList.add('lock-scroll')
        } else {
            document.documentElement.classList.remove('lock-scroll')
            document.body.classList.remove('lock-scroll')
        }
    },
    { immediate: true },
)

onUnmounted(() => {
    document.documentElement.classList.remove('lock-scroll')
    document.body.classList.remove('lock-scroll')
})
</script>

<template>
    <AnimatePresence>
        <div v-if="isOpen" class="burger-menu" @touchmove.prevent>
            <motion.div
                class="burger-menu__overlay"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :exit="{ opacity: 0 }"
                :transition="{ duration: 0.2 }"
                @click="closeMenu"
            />

            <motion.div
                class="burger-menu__content"
                :initial="{ x: '100%' }"
                :animate="{ x: 0 }"
                :exit="{ x: '100%' }"
                :transition="{ type: 'spring', damping: 28, stiffness: 220 }"
            >
                <button class="burger-menu__close-btn" title="Закрыть меню" @click="closeMenu">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <ul class="burger-menu__list">
                    <li
                        class="burger-menu__item"
                        v-for="item in items"
                        :key="item.link"
                        @click="closeMenu"
                    >
                        <RouterLink
                            :to="item.link"
                            class="burger-menu__link"
                            active-class="burger-menu__link--active"
                        >
                            <div class="burger-menu__icon-wrapper">
                                <img :src="item.img" :alt="item.text" class="burger-menu__icon" />
                            </div>
                            <span class="burger-menu__text">{{ item.text }}</span>
                        </RouterLink>
                    </li>
                </ul>
            </motion.div>
        </div>
    </AnimatePresence>
</template>

<style>
.lock-scroll {
    overflow: hidden !important;
    scrollbar-gutter: stable;
    height: 100vh !important;
}
</style>

<style scoped>
.burger-menu {
    position: fixed;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    display: flex;
    justify-content: flex-end;
}

.burger-menu__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(11, 15, 25, 0.8);
    backdrop-filter: blur(4px);
}

.burger-menu__content {
    position: relative;
    width: 320px;
    height: 100%;
    background: rgba(20, 20, 20, 0.95);
    border-left: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(16px);
    padding: 60px 24px 40px 24px;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.burger-menu__close-btn {
    position: absolute;
    top: 16px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
}

.burger-menu__close-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: var(--color-main);
    transform: rotate(90deg) scale(1.05);
}

.burger-menu__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.burger-menu__link {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 18px;
    border-radius: 12px;
    text-decoration: none;
    background: rgba(255, 255, 255, 0);
    border: 1px solid rgba(255, 255, 255, 0);
    transition: all 0.25s ease;
}

.burger-menu__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}

.burger-menu__icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
}

.burger-menu__text {
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
}

.burger-menu__link:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.08);
}

.burger-menu__link--active {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: rgba(255, 255, 255, 0.15) !important;
}

.burger-menu__link--active .burger-menu__text {
    color: var(--color-main);
}

@media (max-width: 425px) {
    .burger-menu__content {
        width: 100%;
    }
}
</style>
