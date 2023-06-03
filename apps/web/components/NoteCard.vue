<script setup lang="ts">
import { Note } from '@/composables/useNotes'
import { formatTime } from '@/utils'
const { t } = useI18n()

const props = defineProps<{
  note: Note
}>()

const emit = defineEmits<{
  delete: [id: string]
  toggle: [id: string]
  pin: [id: string]
  edit: [id: string, content: string]
}>()

const editing = ref(false)
const editContent = ref('')

const startEdit = () => {
  editContent.value = props.note.content
  editing.value = true
}

const saveEdit = () => {
  emit('edit', props.note.id, editContent.value.trim())
  editing.value = false
}

const cancelEdit = () => {
  editing.value = false
}

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
  <div class="p-3 rounded bg-[var(--n-color)] hover:bg-[var(--n-color-hover)] transition-colors">
    <div v-if="editing">
      <n-input
        v-model:value="editContent"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 6 }"
      />
      <div class="flex justify-end gap-1 mt-2">
        <n-button size="small" @click="cancelEdit">{{ t('action.cancel') }}</n-button>
        <n-button size="small" type="primary" @click="saveEdit">{{ t('action.save') }}</n-button>
      </div>
    </div>
    <div v-else>
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1 text-sm markdown-body" v-html="render(note.content)"></div>
        <div class="flex items-center gap-1">
          <n-button size="small" quaternary @click="startEdit">
            <template #icon><n-icon :size="14"><Edit /></n-icon></template>
          </n-button>
          <n-button size="small" quaternary @click="emit('pin', note.id)">
            <template #icon><n-icon :size="14"><StarFilled v-if="note.pinned" /><Star v-else /></n-icon></template>
          </n-button>
          <n-button size="small" quaternary @click="emit('toggle', note.id)">
            <template #icon><n-icon :size="14"><Lock v-if="note.visibility === 'private'" /><Eye v-else /></n-icon></template>
          </n-button>
          <n-button size="small" quaternary type="error" @click="emit('delete', note.id)">{{ t('action.delete') }}</n-button>
        </div>
      </div>
      <div class="flex items-center gap-2 mt-2 text-xs text-[var(--n-text-color-disabled)]">
        <span>{{ formatTime(note.createdAt) }}</span>
        <n-tag v-for="tag in note.tags" :key="tag" size="small" :bordered="false">#{{ tag }}</n-tag>
      </div>
    </div>
  </div>
</template>
