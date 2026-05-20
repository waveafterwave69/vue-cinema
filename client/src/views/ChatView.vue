<script setup lang="ts">
import { ref, onUnmounted, nextTick } from 'vue'

interface ChatMessage {
    event: 'message' | 'connection'
    username: string
    text: string
}

const username = ref<string>('')
const isConnected = ref<boolean>(false)
const messageText = ref<string>('')
const messages = ref<ChatMessage[]>([])

const chatWindow = ref<HTMLDivElement | null>(null)

let socket: WebSocket | null = null

const connectToChat = (): void => {
    if (!username.value.trim()) return

    socket = new WebSocket('ws://localhost:8000')

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
            if (chatWindow.value) {
                chatWindow.value.scrollTo({
                    top: chatWindow.value.scrollHeight,
                    behavior: 'smooth',
                })
            }
        } catch (error) {
            console.error('Ошибка обработки сообщения от сервера:', error)
        }
    }

    socket.onclose = () => {
        isConnected.value = false
        console.log('Соединение разорвано')
    }
}

const sendMessage = (): void => {
    const text = messageText.value.trim()
    if (!text || !socket || socket.readyState !== WebSocket.OPEN) return

    const chatMessage: ChatMessage = {
        event: 'message',
        username: username.value,
        text: text,
    }

    socket.send(JSON.stringify(chatMessage))
    messageText.value = '' // Очищаем поле
}

onUnmounted(() => {
    if (socket) socket.close()
})
</script>

<template>
    <div class="container">
        <h2>CHAAAT</h2>

        <!-- Шаг 1: Авторизация по имени -->
        <div v-if="!isConnected" class="login-form">
            <input
                v-model="username"
                type="text"
                placeholder="Введите ваше имя..."
                @keyup.enter="connectToChat"
            />
            <button @click="connectToChat">Войти</button>
        </div>

        <!-- Шаг 2: Окно чата -->
        <div v-else class="chat-room">
            <div ref="chatWindow" class="chat-window">
                <div
                    v-for="(msg, index) in messages"
                    :key="index"
                    class="message-block"
                    :class="{
                        'system-msg': msg.event === 'connection',
                        'my-msg': msg.event === 'message' && msg.username === username,
                        'other-msg': msg.event === 'message' && msg.username !== username,
                    }"
                >
                    <!-- Рендер системного входа -->
                    <span v-if="msg.event === 'connection'" class="system-text">
                        ℹ️ <strong>{{ msg.username }}</strong> {{ msg.text }}
                    </span>

                    <!-- Рендер обычного сообщения -->
                    <div v-else class="user-text">
                        <strong class="author-name">{{ msg.username }}:</strong> {{ msg.text }}
                    </div>
                </div>
            </div>

            <!-- Форма отправки сообщения -->
            <div class="input-panel">
                <input
                    v-model="messageText"
                    type="text"
                    placeholder="Напишите сообщение..."
                    @keyup.enter="sendMessage"
                />
                <button @click="sendMessage">Отправить</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 500px;
    margin: 40px auto;
    font-family:
        system-ui,
        -apple-system,
        sans-serif;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    background: #ffffff;
}

h2 {
    margin-top: 0;
    color: #2c3e50;
    text-align: center;
    font-size: 1.5rem;
    letter-spacing: 1px;
}

.login-form,
.input-panel {
    display: flex;
    gap: 10px;
}

input {
    flex: 1;
    padding: 12px;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    outline: none;
    font-size: 14px;
}

input:focus {
    border-color: #42b883;
}

button {
    padding: 12px 20px;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #35495e;
}

.chat-window {
    height: 350px;
    border: 1px solid #f0f2f5;
    border-radius: 8px;
    background: #f8f9fa;
    overflow-y: auto;
    padding: 15px;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.message-block {
    padding: 10px 14px;
    border-radius: 8px;
    max-width: 75%;
    width: fit-content;
    font-size: 14px;
    line-height: 1.4;
}

/* Системные уведомления по центру */
.system-msg {
    background: #e8f4ff;
    color: #1890ff;
    align-self: center;
    font-size: 13px;
    border: 1px solid #bae7ff;
}

/* Чужие сообщения (слева, белые) */
.other-msg {
    background: #ffffff;
    border: 1px solid #e8e8e8;
    align-self: flex-start;
    color: #333333;
}

/* Ваши собственные сообщения (справа, зеленые) */
.my-msg {
    background: #42b883;
    color: white;
    align-self: flex-end;
}

.author-name {
    display: block;
    font-size: 12px;
    margin-bottom: 2px;
    color: inherit;
    opacity: 0.8;
}
</style>
