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

  const headers = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.value.token}`,
  })

  const fetchNotes = async () => {
    const res = await fetch(`${config.value.apiBase}/api/notes`, { headers: headers() })
    if (!res.ok) throw new Error('fetch failed')
    return res.json()
  }

  const pushNote = async (content: string, tags: string[]) => {
    const res = await fetch(`${config.value.apiBase}/api/notes`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ content, tags }),
    })
    if (!res.ok) throw new Error('push failed')
    return res.json()
  }

  const removeNote = async (id: string) => {
    await fetch(`${config.value.apiBase}/api/notes/${id}`, {
      method: 'DELETE',
      headers: headers(),
    })
  }

  const login = async (apiBase: string, password: string) => {
    const res = await fetch(`${apiBase}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) throw new Error('login failed')
    const { token } = await res.json()
    saveConfig(apiBase, token)
  }

  const configured = computed(() => !!(config.value.apiBase && config.value.token))

  return { config, saveConfig, fetchNotes, pushNote, removeNote, login, configured }
}
