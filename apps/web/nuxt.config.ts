export default defineNuxtConfig({
	modules: ['@nuxt/ui', '@nuxtjs/i18n', '@vueuse/nuxt', '@pinia/nuxt'],
	i18n: {
		locales: [
			{ code: 'en', language: 'en-US' },
			{ code: 'zh-cn', language: 'zh-CN' },
			{ code: 'zh-tw', language: 'zh-TW' },
			{ code: 'yue', language: 'yue' },
		],
		defaultLocale: 'en',
	},
	css: ['@/assets/css/main.css'],
	icon: {
		clientBundle: {
			scan: true,
		},
	},
	ssr: false,
	vite: {
		clearScreen: false,
		envPrefix: ['VITE_', 'TAURI_'],
		server: {
			strictPort: true,
			hmr: {
				protocol: 'ws',
				host: '0.0.0.0',
				port: 1421,
			},
			watch: {
				ignored: ['**/src-tauri/**'],
			},
		},
	},
	devServer: {
		port: 1420,
	},
	ui: {
		fonts: false,
	},
	devtools: {
		enabled: false,
	},
	compatibilityDate: '2026-07-30',
})
