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
  if (diff < 3600000) return `${Math.floor(diff / 3600000)}h ago`
  if (diff < 86400000) return `${Math.floor(diff / 86400000)}d ago`
  return new Date(ts).toLocaleDateString()
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Rikki</h1>

    <div v-if="loading" class="text-center text-[var(--n-text-color-disabled)]">loading...</div>

    <div v-else-if="notes.length" class="flex flex-col gap-4">
      <div v-for="note in notes" :key="note.id" class="p-4 rounded bg-[var(--n-color)]">
        <div class="text-sm whitespace-pre-wrap">{{ note.content }}</div>
        <div class="flex items-center gap-2 mt-2 text-xs text-[var(--n-text-color-disabled)]">
          <span>{{ formatTime(note.createdAt) }}</span>
          <n-tag v-for="tag in note.tags" :key="tag" size="small" :bordered="false">#{{ tag }}</n-tag>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-[var(--n-text-color-disabled)]">no public notes</div>
  </div>
</template>
