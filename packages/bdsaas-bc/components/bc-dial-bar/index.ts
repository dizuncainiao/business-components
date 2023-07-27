import { App } from 'vue'
import DialBar from './src/BcDialBar.vue'

const BcDialBar = Object.assign(DialBar, {
  install: (app: App) => app.component(DialBar.name, DialBar)
})

export default BcDialBar
