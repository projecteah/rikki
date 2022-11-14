<script setup lang="ts">
defineProps<{
  type?: 'primary' | 'default'
  size?: 'small' | 'medium' | 'large'
}>()
</script>

<template>
  <button class="rikki-btn" :class="[`rikki-btn--${type || 'default'}`, `rikki-btn--${size || 'medium'}`]">
    <slot />
  </button>
</template>

<style scoped>
.rikki-btn {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}
.rikki-btn--default {
  background: #f0f0f0;
  color: #333;
}
.rikki-btn--primary {
  background: #00bcd4;
  color: #fff;
}
.rikki-btn--small { padding: 4px 8px; font-size: 12px; }
.rikki-btn--medium { padding: 8px 16px; font-size: 14px; }
.rikki-btn--large { padding: 12px 24px; font-size: 16px; }
</style>
