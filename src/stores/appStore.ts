import { defineStore } from 'pinia'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const buttonLoading = ref(false)
    const startButtonLoading = () => {
      buttonLoading.value = true
    }
    const closeButtonLoading = () => {
      buttonLoading.value = false
    }

    return {
      buttonLoading, startButtonLoading, closeButtonLoading
    }
  }
)
