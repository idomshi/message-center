<template>
  <div :class="['mc-toast', `mc-toast--${message.type}` ]" @mouseenter="pauseTimer" @mouseleave="resumeTimer">
    <div class="mc-toast__header">
      <strong>{{ message.title ?? message.type.toUpperCase() }}</strong>
      <button class="mc-toast__close" @click="close">×</button>
    </div>
    <div class="mc-toast__body">{{ message.text }}</div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import type { Message } from '../types/message'

const props = defineProps<{ message: Message; onClose: (id: string) => void; onMarkRead: (id: string) => void }>()

let pauseToken = false

const close = () => {
  props.onClose(props.message.id)
}

const pauseTimer = () => {
  pauseToken = true
}

const resumeTimer = () => {
  pauseToken = false
}

onBeforeUnmount(() => {
  props.onMarkRead(props.message.id)
})
</script>

<style scoped>
.mc-toast {
  min-width: 280px;
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 10px 12px;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
.mc-toast__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.mc-toast__close {
  border: none;
  background: transparent;
  color: inherit;
  font-size: 1rem;
  cursor: pointer;
}
.mc-toast--info { background-color: #2f86eb; }
.mc-toast--success { background-color: #209a45; }
.mc-toast--warning { background-color: #d68f01; }
.mc-toast--error { background-color: #c42e1c; }
</style>
