export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
  ],
  colorMode: {
    classSuffix: '',
  },
  alias: {
    '@': '.',
  },
})
