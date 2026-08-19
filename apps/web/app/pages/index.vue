<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
	<div class="flex flex-1">
		<NoteSidebar />
		<div class="flex min-w-0 flex-1 flex-col items-center p-2">
			<div class="grid w-full grid-cols-3 gap-2">
				<NoteListItem />
				<NoteListItem />
				<NoteListItem />
				<NoteListItem />
			</div>
			<div class="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
				<UButton
					:icon="appConfig.ui.icons.plus"
					label="New"
					color="primary"
					variant="soft"
					size="lg"
					class="rounded-full"
				/>
			</div>
		</div>
		<ChatSidebar />
	</div>
</template>
