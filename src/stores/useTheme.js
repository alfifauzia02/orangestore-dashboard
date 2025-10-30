import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(
    localStorage.getItem('theme') ||
    'light' 
  )

  function apply(t) {
    document.documentElement.setAttribute('data-theme', t)
  }

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  apply(theme.value)

  watch(theme, (t) => {
    localStorage.setItem('theme', t)
    apply(t)
  })

  return { theme, toggle }
})
