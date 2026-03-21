import { defineNuxtPlugin } from '#app'
import { useMessageCenter } from '../src/composables/useMessageCenter'

export default defineNuxtPlugin((nuxtApp) => {
  const messageCenter = useMessageCenter()

  nuxtApp.provide('messageCenter', messageCenter)
  return {
    provide: {
      messageCenter,
    },
  }
})
