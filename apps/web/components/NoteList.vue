<script setup lang="ts">
import { Note } from '../../composables/useNotes'
import NoteCard from './NoteCard.vue'
const { t } = useI18n()

defineProps<{
  notes: Note[]
}>()

const emit = defineEmits<{
  delete: [id: string]
  toggle: [id: string]
}>()
</script>

<template>
  <div class="flex-1 overflow-auto px-4 py-3">
    <div v-if="notes.length" class="flex flex-col gap-3">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @delete="emit('delete', $event)"
        @toggle="emit('toggle', $event)"
      />
    </div>
    <div v-else class="flex items-center justify-center h-full text-sm text-[var(--el-text-color-secondary)]">
      {{ t('empty') }}
    </div>
  </div>
</template>
