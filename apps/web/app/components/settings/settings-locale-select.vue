<script lang="ts" setup>
import type { AvailableLocales } from '~~/i18n/locales'
import { availableLocales } from '~~/i18n/locales'
const { locale: currentLocale, locales } = useI18n()

const props = defineProps<{
	modelValue: AvailableLocales
}>()

const emit = defineEmits<{
	'update:modelValue': [value: AvailableLocales]
}>()

const model = computed({
	get: () => props.modelValue,
	set: (val: AvailableLocales) => emit('update:modelValue', val),
})

const processedLocales = computed(() => {
	return availableLocales.map((locale) => {
		const name = new Intl.DisplayNames([currentLocale.value.replace('_', '-')], {
			type: 'language',
			languageDisplay: 'dialect',
		}).of(locale.code)
		return {
			...locale,
			displayName:
				currentLocale.value === locale.code
					? undefined
					: (name ?? $t(`languages.${locale.key as string}`)),
		}
	})
})
</script>

<template>
	<USelectMenu
		v-model="model"
		:items="processedLocales"
		label-key="name"
		value-key="code"
		description-key="displayName"
		:search-input="{ placeholder: $t('settings.general.searchLanguagesPlaceholder') }"
		:ui="{ itemLabel: 'text-sm', itemDescription: 'text-xs' }"
	>
		<!-- <template #item-label="{ item }">
			{{ item.name }}
			<span class="text-muted">
				{{ `- ${$t(`languages.${item.key as string}`)}` }}
			</span>
		</template> -->
	</USelectMenu>
</template>
