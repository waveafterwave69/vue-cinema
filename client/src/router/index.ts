import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieView from '@/views/MovieView.vue'
import ActorView from '@/views/ActorView.vue'
import SearchView from '@/views/SearchView.vue'
import ChatView from '@/views/ChatView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/film/:id',
            name: 'film',
            component: MovieView,
        },
        {
            path: '/name/:id',
            name: 'name',
            component: ActorView,
        },
        {
            path: '/search',
            name: 'search',
            component: SearchView,
        },
        {
            path: '/chat',
            name: 'chat',
            component: ChatView,
        },
    ],
})

export default router
