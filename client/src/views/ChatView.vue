<script setup lang="ts">
import { ref } from 'vue'
import { motion } from 'motion-v'
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'

const chatStore = useChatStore()
const { username, isConnected, isLoading, messages } = storeToRefs(chatStore)

const messageText = ref<string>('')
const chatWindow = ref<HTMLDivElement | null>(null)

const handleConnect = (): void => {
    chatStore.connectToChat(chatWindow)
}

const handleSend = (): void => {
    const text = messageText.value.trim()
    if (!text) return
    chatStore.sendMessage(text)
    messageText.value = ''
}

const handleDisconnect = () => {
    chatStore.disconnect()
}
</script>

<template>
    <div class="container chat-container">
        <motion.div
            v-if="!isConnected"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.3 }"
            class="chat__form"
        >
            <h2 class="chat__title">Войти в глобальный чат</h2>
            <p class="chat__subtitle">Введите никнейм, который будут видеть другие люди</p>
            <div class="auth-group">
                <input
                    v-model="username"
                    type="text"
                    placeholder="Введите ваше имя..."
                    maxlength="25"
                    :disabled="isLoading"
                    @keyup.enter="handleConnect"
                />
                <button
                    class="button-default btn-connect"
                    :disabled="isLoading"
                    @click="handleConnect"
                >
                    <span>Войти</span>
                </button>
            </div>
        </motion.div>

        <div v-else class="chat-room">
            <div class="chat-room__header">
                <h3 class="chat-room__title">Глобальный чат</h3>
                <button class="chat-room__button" @click="handleDisconnect">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                </button>
            </div>

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
                    <span v-if="msg.event === 'connection'" class="system-text">
                        <strong>{{ msg.username }}</strong> {{ msg.text }}
                    </span>

                    <div v-else class="user-text">
                        <strong class="author-name">{{ msg.username }}</strong>
                        <p class="message-text-content">{{ msg.text }}</p>
                    </div>
                </div>
            </div>

            <div class="input-panel">
                <input
                    v-model="messageText"
                    type="text"
                    placeholder="Напишите сообщение..."
                    maxlength="1000"
                    @keyup.enter="handleSend"
                />
                <button
                    class="button-glass send-btn"
                    :disabled="!messageText.trim()"
                    @click="handleSend"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

.chat__form {
    width: 100%;
    max-width: 700px;
    padding: 50px 40px;
    text-align: center;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    backdrop-filter: blur(8px);
}

.chat__title {
    font-size: 32px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.5px;
    margin: 0 0 8px 0;
    color: var(--color-main);
}

.chat__subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 0 32px 0;
}

.auth-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 340px;
    margin: 0 auto;
}

input[type='text'] {
    width: 100%;
    padding: 14px 18px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: #ffffff;
    font-size: 16px;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

input[type='text']:focus {
    border-color: var(--color-main);
}

.chat-room {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 860px;
    height: 680px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    backdrop-filter: blur(12px);
    overflow: hidden;
}

.chat-room__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 20px 24px;
    background: rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.chat-room__button {
    padding-top: 5px;
}

.chat-room__title {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.chat-window {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.chat-window::-webkit-scrollbar {
    width: 6px;
}
.chat-window::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
}

.message-block {
    display: flex;
    max-width: 75%;
    border-radius: 12px;
    padding: 12px 16px;
}

.system-msg {
    align-self: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    max-width: 90%;
    padding: 6px 16px;
    border-radius: 20px;
}

.system-text {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
}

.my-msg {
    align-self: flex-end;
    background: var(--color-main);
    color: #0b0f19;
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.1);
}

.my-msg .author-name {
    color: rgba(11, 15, 25, 0.7);
}

.other-msg {
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.other-msg .author-name {
    color: var(--color-main);
}

.user-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
}

.author-name {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    font-weight: 700;
}

.message-text-content {
    margin: 0;
    font-size: 15px;
    line-height: 1.4;
    word-break: break-word;
}

.input-panel {
    display: flex;
    gap: 12px;
    padding: 16px 24px;
    background: rgba(0, 0, 0, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.send-btn {
    padding: 0;
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    padding-top: 5px;
}

@media (max-width: 1440px) {
    .chat-container {
        margin-top: 20px;
    }

    .chat__form {
        max-width: 700px;
        padding: 50px 40px;
    }

    .chat__title {
        font-size: 32px;
        letter-spacing: -0.5px;
        margin: 0 0 8px 0;
    }

    .chat__subtitle {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
        margin: 0 0 32px 0;
    }

    .auth-group {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 100%;
        margin: 0 auto;
    }

    .chat-room {
        width: 100%;
        max-width: 860px;
        height: 700px;
        border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .chat-room__header {
        gap: 12px;
        padding: 20px 24px;
        background: rgba(255, 255, 255, 0.02);
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .chat-room__title {
        font-size: 18px;
    }

    .chat-window {
        padding: 18px;
        gap: 12px;
    }

    .chat-window::-webkit-scrollbar {
        width: 6px;
    }

    .message-block {
        display: flex;
        max-width: 75%;
        border-radius: 12px;
        padding: 12px 16px;
    }

    .system-msg {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        max-width: 90%;
        padding: 6px 16px;
    }

    .system-text {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.5);
        text-align: center;
    }

    .my-msg {
        background: var(--color-main);
        color: var(--color-bg2);
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.1);
    }

    .user-text {
        gap: 4px;
        width: 100%;
    }

    .author-name {
        font-size: 11px;
    }

    .message-text-content {
        font-size: 15px;
    }

    .input-panel {
        gap: 12px;
        padding: 16px 24px;
    }

    .send-btn {
        width: 50px;
        height: 50px;
        flex-shrink: 0;
    }
}

@media (max-width: 768px) {
    .chat-container {
        margin-top: 20px;
    }

    .chat__form {
        max-width: 700px;
        padding: 50px 40px;
    }

    .chat__title {
        font-size: 24px;
        margin: 0 0 8px 0;
    }

    .chat__subtitle {
        font-size: 14px;
        margin: 0 0 30px 0;
    }

    .auth-group {
        gap: 12px;
    }

    .chat-room {
        width: 100%;
        max-width: 860px;
    }

    .chat-room__header {
        gap: 12px;
        padding: 14px 22px;
        background: rgba(255, 255, 255, 0.02);
    }

    .chat-room__title {
        font-size: 18px;
    }

    .chat-window {
        padding: 16px;
        gap: 10px;
    }

    .message-block {
        display: flex;
        max-width: 75%;
        border-radius: 12px;
        padding: 10px 14px;
    }

    .system-msg {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        max-width: 90%;
        padding: 6px 16px;
    }

    .system-text {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.5);
        text-align: center;
    }

    .user-text {
        gap: 4px;
        width: 100%;
    }

    .author-name {
        font-size: 11px;
    }

    .message-text-content {
        font-size: 15px;
    }

    .input-panel {
        gap: 8px;
        padding: 12px 16px;
    }

    .input-panel input {
        padding: 10px 16px;
    }

    .send-btn {
        width: 45px;
        height: 45px;
        flex-shrink: 0;
    }
}

input:disabled,
button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

@media (max-width: 425px) {
    .chat-room {
        height: calc(100vh - 180px);
        border-radius: 12px;
    }
}
</style>
