<script setup lang="ts">
import { SyncConfig } from '../../composables/useSync'
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
  <el-dialog :model-value="visible" @update:model-value="emit('update:visible', $event)" :title="t('settings.title')" width="400px">
    <el-form label-position="top">
      <el-form-item :label="t('settings.language')">
        <el-select v-model="locale" class="w-full">
          <el-option
            v-for="loc in availableLocales"
            :key="loc"
            :label="localeLabels[loc] || loc"
            :value="loc"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('settings.apiBase')">
        <el-input v-model="apiBase" placeholder="https://your-api.vercel.app" />
      </el-form-item>
      <el-form-item :label="t('settings.password')">
        <el-input v-model="password" type="password" placeholder="your password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="emit('update:visible', false)">{{ t('settings.cancel') }}</el-button>
      <el-button type="primary" :loading="loading" @click="onSave">{{ t('settings.save') }}</el-button>
    </template>
  </el-dialog>
</template>
