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
  <div class="px-4 py-3 border-b border-[var(--n-border-color)]">
    <n-input
      :value="props.modelValue"
      @update:value="emit('update:modelValue', $event)"
      type="textarea"
      :placeholder="t('input.placeholder')"
      :autosize="{ minRows: 3, maxRows: 6 }"
    />
    <div class="flex items-center justify-between mt-2">
      <n-radio-group :value="props.visibility" @update:value="emit('update:visibility', $event)">
        <n-radio-button value="private">{{ t('visibility.private') }}</n-radio-button>
        <n-radio-button value="public">{{ t('visibility.public') }}</n-radio-button>
      </n-radio-group>
      <n-button type="primary" size="small" @click="onSubmit">{{ t('input.send') }}</n-button>
    </div>
  </div>
</template>
