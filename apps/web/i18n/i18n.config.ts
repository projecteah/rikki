import { defaultLocale } from './locales'

export default defineI18nConfig(() => {
	return {
		fallbackLocale: defaultLocale,
	}
})
