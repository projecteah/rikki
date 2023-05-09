<script setup lang="ts">
const { notes, sortedNotes, addNote, deleteNote, toggleVisibility, togglePin, allTags } = useNotes()
const { isDark, toggleDark } = useTheme()
const { config, login, configured, fetchNotes, pushNote } = useSync()
const { t } = useI18n()

const input = ref('')
const search = ref('')
const visibility = ref<'public' | 'private'>('private')
const activeTag = ref<string | null>(null)
const showSettings = ref(false)
const syncing = ref(false)
const dailyReview = ref(false)

const dailyReviewNotes = computed(() => {
  if (!dailyReview.value) return []
  const daysAgo = Math.floor(Math.random() * 365) + 1
  const target = Date.now() - daysAgo * 86400000
  const dayStart = new Date(target).setHours(0, 0, 0, 0)
  const dayEnd = dayStart + 86400000
  return notes.value.filter(n => n.createdAt >= dayStart && n.createdAt < dayEnd)
})

const filteredNotes = computed(() => {
  let result = sortedNotes.value
  if (activeTag.value) result = result.filter(n => n.tags.includes(activeTag.value!))
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(n => n.content.toLowerCase().includes(q))
  }
  return result
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
        <el-button size="small" @click="dailyReview = !dailyReview">{{ t('action.dailyReview') }}</el-button>
        <el-button v-if="configured" size="small" :loading="syncing" @click="syncNow">{{ t('action.sync') }}</el-button>
        <el-button size="small" @click="showSettings = true">{{ t('action.settings') }}</el-button>
        <el-switch v-model="isDark" @change="toggleDark" />
      </div>
    </header>

    <div class="px-4 py-2 border-b border-[var(--el-border-color)]">
      <el-input v-model="search" :placeholder="t('search.placeholder')" clearable />
    </div>

    <NoteInput v-model="input" v-model:visibility="visibility" @submit="submit" />

    <TagFilter :tags="allTags" :active-tag="activeTag" @select="activeTag = $event" />

    <div v-if="dailyReview && dailyReviewNotes.length" class="px-4 py-3 border-b border-[var(--el-border-color)]">
      <div class="text-xs text-[var(--el-text-color-secondary)] mb-2">{{ t('dailyReview.title') }}</div>
      <div class="flex flex-col gap-2">
        <div v-for="note in dailyReviewNotes" :key="note.id" class="p-2 rounded bg-[var(--el-fill-color-light)] text-sm">
          {{ note.content }}
        </div>
      </div>
    </div>

    <NoteList :notes="filteredNotes" @delete="deleteNote" @toggle="toggleVisibility" @pin="togglePin" />

    <SettingsDialog
      v-model:visible="showSettings"
      :config="config"
      @save="saveSettings"
    />
  </div>
</template>
