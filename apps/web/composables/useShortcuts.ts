export function useShortcuts() {
  const handlers = new Map<string, () => void>()

  const register = (combo: string, handler: () => void) => {
    handlers.set(combo.toLowerCase(), handler)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    const parts: string[] = []
    if (e.metaKey || e.ctrlKey) parts.push('mod')
    if (e.shiftKey) parts.push('shift')
    parts.push(e.key.toLowerCase())
    const combo = parts.join('+')
    const handler = handlers.get(combo)
    if (handler) {
      e.preventDefault()
      handler()
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeyDown))
  onUnmounted(() => window.removeEventListener('keydown', onKeyDown))

  return { register }
}
