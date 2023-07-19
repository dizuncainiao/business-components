import { App } from 'vue'
import basicSmallLayout from './BasicSmallLayout.vue'

const BasicSmallLayout = Object.assign(basicSmallLayout, {
  install: (app: App) => app.component(basicSmallLayout.name, basicSmallLayout)
})

export { BasicSmallLayout }
