export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  ssr: false,
  telemetry: false,
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
  ],
  colorMode: {
    classSuffix: '',
  },
})
