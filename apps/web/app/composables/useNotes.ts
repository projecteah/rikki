import { useLocalStorage } from '@vueuse/core'

export interface Note {
  id: string
  content: string
  createdAt: number
  tags: string[]
  visibility: 'public' | 'private'
  pinned?: boolean
}

export function useNotes() {
  const notes = useLocalStorage<Note[]>('notes', [])

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

  const togglePin = (id: string) => {
    const note = notes.value.find(n => n.id === id)
    if (note) note.pinned = !note.pinned
  }

  const editNote = (id: string, content: string) => {
    const note = notes.value.find(n => n.id === id)
    if (note) {
      note.content = content
      note.tags = extractTags(content)
    }
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

  const sortedNotes = computed(() => {
    return [...notes.value].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return b.createdAt - a.createdAt
    })
  })

  return { notes, sortedNotes, addNote, deleteNote, toggleVisibility, togglePin, editNote, allTags, extractTags }
}
