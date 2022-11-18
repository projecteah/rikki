import { marked } from 'marked'

export function useEditor(current: ReturnType<typeof useNotes>['current']) {
  const editor = ref<any>(null)

  const format = (before: string, after?: string) => {
    const el = editor.value?.$refs?.textarea as HTMLTextAreaElement
    if (!el) return

    const start = el.selectionStart
    const end = el.selectionEnd
    const text = current.value.content || ''
    const selected = text.substring(start, end)
    const replacement = before + (selected || 'text') + (after || '')

    current.value.content = text.substring(0, start) + replacement + text.substring(end)

    setTimeout(() => {
      el.focus()
      el.setSelectionRange(start + before.length, start + before.length + (selected ? selected.length : 4))
    })
  }

  const rendered = computed(() => marked.parse(current.value.content || ''))

  return { editor, format, rendered }
}
