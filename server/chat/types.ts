export interface ChatMessage {
    event: 'message' | 'connection'
    username: string
    text: string
}
