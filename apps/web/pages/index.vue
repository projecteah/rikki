<script setup lang="ts">
const { memos, addMemo, deleteMemo, allTags } = useMemos()
const { isDark, toggleDark } = useTheme()
const { config, login, configured, fetchMemos, pushMemo } = useSync()

const input = ref('')
const activeTag = ref<string | null>(null)
const showSettings = ref(false)
const syncing = ref(false)

const filteredMemos = computed(() => {
  if (!activeTag.value) return memos.value
  return memos.value.filter(m => m.tags.includes(activeTag.value!))
})

const submit = () => {
  const text = input.value.trim()
  if (!text) return
  addMemo(text)
  if (configured.value) {
    const tags = extractTags(text)
    pushMemo(text, tags).catch(() => {})
  }
  input.value = ''
}

const saveSettings = async (apiBase: string, password: string) => {
  try {
    await login(apiBase, password)
    showSettings.value = false
  } catch {
    alert('login failed')
  }
}

const syncNow = async () => {
  syncing.value = true
  try {
    const remoteMemos = await fetchMemos()
    remoteMemos.forEach((m: any) => {
      if (!memos.value.find(local => local.id === m.id)) {
        memos.value.unshift(m)
      }
    })
  } catch {
    alert('sync failed')
  }
  syncing.value = false
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <header class="flex items-center justify-between px-4 py-3 border-b border-[var(--el-border-color)]">
      <h1 class="text-lg font-semibold">Rikki</h1>
      <div class="flex items-center gap-2">
        <el-button v-if="configured" size="small" :loading="syncing" @click="syncNow">sync</el-button>
        <el-button size="small" @click="showSettings = true">settings</el-button>
        <el-switch v-model="isDark" @change="toggleDark" />
      </div>
    </header>

    <MemoInput v-model="input" @submit="submit" />

    <TagFilter :tags="allTags" :active-tag="activeTag" @select="activeTag = $event" />

    <MemoList :memos="filteredMemos" @delete="deleteMemo" />

    <SyncDialog
      v-model:visible="showSettings"
      :config="config"
      @save="saveSettings"
    />
  </div>
</template>
