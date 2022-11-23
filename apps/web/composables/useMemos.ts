export interface Memo {
  id: string
  content: string
  createdAt: number
  tags: string[]
}

export function useMemos() {
  const memos = ref<Memo[]>(JSON.parse(localStorage.getItem('memos') || '[]'))

  watch(memos, (val) => {
    localStorage.setItem('memos', JSON.stringify(val))
  }, { deep: true })

  const addMemo = (content: string) => {
    const tags = extractTags(content)
    memos.value.unshift({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      content,
      createdAt: Date.now(),
      tags,
    })
  }

  const deleteMemo = (id: string) => {
    memos.value = memos.value.filter(m => m.id !== id)
  }

  const extractTags = (content: string): string[] => {
    const matches = content.match(/#(\S+)/g)
    return matches ? matches.map(t => t.slice(1)) : []
  }

  const allTags = computed(() => {
    const set = new Set<string>()
    memos.value.forEach(m => m.tags.forEach(t => set.add(t)))
    return Array.from(set)
  })

  return { memos, addMemo, deleteMemo, allTags, extractTags }
}
