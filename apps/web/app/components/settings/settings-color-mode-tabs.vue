<script setup lang="ts">
const props = defineProps<{
	modelValue: 'light' | 'dark' | 'system'
}>()

const emit = defineEmits<{
	'update:modelValue': [value: 'light' | 'dark' | 'system']
}>()

const appConfig = useAppConfig()
const colorMode = useColorMode()

const tabValue = computed({
	get() {
		return props.modelValue
	},
	set(val) {
		emit('update:modelValue', val)
		colorMode.preference = val
	},
})

const items = computed(() => [
	{
		value: 'light',
		label: $t('settings.appearance.colorMode.light'),
		icon: appConfig.ui.icons.light,
	},
	{
		value: 'dark',
		label: $t('settings.appearance.colorMode.dark'),
		icon: appConfig.ui.icons.dark,
	},
	{
		value: 'system',
		label: $t('settings.appearance.colorMode.system'),
		icon: appConfig.ui.icons.system,
	},
])
</script>

<template>
	<UTabs
		v-model="tabValue"
		:content="false"
		:items="items"
		color="neutral"
		size="sm"
		class="w-auto"
	/>
</template>
