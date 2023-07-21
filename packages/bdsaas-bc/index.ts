import './style/index.css'
// 引入BlocksNext样式
import 'blocks-next/theme-default/index.css'

// 业务组件
export { BcSideMenu } from './components/bc-side-menu'

// 请求拦截器
export { initRequestInterceptors } from './_plugins/axios-http'