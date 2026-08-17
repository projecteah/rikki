import type { LocaleObject } from '@nuxtjs/i18n'

export const defaultLocale = 'en'

export const locales: LocaleObject[] = [
	{
		code: 'en',
		file: 'en.json',
		language: 'en',
		name: 'English',
	},
	{
		code: 'zh-Hans',
		file: 'zh-cn.json',
		language: 'zh-Hans-CN',
		name: '简体中文',
	},
	{
		code: 'zh-Hant',
		file: 'zh-tw.json',
		language: 'zh-Hant-TW',
		name: '正體中文',
	},
	{
		code: 'yue',
		file: 'yue.json',
		language: 'yue-Hant',
		name: '廣東話',
	},
	// {
	// 	code: 'lzh',
	// 	file: 'lzh.json',
	// 	language: 'lzh',
	// 	name: '文言',
	// },
]

export const availableLocales = [...locales].sort((a, b) => a.code.localeCompare(b.code))

export type AvailableLocales = (typeof locales)[number]['code']
