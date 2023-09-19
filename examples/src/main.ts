import '@/assets/style/base.less'
import 'bdsaas-bc/style/index.css'
import 'blocks-next/theme-default/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore （webstorm 报错）
import BlocksNext, { Icon } from 'blocks-next'
import ElementPlus from 'element-plus'
import '@/plugins/bdsaas-bc'
import 'element-plus/dist/index.css'

createApp(App)
  .use(router)
  .use(BlocksNext)
  .use(ElementPlus)
  .use(Icon)
  .mount('#app')
