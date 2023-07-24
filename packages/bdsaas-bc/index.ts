import './style/index.css'
// 引入BlocksNext样式
import 'blocks-next/theme-default/index.css'

// 业务组件
export { BcSideMenu } from './components/bc-side-menu'

// 通用表格工具类
export { default as BcTableUtil } from './components/bc-table/src/util'

// 录音播放组件
export { BcAudio } from './components/bc-audio'

// 请求拦截器
export { initRequestInterceptors } from './_plugins/axios-http'
