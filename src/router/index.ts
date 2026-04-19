import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieView from '@/views/MovieView.vue'
import ActorView from '@/views/ActorView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/movie/:id',
            name: 'movie',
            component: MovieView,
        },
        {
            path: '/actor/:id',
            name: 'actor',
            component: ActorView,
        },
    ],
})

export default router
