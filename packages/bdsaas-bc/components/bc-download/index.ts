import { App } from 'vue'
import SrcComponent from './src/index.vue'

const BcDownload = Object.assign(SrcComponent, {
  install: (app: App) => app.component(SrcComponent.name, SrcComponent)
})

export { BcDownload }
