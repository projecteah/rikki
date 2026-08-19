<script setup lang="ts">
// const props = defineProps<{
// 	note: NoteItem
// }>()

const appConfig = useAppConfig()
</script>

<template>
	<div class="group/note-item-card flex w-full flex-col rounded-2xl bg-muted/50 p-1 select-text">
		<article class="h-full rounded-xl bg-default p-2 py-1">gt</article>
		<div class="flex items-center justify-between gap-2 pl-2 text-xs text-muted sm:py-1 sm:text-sm">
			<div class="flex gap-1 truncate">
				<span class="font-medium">time</span>
				<!-- <span class="text-dimmed">{{ $t('font.styles', { count: styleCount }) }}</span> -->
			</div>
		</div>
	</div>
</template>
