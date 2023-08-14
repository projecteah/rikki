<script setup lang="ts">
import { useLinkPreview } from '../../composables/useLinkPreview'

const props = defineProps<{
  url: string
}>()

const { fetchPreview } = useLinkPreview()
const preview = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  preview.value = await fetchPreview(props.url)
  loading.value = false
})
</script>

<template>
  <a
    v-if="!loading && preview"
    :href="url"
    target="_blank"
    rel="noopener"
    class="flex border border-[var(--n-border-color)] rounded-lg overflow-hidden hover:bg-[var(--n-color-hover)] transition-colors no-underline"
  >
    <img
      v-if="preview.image"
      :src="preview.image"
      class="w-24 h-24 object-cover flex-shrink-0"
    />
    <div class="p-3 flex-1 min-w-0">
      <div class="text-sm font-medium text-[var(--n-text-color)] truncate">{{ preview.title }}</div>
      <div class="text-xs text-[var(--n-text-color-disabled)] truncate">{{ preview.description }}</div>
      <div class="text-xs text-[var(--n-text-color-disabled)] mt-1 truncate">{{ url }}</div>
    </div>
  </a>
</template>
