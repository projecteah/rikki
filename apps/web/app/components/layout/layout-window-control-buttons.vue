<script setup lang="ts">
const appConfig = useAppConfig()
const appWindow = useTauriWindowGetCurrentWindow()

const windowControlButtons = computed(() => [
	{
		key: 'minimize',
		icon: appConfig.ui.icons.minus,
		onClick: async () => {
			await appWindow.minimize()
		},
	},
	{
		key: 'maximize',
		icon: appConfig.ui.icons.square,
		onClick: async () => {
			if (await appWindow.isMaximized()) await appWindow.unmaximize()
			else await appWindow.maximize()
		},
	},
	{
		key: 'close',
		icon: appConfig.ui.icons.close,
		onClick: async () => {
			await appWindow.close()
		},
	},
])
</script>

<template>
	<section class="flex items-center">
		<div class="flex items-center">
			<template v-for="button of windowControlButtons" :key="button.key">
				<UButton
					size="sm"
					variant="ghost"
					color="neutral"
					:icon="button.icon"
					:class="[
						'flex h-(--ui-header-height) w-12 items-center justify-center rounded-none p-0',
						button.key === 'close' && 'hover:bg-error hover:text-white',
					]"
					@click="button.onClick"
				/>
			</template>
		</div>
	</section>
</template>
