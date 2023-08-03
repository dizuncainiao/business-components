import { createApp } from 'vue'
import App from './App.vue'
import 'bdsaas-bc/style/index.css'
import router from './router'
import BlocksNext, {Icon} from 'blocks-next'
// 引入BlocksNext样式
import 'blocks-next/theme-default/index.css'

createApp(App).use(router).use(BlocksNext).use(Icon).mount('#app')
