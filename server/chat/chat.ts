import { WebSocketServer, WebSocket } from 'ws'
import { type ChatMessage } from './types.ts'

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000

const wss = new WebSocketServer({ port: PORT }, () =>
    console.log(`🚀 WebSocket-сервер успешно запущен на порту ${PORT}`),
)

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (rawData) => {
        try {
            const message: ChatMessage = JSON.parse(rawData.toString())

            switch (message.event) {
                case 'message':
                case 'connection':
                    broadcastMessage(message)
                    break

                default:
                    console.warn(`⚠️ Неизвестный тип события: ${message.event}`)
                    break
            }
        } catch (error) {
            console.error('❌ Ошибка обработки JSON от клиента:', error)
        }
    })

    ws.on('close', () => {
        console.log('❌ Клиент отключился от сервера')
    })
})

const broadcastMessage = (message: ChatMessage) => {
    const stringifiedMessage = JSON.stringify(message)

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(stringifiedMessage)
        }
    })
}
