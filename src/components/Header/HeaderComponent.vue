<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { motion } from 'motion-v'
</script>

<template>
    <motion.header
        :initial="{ opacity: 0, y: -100 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4 }"
        class="header"
    >
        <div class="header__left">
            <div class="header__logo">
                <img src="../../img/logo.svg" alt="Vue Cinema" class="logo__img" />
            </div>
            <nav class="header__nav">
                <ul class="nav__list">
                    <li><RouterLink to="/" class="list__item">Фильмы</RouterLink></li>
                    <li><RouterLink to="/" class="list__item">Новости</RouterLink></li>
                </ul>
            </nav>
        </div>
        <ul class="header__buttons">
            <li class="button__item button-search">
                <button><img src="../../img/search.svg" class="button__img" alt="" /></button>
            </li>
            <li class="button__item button-profile">
                <button><img src="../../img/profile.svg" class="button__img" alt="" /></button>
            </li>
        </ul>
        <div class="burger">burger</div>
    </motion.header>
</template>

<style scoped>
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
}

.burger {
    display: none;
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
        width: 57px;
    }

    .header__buttons {
        display: none;
    }

    .burger {
        display: block;
    }
}
</style>
