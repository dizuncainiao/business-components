import { App } from 'vue'
import bcSideMenu from './src/BcSideMenu.vue'

const BcSideMenu = Object.assign(bcSideMenu, {
  install: (app: App) => app.component(bcSideMenu.name, bcSideMenu)
})

export { BcSideMenu }
