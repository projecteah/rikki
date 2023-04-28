<script setup lang="ts">
import { Note } from '../../composables/useNotes'
import { formatTime } from '../../utils'
const { t } = useI18n()

const props = defineProps<{
  note: Note
}>()

const emit = defineEmits<{
  delete: [id: string]
  toggle: [id: string]
  pin: [id: string]
}>()

const render = (content: string) => {
  return content
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
}
</script>

<template>
  <div class="p-3 rounded-lg bg-[var(--el-fill-color-light)] hover:bg-[var(--el-fill-color)] transition-colors">
    <div class="flex items-start justify-between gap-2">
      <div class="flex-1 text-sm markdown-body" v-html="render(note.content)"></div>
      <div class="flex items-center gap-1">
        <el-button size="small" link @click="emit('pin', note.id)">
          <el-icon :size="14">
            <StarFilled v-if="note.pinned" />
            <Star v-else />
          </el-icon>
        </el-button>
        <el-button size="small" link @click="emit('toggle', note.id)">
          <el-icon :size="14">
            <Lock v-if="note.visibility === 'private'" />
            <View v-else />
          </el-icon>
        </el-button>
        <el-button size="small" type="danger" link @click="emit('delete', note.id)">{{ t('action.delete') }}</el-button>
      </div>
    </div>
    <div class="flex items-center gap-2 mt-2 text-xs text-[var(--el-text-color-secondary)]">
      <span>{{ formatTime(note.createdAt) }}</span>
      <span v-for="tag in note.tags" :key="tag" class="px-1.5 py-0.5 rounded bg-[var(--el-color-primary-light-9)] text-[var(--el-color-primary)]">#{{ tag }}</span>
    </div>
  </div>
</template>
