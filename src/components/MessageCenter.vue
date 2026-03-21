<template>
  <div class="message-center">
    <button class="mc-trigger" @click="toggleHistory">
      Message Center
      <span v-if="unreadCount > 0" class="mc-badge">{{ unreadCount }}</span>
    </button>

    <div class="mc-toaster" v-if="activeToasts.length > 0">
      <transition-group name="mc-toast" tag="div">
        <MessageToast
          v-for="message in activeToasts"
          :key="message.id"
          :message="message"
          :onClose="closeMessage"
          :onMarkRead="markRead"
        />
      </transition-group>
    </div>

    <div class="mc-history" v-if="showHistory">
      <div class="mc-history__actions">
        <button @click="markAllRead" :disabled="history.length === 0">Mark all read</button>
        <button @click="clearHistory" :disabled="history.length === 0">Clear history</button>
      </div>

      <div class="mc-history__list" v-if="history.length > 0">
        <div v-for="item in history" :key="item.id" class="mc-history-item">
          <div :class="['mc-history-item__dot', item.read ? 'read' : 'unread']" />
          <div class="mc-history-item__content">
            <small>{{ new Date(item.createdAt).toLocaleTimeString() }}</small>
            <strong>{{ item.title ?? item.type.toUpperCase() }}</strong>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
      <div v-else class="mc-history-empty">No messages yet</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMessageCenter } from '../composables/useMessageCenter'
import MessageToast from './MessageToast.vue'

const { unreadCount, activeToasts, history, pushMessage, removeMessage, markRead, markAllRead, clearHistory } = useMessageCenter()
const showHistory = ref(false)

const toggleHistory = () => {
  showHistory.value = !showHistory.value
}

const closeMessage = (id: string) => {
  markRead(id)
  removeMessage(id)
}

const demo = () => {
  pushMessage({ type: 'info', title: 'Demo', text: 'Info toast example', autoHideMs: 4000 })
}

const unreadCountComputed = computed(() => unreadCount.value)
</script>

<style scoped>
.message-center {
  position: fixed;
  right: 16px;
  top: 16px;
  z-index: 1000;
  width: 330px;
  font-family: Arial, sans-serif;
}

.mc-trigger {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccd6eb;
  border-radius: 8px;
  background: #fff;
  text-align: left;
  position: relative;
  cursor: pointer;
}

.mc-badge {
  background: #ff3b30;
  color: white;
  border-radius: 999px;
  font-size: 0.75rem;
  padding: 2px 8px;
  margin-left: 8px;
}

.mc-toaster {
  margin-top: 10px;
}

.mc-history {
  margin-top: 10px;
  background: #fff;
  border: 1px solid #dde4f2;
  border-radius: 8px;
  max-height: 320px;
  overflow-y: auto;
  padding: 12px;
}

.mc-history__actions {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.mc-history-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f4ff;
}

.mc-history-item__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 5px;
}
.mc-history-item__dot.unread { background: #ff3b30; }
.mc-history-item__dot.read { background: #8a94a6; }

.mc-history-item__content small {
  color: #667085;
}

.mc-history-empty {
  color: #667085;
  text-align: center;
  padding: 12px 0;
}

.mc-toast-enter-active,
.mc-toast-leave-active {
  transition: all 0.25s ease;
}
.mc-toast-enter-from,
.mc-toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
