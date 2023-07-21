import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/business-components/',
  title: 'BDSaas-bc',
  description: 'BDSaas 业务组件库',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '更新日志', link: '/change-log/' }
    ],

    sidebar: [],

    socialLinks: []
  },
  lastUpdated: true,
  vite: {
    server: {
      open: true,
      port: 8888
    },
    ssr: {
      noExternal: ['dz-bi-chart', 'v-viewer']
    }
  }
})
