<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
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
      placeholder="what's on your mind..."
      class="w-full resize-none border-none outline-none text-sm bg-transparent"
      rows="3"
      @keydown.meta.enter="onSubmit"
      @keydown.ctrl.enter="onSubmit"
    />
    <div class="flex justify-end mt-2">
      <el-button type="primary" size="small" @click="onSubmit">send</el-button>
    </div>
  </div>
</template>
