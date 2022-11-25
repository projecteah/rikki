<script setup lang="ts">
const { memos, addMemo, deleteMemo, allTags } = useMemos()
const { format, render } = useEditor()
const { isDark, toggleDark } = useTheme()

const input = ref('')
const textarea = ref<HTMLTextAreaElement | null>(null)
const activeTag = ref<string | null>(null)

const filteredMemos = computed(() => {
  if (!activeTag.value) return memos.value
  return memos.value.filter(m => m.tags.includes(activeTag.value!))
})

const submit = () => {
  const text = input.value.trim()
  if (!text) return
  addMemo(text)
  input.value = ''
}

const onFormat = (before: string, after?: string) => {
  if (textarea.value) format(textarea.value, before, after)
}

const formatTime = (ts: number) => {
  const d = new Date(ts)
  const now = new Date()
  const diff = now.getTime() - ts
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return d.toLocaleDateString()
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <header class="flex items-center justify-between px-4 py-3 border-b border-[var(--el-border-color)]">
      <h1 class="text-lg font-semibold">Rikki</h1>
      <el-switch v-model="isDark" @change="toggleDark" />
    </header>

    <div class="px-4 py-3 border-b border-[var(--el-border-color)]">
      <textarea
        ref="textarea"
        v-model="input"
        placeholder="what's on your mind..."
        class="w-full resize-none border-none outline-none text-sm bg-transparent"
        rows="3"
        @keydown.meta.enter="submit"
        @keydown.ctrl.enter="submit"
      />
      <div class="flex items-center justify-between mt-2">
        <div class="flex gap-1 flex-wrap">
          <el-button size="small" @click="onFormat('**', '**')"><b>B</b></el-button>
          <el-button size="small" @click="onFormat('*', '*')"><i>I</i></el-button>
          <el-button size="small" @click="onFormat('# ')">H1</el-button>
          <el-button size="small" @click="onFormat('## ')">H2</el-button>
          <el-button size="small" @click="onFormat('- ')">List</el-button>
          <el-button size="small" @click="onFormat('[](url)')">Link</el-button>
          <el-button size="small" @click="onFormat('`', '`')">Code</el-button>
          <el-button size="small" @click="onFormat('> ')">Quote</el-button>
        </div>
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
  </div>
</template>
