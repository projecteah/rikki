<script setup lang="ts">
const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const { t } = useI18n()

const shortcuts = [
  { keys: ['Mod', 'N'], desc: t('shortcuts.newNote') },
  { keys: ['Mod', 'K'], desc: t('shortcuts.search') },
  { keys: ['Mod', 'S'], desc: t('shortcuts.sync') },
  { keys: ['Mod', 'D'], desc: t('shortcuts.darkMode') },
  { keys: ['Mod', '/'], desc: t('shortcuts.showHelp') },
]
</script>

<template>
  <n-modal :show="props.visible" @update:show="emit('update:visible', $event)" preset="dialog" :title="t('shortcuts.title')">
    <div class="flex flex-col gap-3">
      <div v-for="shortcut in shortcuts" :key="shortcut.keys.join('+')" class="flex items-center justify-between">
        <span class="text-sm text-[var(--n-text-color)]">{{ shortcut.desc }}</span>
        <div class="flex gap-1">
          <n-tag v-for="key in shortcut.keys" :key="key" size="small" type="info">{{ key }}</n-tag>
        </div>
      </div>
    </div>
  </n-modal>
</template>
