import en from './locales/en.json'
import zhHansCN from './locales/zh-Hans-CN.json'
import zhHantTW from './locales/zh-Hant-TW.json'
import lzh from './locales/lzh.json'
import yue from './locales/yue.json'

export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'en',
	messages: {
		en,
		'zh-Hans-CN': zhHansCN,
		'zh-Hant-TW': zhHantTW,
		lzh,
		yue,
	},
}))
