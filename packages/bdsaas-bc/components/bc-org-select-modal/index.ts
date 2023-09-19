import { App } from 'vue'
import bcOrgSelectModal from './src/BcOrgSelectModal.vue'

const BcOrgSelectModal = Object.assign(bcOrgSelectModal, {
  install: (app: App) => app.component(bcOrgSelectModal.name, bcOrgSelectModal)
})

export default BcOrgSelectModal
