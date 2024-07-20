export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
  ],
  colorMode: {
    classSuffix: '',
  },
})
