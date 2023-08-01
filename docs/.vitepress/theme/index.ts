// https://vitepress.dev/guide/custom-theme
// @ts-ignore
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.less'
import './viewer.css'
import 'bdsaas-bc/dist/es/style.css'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
