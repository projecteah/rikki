<script setup lang="ts">
import { SyncConfig } from '@/composables/useSync'
const { t, locale, availableLocales } = useI18n()

defineProps<{
  visible: boolean
  config: SyncConfig
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  save: [apiBase: string, password: string]
}>()

const apiBase = ref('')
const password = ref('')

watch(() => props.visible, (val) => {
  if (val) {
    apiBase.value = props.config.apiBase || ''
    password.value = ''
  }
})

const onSave = () => {
  emit('save', apiBase.value, password.value)
}

const localeLabels: Record<string, string> = {
  en: 'English',
  'zh-Hans-CN': '简体中文',
  'zh-Hant-TW': '正體中文',
  lzh: '文言',
}
</script>

<template>
  <n-modal :show="visible" @update:show="emit('update:visible', $event)" preset="dialog" :title="t('settings.title')">
    <n-form label-placement="top">
      <n-form-item :label="t('settings.language')">
        <n-select v-model:value="locale" :options="availableLocales.map(l => ({ label: localeLabels[l] || l, value: l }))" />
      </n-form-item>
      <n-form-item :label="t('settings.apiBase')">
        <n-input v-model:value="apiBase" placeholder="https://your-api.vercel.app" />
      </n-form-item>
      <n-form-item :label="t('settings.password')">
        <n-input v-model:value="password" type="password" placeholder="your password" />
      </n-form-item>
    </n-form>
    <template #action>
      <n-button @click="emit('update:visible', false)">{{ t('settings.cancel') }}</n-button>
      <n-button type="primary" :loading="loading" @click="onSave">{{ t('settings.save') }}</n-button>
    </template>
  </n-modal>
</template>
