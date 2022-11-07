import { ref } from 'vue'
import { notes, activeIndex, current, newNote, selectNote, deleteNote } from './store'
import { editor, rendered, format } from './editor'
import { isDark, toggleDark } from './theme'

const contextIndex = ref<number>(0)

function onContextCommand(cmd: string, i: number) {
  if (cmd === 'delete') deleteNote(i)
}

export {
  notes,
  activeIndex,
  current,
  rendered,
  editor,
  newNote,
  selectNote,
  deleteNote,
  format,
  contextIndex,
  isDark,
  toggleDark,
  onContextCommand,
}
