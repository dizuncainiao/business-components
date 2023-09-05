import { App } from 'vue'
import DialBar from './src/BcDialBar.vue'
import DialBarPopover from './src/BcDialBarPopover.vue'

const BcDialBar = Object.assign(DialBar, {
  install: (app: App) => app.component(DialBar.name, DialBar)
})

const BcDialBarPopover = Object.assign(DialBarPopover, {
  install: (app: App) => app.component(DialBarPopover.name, DialBarPopover)
})

export { BcDialBar as default, BcDialBarPopover }
