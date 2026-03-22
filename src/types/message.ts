export type MessageType = 'info' | 'warning' | 'error' | 'success'

export interface Message {
  id: string
  type: MessageType
  title?: string
  text: string
  createdAt: number
  read: boolean
  autoHideMs: number
}

export interface MessagePayload {
  type: MessageType
  title?: string
  text: string
  autoHideMs?: number
}

export interface MessageCenterOptions {
  defaultAutoHideMs?: number
  maxVisibleToasts?: number
}
