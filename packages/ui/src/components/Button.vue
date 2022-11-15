<script setup lang="ts">
defineProps<{
  type?: 'primary' | 'default'
  size?: 'small' | 'medium' | 'large'
}>()
</script>

<template>
  <button
    class="btn-base"
    :class="[
      type === 'primary' ? 'bg-[#00bcd4] text-white' : 'bg-[#f0f0f0] text-[#333]',
      size === 'small' ? 'px-2 py-1 text-xs' : size === 'large' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'
    ]"
  >
    <slot />
  </button>
</template>
