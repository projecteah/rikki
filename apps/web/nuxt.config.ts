import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

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
  vite: {
    plugins: [
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
})
