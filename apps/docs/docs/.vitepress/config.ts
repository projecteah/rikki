import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Rikki',
  description: 'A simple notes app',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'About', link: '/about/' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
        ],
      },
      {
        text: 'About',
        items: [
          { text: 'Behind the Scenes', link: '/about/' },
          { text: 'Philosophy', link: '/about/philosophy' },
        ],
      },
    ],
    footer: {
      message: 'Released under the AGPL-3.0 License.',
      copyright: 'Copyright © 2022-present Xun Lee',
    },
  },
})
