<script setup lang="ts">
const config = JSON.parse(localStorage.getItem('rikki-sync') || '{}')
const notes = ref<any[]>([])
const loading = ref(true)

const API_BASE = config.apiBase || import.meta.env.VITE_API_BASE || ''

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/api/public/notes`)
    notes.value = await res.json()
  } catch {
    notes.value = []
  }
  loading.value = false
})

const formatTime = (ts: number) => {
  const diff = Date.now() - ts
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return new Date(ts).toLocaleDateString()
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Rikki</h1>

    <div v-if="loading" class="text-center text-gray-500">loading...</div>

    <div v-else-if="notes.length" class="flex flex-col gap-4">
      <div v-for="note in notes" :key="note.id" class="p-4 rounded-lg bg-[var(--el-fill-color-light)]">
        <div class="text-sm whitespace-pre-wrap">{{ note.content }}</div>
        <div class="flex items-center gap-2 mt-2 text-xs text-[var(--el-text-color-secondary)]">
          <span>{{ formatTime(note.createdAt) }}</span>
          <span v-for="tag in note.tags" :key="tag" class="px-1.5 py-0.5 rounded bg-[var(--el-color-primary-light-9)] text-[var(--el-color-primary)]">#{{ tag }}</span>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">no public notes</div>
  </div>
</template>
