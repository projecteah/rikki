<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
	<UInput
		:icon="appConfig.ui.icons.search"
		color="neutral"
		variant="soft"
		placeholder="Search..."
	/>
</template>
