import type { App } from 'vue'
import './style/index.css'
// 引入BlocksNext样式
import 'blocks-next/theme-default/index.css'

// 业务组件
import BcSideMenu from './components/bc-side-menu'
import BcLayout from './components/bc-layout'
import BcAudio from './components/bc-audio'

// 通用表格工具类
import BcTableUtil from './components/bc-table/src/util'

// 请求拦截器
import { initRequestInterceptors } from './_plugins/axios-http'

export { BcSideMenu, BcLayout, BcAudio, BcTableUtil, initRequestInterceptors }

const components = [BcSideMenu, BcLayout, BcAudio]

export default function (app: App) {
  components.forEach(component => component.install(app))
}
