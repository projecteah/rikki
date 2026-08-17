<script setup lang="ts">
const settingsStore = useSettingsStore()
const { state } = storeToRefs(settingsStore)

const appConfig = useAppConfig()
</script>

<template>
	<SettingsItem :label="$t('settings.general.language')" :icon="appConfig.ui.icons.globe">
		<SettingsLocaleSelect v-model="state.locale" />
	</SettingsItem>
</template>
