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
        items: [
          { text: 'SideMenu 导航菜单', link: '/side-menu/' },
          { text: 'Layout 整体布局', link: '/layout/' },
          { text: 'DialBar 拨号条', link: '/dial-bar/' },
          { text: 'ChartConfigModal 图表配置框', link: '/chart-config-modal/' }
        ]
      },
      {
        text: '功能组件',
        items: [
          { text: '下载按钮', link: '/download/' },
          { text: '音频播放', link: '/audio-player/' },
          { text: '表格工具方法', link: '/table/utils' },
          { text: '组织架构树选择框', link: '/org-select-modal/' }
        ]
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
      port: 8888
    },
    ssr: {
      noExternal: ['bdsaas-bc', 'v-viewer']
    }
  }
})
