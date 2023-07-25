import { App } from 'vue'
import bcLayout from './src/BcLayout.vue'

const BcLayout = Object.assign(bcLayout, {
  install: (app: App) => app.component(bcLayout.name, bcLayout)
})

export default BcLayout
