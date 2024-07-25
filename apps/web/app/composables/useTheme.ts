export function useTheme() {
  const colorMode = useColorMode()

  const isDark = computed({
    get: () => colorMode.value === 'dark',
    set: (val: boolean) => { colorMode.value = val ? 'dark' : 'light' },
  })

  const toggleDark = (val: boolean) => {
    colorMode.value = val ? 'dark' : 'light'
  }

  return { isDark, toggleDark }
}
