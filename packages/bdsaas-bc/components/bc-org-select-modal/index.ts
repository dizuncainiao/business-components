import { App } from 'vue'
import bcOrgSelectModal from './src/BcOrgSelectModal.vue'
import bcOrgSelectModalYkc from './src/BcOrgSelectModalYkc.vue'

const BcOrgSelectModal = Object.assign(bcOrgSelectModal, {
  install: (app: App) => app.component(bcOrgSelectModal.name, bcOrgSelectModal)
})
const BcOrgSelectModalYkc = Object.assign(bcOrgSelectModalYkc, {
  install: (app: App) =>
    app.component(bcOrgSelectModalYkc.name, bcOrgSelectModalYkc)
})

export default BcOrgSelectModal

export { BcOrgSelectModalYkc }
