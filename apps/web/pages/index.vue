<script setup lang="ts">
const { notes, sortedNotes, addNote, deleteNote, toggleVisibility, togglePin, editNote, allTags } = useNotes()
const { isDark, toggleDark } = useTheme()
const { config, login, configured, fetchNotes, pushNote } = useSync()
const { t } = useI18n()
const { error } = useNotify()
const { register } = useShortcuts()

import NoteInput from '@/components/NoteInput.vue'

const input = ref('')
const search = ref('')
const visibility = ref<'public' | 'private'>('private')
const activeTag = ref<string | null>(null)
const showSettings = ref(false)
const syncing = ref(false)
const saving = ref(false)
const dailyReview = ref(false)

const noteInputRef = ref<InstanceType<typeof NoteInput> | null>(null)
const searchRef = ref<HTMLInputElement | null>(null)

register('mod+n', () => noteInputRef.value?.textareaRef?.focus())
register('mod+k', () => searchRef.value?.focus())
register('mod+s', () => { if (configured.value) syncNow() })
register('mod+d', () => toggleDark(!isDark.value))

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
  saving.value = true
  try {
    await login(apiBase, password)
    showSettings.value = false
  } catch {
    error(t('settings.loginFailed'))
  }
  saving.value = false
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
    error(t('settings.syncFailed'))
  }
  syncing.value = false
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <header class="flex items-center justify-between px-4 py-3 border-b border-[var(--n-border-color)]">
      <div class="flex items-center gap-2">
        <h1 class="text-lg font-semibold">{{ t('app.title') }}</h1>
        <span class="text-xs text-[var(--n-text-color-disabled)]">{{ wordCount }} {{ t('stats.chars') }}</span>
      </div>
      <div class="flex items-center gap-2">
        <n-button size="small" @click="dailyReview = !dailyReview">{{ t('action.dailyReview') }}</n-button>
        <n-button v-if="configured" size="small" :loading="syncing" @click="syncNow">{{ t('action.sync') }}</n-button>
        <n-button size="small" @click="showSettings = true">{{ t('action.settings') }}</n-button>
        <n-switch v-model:value="isDark" @update:value="toggleDark" />
      </div>
    </header>

    <div class="px-4 py-2 border-b border-[var(--n-border-color)]">
      <n-input ref="searchRef" v-model:value="search" :placeholder="t('search.placeholder')" clearable />
    </div>

    <NoteInput ref="noteInputRef" v-model="input" v-model:visibility="visibility" @submit="submit" />

    <TagFilter :tags="allTags" :active-tag="activeTag" @select="activeTag = $event" />

    <div v-if="dailyReview && dailyReviewNotes.length" class="px-4 py-3 border-b border-[var(--n-border-color)]">
      <div class="text-xs text-[var(--n-text-color-disabled)] mb-2">{{ t('dailyReview.title') }}</div>
      <div class="flex flex-col gap-2">
        <div v-for="note in dailyReviewNotes" :key="note.id" class="p-2 rounded bg-[var(--n-color)] text-sm">
          {{ note.content }}
        </div>
      </div>
    </div>

    <NoteList :notes="filteredNotes" @delete="deleteNote" @toggle="toggleVisibility" @pin="togglePin" @edit="editNote" />

    <SettingsDialog
      v-model:visible="showSettings"
      :config="config"
      :loading="saving"
      @save="saveSettings"
    />
  </div>
</template>
