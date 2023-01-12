<script setup lang="ts">
const { notes, addNote, deleteNote, toggleVisibility, allTags } = useNotes()
const { isDark, toggleDark } = useTheme()
const { config, login, configured, fetchNotes, pushNote } = useSync()
const { t } = useI18n()

const input = ref('')
const visibility = ref<'public' | 'private'>('private')
const activeTag = ref<string | null>(null)
const showSettings = ref(false)
const syncing = ref(false)

const filteredNotes = computed(() => {
  if (!activeTag.value) return notes.value
  return notes.value.filter(n => n.tags.includes(activeTag.value!))
})

const wordCount = computed(() => {
  return notes.value.reduce((sum, n) => sum + n.content.length, 0)
})

const submit = () => {
  const text = input.value.trim()
  if (!text) return
  addNote(text, visibility.value)
  if (configured.value) {
    const tags = extractTags(text)
    pushNote(text, tags).catch(() => {})
  }
  input.value = ''
}

const saveSettings = async (apiBase: string, password: string) => {
  try {
    await login(apiBase, password)
    showSettings.value = false
  } catch {
    alert(t('settings.loginFailed'))
  }
}

const syncNow = async () => {
  syncing.value = true
  try {
    const remoteNotes = await fetchNotes()
    remoteNotes.forEach((n: any) => {
      if (!notes.value.find(local => local.id === n.id)) {
        notes.value.unshift(n)
      }
    })
  } catch {
    alert(t('settings.syncFailed'))
  }
  syncing.value = false
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <header class="flex items-center justify-between px-4 py-3 border-b border-[var(--el-border-color)]">
      <div class="flex items-center gap-2">
        <h1 class="text-lg font-semibold">{{ t('app.title') }}</h1>
        <span class="text-xs text-[var(--el-text-color-secondary)]">{{ wordCount }} chars</span>
      </div>
      <div class="flex items-center gap-2">
        <el-button v-if="configured" size="small" :loading="syncing" @click="syncNow">{{ t('action.sync') }}</el-button>
        <el-button size="small" @click="showSettings = true">{{ t('action.settings') }}</el-button>
        <el-switch v-model="isDark" @change="toggleDark" />
      </div>
    </header>

    <NoteInput v-model="input" v-model:visibility="visibility" @submit="submit" />

    <TagFilter :tags="allTags" :active-tag="activeTag" @select="activeTag = $event" />

    <NoteList :notes="filteredNotes" @delete="deleteNote" @toggle="toggleVisibility" />

    <SettingsDialog
      v-model:visible="showSettings"
      :config="config"
      @save="saveSettings"
    />
  </div>
</template>
