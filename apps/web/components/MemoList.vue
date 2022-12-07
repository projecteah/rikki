<script setup lang="ts">
import { Memo } from '../../composables/useMemos'
import MemoCard from './MemoCard.vue'

defineProps<{
  memos: Memo[]
}>()

const emit = defineEmits<{
  delete: [id: string]
}>()
</script>

<template>
  <div class="flex-1 overflow-auto px-4 py-3">
    <div v-if="memos.length" class="flex flex-col gap-3">
      <MemoCard
        v-for="memo in memos"
        :key="memo.id"
        :memo="memo"
        @delete="emit('delete', $event)"
      />
    </div>
    <div v-else class="flex items-center justify-center h-full text-sm text-[var(--el-text-color-secondary)]">
      no memos yet
    </div>
  </div>
</template>
