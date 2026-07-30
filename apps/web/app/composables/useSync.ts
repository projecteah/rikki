import * as api from '@/api'
import { useLocalStorage } from '@vueuse/core'

export interface SyncConfig {
	apiBase: string
	token: string
}

const config = useLocalStorage<SyncConfig>('rikki-sync', { apiBase: '', token: '' })

export function useSync() {
	const saveConfig = (apiBase: string, token: string) => {
		config.value = { apiBase, token }
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
