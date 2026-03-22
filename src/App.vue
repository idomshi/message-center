<template>
  <div style="padding: 16px;">
    <h1>Message Center Demo</h1>
    <div style="display: flex; gap: 12px; margin-bottom: 16px;">
      <button @click="add('info')">Info</button>
      <button @click="add('success')">Success</button>
      <button @click="add('warning')">Warning</button>
      <button @click="add('error')">Error</button>
    </div>
    <MessageCenter />
  </div>
</template>

<script setup lang="ts">
import type { MessageType } from './types/message'
import MessageCenter from './components/MessageCenter.vue'

const messageCenter = useMessageCenter()

const add = (type: MessageType) => {
  messageCenter.pushMessage({
    type,
    title: `${type.toUpperCase()} Test`,
    text: `${type} message at ${new Date().toLocaleTimeString()}`,
    autoHideMs: 3000,
  })
}
</script>
