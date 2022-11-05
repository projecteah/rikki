import { ref, computed, watch, Ref } from 'vue'

interface Note {
  title: string
  content: string
}

const stored = localStorage.getItem('notes')
const initial: Note[] = stored ? JSON.parse(stored) : [{ title: '', content: '' }]

export const notes = ref<Note[]>(initial)
export const activeIndex = ref<string>('0')

export const current = computed<Note>(() => {
  const idx = parseInt(activeIndex.value)
  return notes.value[idx] || { title: '', content: '' }
})

watch(notes, (val) => {
  localStorage.setItem('notes', JSON.stringify(val))
}, { deep: true })

export const newNote = () => {
  notes.value.push({ title: '', content: '' })
  activeIndex.value = String(notes.value.length - 1)
}

export const selectNote = (i: string) => {
  activeIndex.value = i
}

export const deleteNote = (i: number) => {
  if (notes.value.length <= 1) return
  notes.value.splice(i, 1)
  if (parseInt(activeIndex.value) >= notes.value.length) {
    activeIndex.value = String(notes.value.length - 1)
  }
}
