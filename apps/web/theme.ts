import { ref } from 'vue'

export const isDark = ref<boolean>(localStorage.getItem('rikki-dark') === 'true')

export const toggleDark = (val: boolean) => {
  document.documentElement.classList.toggle('dark', val)
  localStorage.setItem('rikki-dark', String(val))
}

if (isDark.value) {
  document.documentElement.classList.add('dark')
}
