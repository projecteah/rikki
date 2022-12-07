<script setup lang="ts">
import { SyncConfig } from '../../composables/useSync'

defineProps<{
  visible: boolean
  config: SyncConfig
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
</script>

<template>
  <el-dialog :model-value="visible" @update:model-value="emit('update:visible', $event)" title="sync settings" width="400px">
    <el-form label-position="top">
      <el-form-item label="api base url">
        <el-input v-model="apiBase" placeholder="https://your-api.vercel.app" />
      </el-form-item>
      <el-form-item label="password">
        <el-input v-model="password" type="password" placeholder="your password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="emit('update:visible', false)">cancel</el-button>
      <el-button type="primary" @click="onSave">save</el-button>
    </template>
  </el-dialog>
</template>
