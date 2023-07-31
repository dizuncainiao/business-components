import type { App } from 'vue'
import './style/index.css'
// 引入BlocksNext样式
import 'blocks-next/theme-default/index.css'
// 按需引入 element-plus 样式
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/icon/style/css'
import 'element-plus/es/components/tab-pane/style/css'
import 'element-plus/es/components/tabs/style/css'
import 'element-plus/es/components/tooltip/style/css'

// 业务组件
import BcSideMenu from './components/bc-side-menu'
import BcLayout from './components/bc-layout'
import BcAudio from './components/bc-audio'
import BcDownload from './components/bc-download'
import BcListSearch from './components/bc-list-search'
import BcDialBar from './components/bc-dial-bar'
import BcChartConfigModal from './components/bc-chart-config-modal'

// 通用表格工具类
import BcTableUtil from './components/bc-table/src/util'

// 请求拦截器
import { initRequestInterceptors } from './_plugins/axios-http'

export {
  BcSideMenu,
  BcLayout,
  BcAudio,
  BcDownload,
  BcListSearch,
  BcDialBar,
  BcChartConfigModal,
  BcTableUtil,
  initRequestInterceptors
}

const components = [
  BcSideMenu,
  BcLayout,
  BcAudio,
  BcDownload,
  BcListSearch,
  BcDialBar,
  BcChartConfigModal
]

export default function (app: App) {
  components.forEach(component => component.install(app))
}
