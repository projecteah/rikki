import * as api from '../api'

export interface SyncConfig {
  apiBase: string
  token: string
}

const config = ref<SyncConfig>(JSON.parse(localStorage.getItem('rikki-sync') || '{}'))

export function useSync() {
  const saveConfig = (apiBase: string, token: string) => {
    config.value = { apiBase, token }
    localStorage.setItem('rikki-sync', JSON.stringify(config.value))
  }

  const fetchNotes = () => api.getNotes(config.value.apiBase, config.value.token)

  const pushNote = (content: string, tags: string[]) =>
    api.createNote(config.value.apiBase, config.value.token, content, tags)

  const removeNote = (id: string) => api.deleteNote(config.value.apiBase, config.value.token, id)

  const login = async (apiBase: string, password: string) => {
    const token = await api.login(apiBase, password)
    saveConfig(apiBase, token)
  }

  const configured = computed(() => !!(config.value.apiBase && config.value.token))

  return { config, saveConfig, fetchNotes, pushNote, removeNote, login, configured }
}
