export interface Note {
  id: string
  content: string
  createdAt: number
  tags: string[]
  visibility: 'public' | 'private'
}

export function useNotes() {
  const notes = ref<Note[]>(JSON.parse(localStorage.getItem('notes') || '[]'))

  watch(notes, (val) => {
    localStorage.setItem('notes', JSON.stringify(val))
  }, { deep: true })

  const addNote = (content: string, visibility: 'public' | 'private' = 'private') => {
    const tags = extractTags(content)
    notes.value.unshift({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      content,
      createdAt: Date.now(),
      tags,
      visibility,
    })
  }

  const deleteNote = (id: string) => {
    notes.value = notes.value.filter(n => n.id !== id)
  }

  const toggleVisibility = (id: string) => {
    const note = notes.value.find(n => n.id === id)
    if (note) note.visibility = note.visibility === 'private' ? 'public' : 'private'
  }

  const extractTags = (content: string): string[] => {
    const matches = content.match(/#(\S+)/g)
    return matches ? matches.map(t => t.slice(1)) : []
  }

  const allTags = computed(() => {
    const set = new Set<string>()
    notes.value.forEach(n => n.tags.forEach(t => set.add(t)))
    return Array.from(set)
  })

  return { notes, addNote, deleteNote, toggleVisibility, allTags, extractTags }
}
