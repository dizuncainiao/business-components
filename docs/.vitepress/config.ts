import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/business-components/',
  title: 'BDSaas BC',
  description: 'BDSaas 业务组件库',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/side-menu/' },
      { text: '更新日志', link: '/change-log/' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [{ text: '快速上手', link: '/quick-start/' }]
      },
      {
        text: '布局组件',
        items: [{ text: '左侧菜单', link: '/side-menu/' }]
      }
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/dizuncainiao/business-components'
      }
    ]
  },
  lastUpdated: true,
  vite: {
    server: {
      open: true,
      port: 8888
    },
    ssr: {
      noExternal: ['bdsaas-bc', 'v-viewer']
    }
  }
})
