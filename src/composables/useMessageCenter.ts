import { computed, ref } from 'vue'
import type { Message, MessageCenterOptions, MessagePayload } from '../types/message'

const DEFAULT_AUTO_HIDE = 5000
const DEFAULT_MAX_VISIBLE_TOASTS = 5

const globalCenter = Symbol('globalMessageCenter')

export function createMessageCenter(options: MessageCenterOptions = {}) {
  const defaultAutoHideMs = options.defaultAutoHideMs ?? DEFAULT_AUTO_HIDE
  const maxVisibleToasts = options.maxVisibleToasts ?? DEFAULT_MAX_VISIBLE_TOASTS

  const messages = ref<Message[]>([])
  const timers = new Map<string, number>()

  const unreadCount = computed(() => messages.value.filter((m: Message) => !m.read).length)
  const activeToasts = computed(() => {
    return messages.value
      .filter((m: Message) => !m.read)
      .slice(0, maxVisibleToasts)
  })

  const history = computed(() => [...messages.value].sort((a, b) => b.createdAt - a.createdAt))
  const hasNewMessages = computed(() => unreadCount.value > 0)

  const clearTimer = (id: string) => {
    const timerId = timers.get(id)
    if (timerId != null) {
      window.clearTimeout(timerId)
      timers.delete(id)
    }
  }

  const removeMessage = (id: string) => {
    clearTimer(id)
    const index = messages.value.findIndex((m: Message) => m.id === id)
    if (index !== -1) {
      messages.value.splice(index, 1)
    }
  }

  const markRead = (id: string) => {
    const message = messages.value.find((m: Message) => m.id === id)
    if (message && !message.read) {
      message.read = true
    }
  }

  const markAllRead = () => {
    messages.value.forEach((m: Message) => {
      m.read = true
    })
  }

  const clearHistory = () => {
    timers.forEach((timerId) => window.clearTimeout(timerId))
    timers.clear()
    messages.value = []
  }

  const pushMessage = (payload: MessagePayload): string => {
    const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
    const autoHideMs = payload.autoHideMs ?? defaultAutoHideMs

    const message: Message = {
      id,
      type: payload.type,
      title: payload.title,
      text: payload.text,
      createdAt: Date.now(),
      read: false,
      autoHideMs,
    }

    messages.value.unshift(message)

    if (autoHideMs > 0) {
      const timer = window.setTimeout(() => {
        removeMessage(id)
      }, autoHideMs)
      timers.set(id, timer)
    }

    return id
  }

  return {
    messages,
    unreadCount,
    activeToasts,
    history,
    hasNewMessages,
    pushMessage,
    removeMessage,
    markRead,
    markAllRead,
    clearHistory,
    clearTimer,
  }
}

export function useMessageCenter(options?: MessageCenterOptions) {
  // create singleton for standard applications
  if ((globalThis as any)[globalCenter as any]) {
    return (globalThis as any)[globalCenter as any] as ReturnType<typeof createMessageCenter>
  }

  const center = createMessageCenter(options)
  ;(globalThis as any)[globalCenter as any] = center
  return center
}
