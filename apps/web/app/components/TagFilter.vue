<script setup lang="ts">
defineProps<{
  tags: string[]
  activeTag: string | null
}>()

const emit = defineEmits<{
  select: [tag: string | null]
}>()
</script>

<template>
  <div v-if="tags.length" class="px-4 py-2 border-b border-[var(--n-border-color)] flex gap-2 flex-wrap">
    <n-tag
      v-for="tag in tags"
      :key="tag"
      :type="activeTag === tag ? 'primary' : 'info'"
      class="cursor-pointer"
      @click="emit('select', activeTag === tag ? null : tag)"
    >
      #{{ tag }}
    </n-tag>
  </div>
</template>
