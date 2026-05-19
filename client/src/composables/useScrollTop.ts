import { onMounted } from 'vue'

export const useScrollTop = () => {
    onMounted(() => {
        window.scrollTo(0, 0)
    })
}
