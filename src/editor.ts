import { ref, computed } from 'vue'
import { current } from './store'
import { marked } from 'marked'

export const editor = ref<InstanceType<typeof import('vue').ComponentPublicInstance> | null>(null)

export const format = (before: string, after?: string) => {
  const el = (editor.value as any)?.$refs?.textarea as HTMLTextAreaElement
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

export const rendered = computed(() => marked.parse(current.value.content || ''))
