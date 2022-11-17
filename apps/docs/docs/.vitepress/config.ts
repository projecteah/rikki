import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Rikki',
  description: 'A simple notes app',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
        ],
      },
    ],
  },
})
