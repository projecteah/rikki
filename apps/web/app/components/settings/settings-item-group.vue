<script setup lang="ts">
defineProps<{
	headline: string
}>()
</script>

<template>
	<div class="pb-4">
		<div v-if="headline" class="ml-4 text-sm text-muted uppercase sm:text-xs">
			{{ headline }}
		</div>
		<div class="flex flex-col gap-1 pt-1 first:pt-0">
			<slot />
		</div>
	</div>
</template>
