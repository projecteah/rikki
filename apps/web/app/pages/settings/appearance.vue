<script setup lang="ts">
const settingsStore = useSettingsStore()
const { state } = storeToRefs(settingsStore)

const appConfig = useAppConfig()
</script>

<template>
	<SettingsItem
		:label="$t('settings.appearance.colorMode.label')"
		:icon="appConfig.ui.icons.colorMode"
	>
		<SettingsColorModeTabs v-model="state.colorMode" />
	</SettingsItem>
</template>
