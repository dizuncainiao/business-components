import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/bi-chart/',
  title: 'BI Chart',
  description: 'BI-Chart 图表组件库',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/small-chart/' },
      { text: '更新日志', link: '/change-log/' },
      { text: '进阶主题', link: '/advanced-use/' }
    ],

    sidebar: [
      {
        text: '使用指南',
        items: [
          { text: '快速开始', link: '/quick-start/' },
          { text: '示例：小图表', link: '/small-chart/' },
          { text: '示例：大图标', link: '/big-chart/' }
        ]
      }
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/dizuncainiao/bi-chart/tree/main'
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
      noExternal: ['dz-bi-chart', 'v-viewer']
    }
  }
})
