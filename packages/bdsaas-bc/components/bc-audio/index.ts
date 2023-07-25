import { App } from 'vue'
import SrcComponent from './src/index.vue'

const BcAudio = Object.assign(SrcComponent, {
  install: (app: App) => app.component(SrcComponent.name, SrcComponent)
})

export default BcAudio
