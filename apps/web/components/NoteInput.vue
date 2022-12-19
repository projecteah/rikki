<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
  modelValue: string
  visibility: 'public' | 'private'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:visibility': [value: 'public' | 'private']
  submit: []
}>()

const onSubmit = () => {
  emit('submit')
}
</script>

<template>
  <div class="px-4 py-3 border-b border-[var(--el-border-color)]">
    <textarea
      :value="props.modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :placeholder="t('input.placeholder')"
      class="w-full resize-none border-none outline-none text-sm bg-transparent"
      rows="3"
      @keydown.meta.enter="onSubmit"
      @keydown.ctrl.enter="onSubmit"
    />
    <div class="flex items-center justify-between mt-2">
      <el-radio-group v-model="props.visibility" @change="emit('update:visibility', $event)">
        <el-radio-button value="private">{{ t('visibility.private') }}</el-radio-button>
        <el-radio-button value="public">{{ t('visibility.public') }}</el-radio-button>
      </el-radio-group>
      <el-button type="primary" size="small" @click="onSubmit">{{ t('input.send') }}</el-button>
    </div>
  </div>
</template>
