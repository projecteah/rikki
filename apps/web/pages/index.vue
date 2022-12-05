<script setup lang="ts">
const { memos, addMemo, deleteMemo, allTags } = useMemos()
const { render } = useEditor()
const { isDark, toggleDark } = useTheme()
const { config, login, configured, fetchMemos, pushMemo, removeMemo } = useSync()

const input = ref('')

const activeTag = ref<string | null>(null)
const showSettings = ref(false)
const settingsForm = ref({ apiBase: '', password: '' })
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

const extractTags = (content: string): string => {
  const matches = content.match(/#(\S+)/g)
  return matches ? matches.map(t => t.slice(1)) : []
}

const formatTime = (ts: number) => {
  const diff = Date.now() - ts
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return new Date(ts).toLocaleDateString()
}

const openSettings = () => {
  settingsForm.value.apiBase = config.value.apiBase || ''
  settingsForm.value.password = ''
  showSettings.value = true
}

const saveSettings = async () => {
  try {
    await login(settingsForm.value.apiBase, settingsForm.value.password)
    showSettings.value = false
  } catch {
    alert('login failed')
  }
}

const syncNow = async () => {
  syncing.value = true
  try {
    const remoteMemos = await fetchMemos()
    // merge remote memos into local
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
        <el-button size="small" @click="openSettings">settings</el-button>
        <el-switch v-model="isDark" @change="toggleDark" />
      </div>
    </header>

    <div class="px-4 py-3 border-b border-[var(--el-border-color)]">
      <textarea
        v-model="input"
        placeholder="what's on your mind..."
        class="w-full resize-none border-none outline-none text-sm bg-transparent"
        rows="3"
        @keydown.meta.enter="submit"
        @keydown.ctrl.enter="submit"
      />
      <div class="flex justify-end mt-2">
        <el-button type="primary" size="small" @click="submit">send</el-button>
      </div>
    </div>

    <div v-if="allTags.length" class="px-4 py-2 border-b border-[var(--el-border-color)] flex gap-2 flex-wrap">
      <el-tag
        v-for="tag in allTags"
        :key="tag"
        :type="activeTag === tag ? 'primary' : 'info'"
        class="cursor-pointer"
        @click="activeTag = activeTag === tag ? null : tag"
      >
        #{{ tag }}
      </el-tag>
    </div>

    <div class="flex-1 overflow-auto px-4 py-3">
      <div v-if="filteredMemos.length" class="flex flex-col gap-3">
        <div v-for="memo in filteredMemos" :key="memo.id" class="p-3 rounded-lg bg-[var(--el-fill-color-light)] hover:bg-[var(--el-fill-color)] transition-colors">
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 text-sm markdown-body" v-html="render(memo.content)"></div>
            <el-button size="small" type="danger" link @click="deleteMemo(memo.id)">delete</el-button>
          </div>
          <div class="flex items-center gap-2 mt-2 text-xs text-[var(--el-text-color-secondary)]">
            <span>{{ formatTime(memo.createdAt) }}</span>
            <span v-for="tag in memo.tags" :key="tag" class="px-1.5 py-0.5 rounded bg-[var(--el-color-primary-light-9)] text-[var(--el-color-primary)]">#{{ tag }}</span>
          </div>
        </div>
      </div>
      <div v-else class="flex items-center justify-center h-full text-sm text-[var(--el-text-color-secondary)]">
        no memos yet
      </div>
    </div>

    <el-dialog v-model="showSettings" title="sync settings" width="400px">
      <el-form label-position="top">
        <el-form-item label="api base url">
          <el-input v-model="settingsForm.apiBase" placeholder="https://your-api.vercel.app" />
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="settingsForm.password" type="password" placeholder="your password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showSettings = false">cancel</el-button>
        <el-button type="primary" @click="saveSettings">save</el-button>
      </template>
    </el-dialog>
  </div>
</template>
