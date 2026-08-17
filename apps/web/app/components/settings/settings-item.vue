<script setup lang="ts">
defineProps<{
	label: string
	description?: string
	icon?: string
}>()
</script>

<template>
	<div
		class="flex h-16 items-center gap-2 rounded-sm bg-muted p-4 first:rounded-t-lg last:rounded-b-lg dark:bg-muted/50"
	>
		<UIcon v-if="icon" :name="icon" class="size-6 text-muted" />
		<div class="flex flex-1 flex-col">
			<span class="text-sm font-medium">{{ label }}</span>
			<span v-if="description" class="text-xs text-muted">{{ description }}</span>
		</div>
		<slot class="ml-auto" />
	</div>
</template>
