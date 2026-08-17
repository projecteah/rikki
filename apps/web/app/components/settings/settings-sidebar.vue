<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const appConfig = useAppConfig()

const items = computed<NavigationMenuItem[]>(() => [
	{
		label: $t('settings.general.label'),
		icon: appConfig.ui.icons.settings,
		to: appConfig.routes.settings.general,
	},
	{
		label: $t('settings.appearance.label'),
		icon: appConfig.ui.icons.appearance,
		to: appConfig.routes.settings.appearance,
	},
])
</script>

<template>
	<USidebar rail collapsible="icon">
		<UNavigationMenu
			:items="items"
			orientation="vertical"
			:ui="{ link: 'p-1.5 overflow-hidden' }"
		/>
	</USidebar>
</template>
