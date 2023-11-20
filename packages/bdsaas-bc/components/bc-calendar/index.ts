import { App } from 'vue'
import bcCalendar from './src/BcCalendar.vue'

const BcCalendar = Object.assign(bcCalendar, {
  install: (app: App) => app.component(bcCalendar.name, bcCalendar)
})

export default BcCalendar
