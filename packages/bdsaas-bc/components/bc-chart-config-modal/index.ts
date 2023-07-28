import { App } from 'vue'
import ChartConfigModal from './src/BcChartConfigModal.vue'

const BcChartConfigModal = Object.assign(ChartConfigModal, {
  install: (app: App) => app.component(ChartConfigModal.name, ChartConfigModal)
})

export default BcChartConfigModal
