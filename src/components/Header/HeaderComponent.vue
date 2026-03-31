<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { motion } from 'motion-v'
import { ref } from 'vue'

const isMenuOpen = ref(false)
</script>

<template>
    <motion.header
        :initial="{ opacity: 0, y: -100 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4 }"
        class="header"
    >
        <div class="header__left">
            <button class="header__logo">
                <RouterLink to="/"
                    ><img src="../../img/logo.svg" alt="Vue Cinema" class="logo__img"
                /></RouterLink>
            </button>
            <nav class="header__nav">
                <ul class="nav__list">
                    <li><RouterLink to="/movies" class="list__item">Фильмы</RouterLink></li>
                    <li><RouterLink to="/news" class="list__item">Новости</RouterLink></li>
                </ul>
            </nav>
        </div>
        <ul class="header__buttons">
            <li>
                <button>
                    <RouterLink to="/movies" class="button__item button-search">
                        <img src="../../img/search.svg" class="button__img" alt="" />
                    </RouterLink>
                </button>
            </li>
            <li>
                <button>
                    <RouterLink to="/profile" class="button__item button-profile">
                        <img src="../../img/profile.svg" class="button__img" alt="" />
                    </RouterLink>
                </button>
            </li>
        </ul>
        <button
            class="burger"
            @click="isMenuOpen = !isMenuOpen"
            :class="{ 'burger--active': isMenuOpen }"
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
    </motion.header>
</template>

<style scoped>
button:hover {
    transform: scale(1.1);
}

.header {
    box-shadow: 0px 0px 2px var(--color-secondary);
    background-color: var(--color-bg2);
    border-radius: 10px;
    padding: 0px 35px 0px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 20px;
    margin-top: 20px;
    z-index: 100;
}

.burger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 25px;
    height: 15px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;
}

.burger span {
    width: 100%;
    height: 2px;
    background-color: var(--color-main);
    transition: all 0.3s ease;
}

.burger--active span:nth-child(1) {
    transform: translateY(4px) rotate(45deg);
}

.burger--active span:nth-child(2) {
    opacity: 0;
}

.burger--active span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
}

.header__left {
    display: flex;
    align-items: center;
    column-gap: 40px;
}

.nav__list {
    display: flex;
    column-gap: 20px;
}

.logo__img {
    width: 90px;
}

.header__buttons {
    display: flex;
    column-gap: 30px;
}

.list__item {
    color: var(--color-main);
}

.list__item:hover {
    color: var(--color-secondary);
}

.button__img {
    width: 28px;
}

@media (max-width: 1024px) {
    .header {
        padding: 0px 30px 0px 13px;
        top: 15px;
        margin-top: 15px;
    }

    .header__left {
        column-gap: 25px;
    }

    .nav__list {
        column-gap: 15px;
    }

    .logo__img {
        width: 75px;
    }

    .header__buttons {
        column-gap: 25px;
    }

    .list__item {
        font-size: 16px;
    }

    .button__img {
        width: 25px;
    }
}

@media (max-width: 768px) {
    .header {
        padding: 0px 25px 0px 10px;
        top: 15px;
        margin-top: 15px;
    }

    .header__left {
        column-gap: 15px;
    }

    .nav__list {
        column-gap: 10px;
    }

    .logo__img {
        width: 65px;
    }

    .header__buttons {
        column-gap: 20px;
    }

    .list__item {
        font-size: 16px;
    }

    .button__img {
        width: 22px;
    }
}

@media (max-width: 425px) {
    .header {
        padding: 0px 15px 0px 5px;
    }

    .header__left {
        column-gap: 10px;
    }

    .logo__img {
        width: 59px;
    }

    .header__buttons {
        display: none;
    }

    .burger {
        display: flex;
    }
}
</style>
