export interface Note {
  title: string
  content: string
}

export function useNotes() {
  const notes = ref<Note[]>(JSON.parse(localStorage.getItem('notes') || '[{"title":"","content":""}]'))
  const activeIndex = ref('0')

  const current = computed(() => notes.value[parseInt(activeIndex.value)] || { title: '', content: '' })

  watch(notes, (val) => {
    localStorage.setItem('notes', JSON.stringify(val))
  }, { deep: true })

  const newNote = () => {
    notes.value.push({ title: '', content: '' })
    activeIndex.value = String(notes.value.length - 1)
  }

  const selectNote = (i: string) => {
    activeIndex.value = i
  }

  const deleteNote = (i: number) => {
    if (notes.value.length <= 1) return
    notes.value.splice(i, 1)
    if (parseInt(activeIndex.value) >= notes.value.length) {
      activeIndex.value = String(notes.value.length - 1)
    }
  }

  return { notes, activeIndex, current, newNote, selectNote, deleteNote }
}
