export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
  ],
  colorMode: {
    classSuffix: '',
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US' },
      { code: 'zh-cn', language: 'zh-CN' },
      { code: 'zh-tw', language: 'zh-TW' },
      { code: 'yue', language: 'yue' },
    ],
    defaultLocale: 'en',
  },
  ssr: false,
  vite: {
    clearScreen: false,
    envPrefix: ['VITE_', 'TAURI_'],
  },
  devtools: {
    enabled: false,
  },
  compatibilityDate: '2026-04-01',
})
