import { defineStore } from 'pinia'
import { ref, nextTick, type Ref } from 'vue'

interface ChatMessage {
    event: 'message' | 'connection'
    username: string
    text: string
}

export const useChatStore = defineStore('chat', () => {
    const username = ref<string>('')
    const isConnected = ref<boolean>(false)
    const messages = ref<ChatMessage[]>([])
    let socket: WebSocket | null = null

    const connectToChat = (chatWindowRef: Ref): void => {
        if (!username.value.trim() || isConnected.value) return

        socket = new WebSocket('wss://vue-cinema.onrender.com')

        socket.onopen = () => {
            isConnected.value = true

            const joinMessage: ChatMessage = {
                event: 'connection',
                username: username.value,
                text: `присоединился к чату`,
            }

            socket?.send(JSON.stringify(joinMessage))
        }

        socket.onmessage = async (event: MessageEvent) => {
            try {
                const incomingData: ChatMessage = JSON.parse(event.data)
                messages.value.push(incomingData)

                await nextTick()
                if (chatWindowRef?.value) {
                    chatWindowRef.value.scrollTo({
                        top: chatWindowRef.value.scrollHeight,
                        behavior: 'smooth',
                    })
                }
            } catch (error) {
                console.error('Ошибка обработки сообщения:', error)
            }
        }

        socket.onclose = () => {
            isConnected.value = false
            socket = null
        }
    }

    const sendMessage = (text: string): void => {
        if (!text.trim() || !socket || socket.readyState !== WebSocket.OPEN) return

        const chatMessage: ChatMessage = {
            event: 'message',
            username: username.value,
            text: text,
        }
        socket.send(JSON.stringify(chatMessage))
    }

    return {
        username,
        isConnected,
        messages,
        connectToChat,
        sendMessage,
    }
})
