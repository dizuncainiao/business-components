import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'dz-bi-chart/style/index.css'
import { initRequestInterceptors } from 'dz-bi-chart'

function getToken() {
  return 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJiZHNhYXMiLCJzdWIiOiIyNzk3IiwiZXhwIjoxNjg2MTI3ODU0fQ.DbYuEoiihanktkxiL9WzvMYt0Vm8IkddTzPr5MHZa44J-tRjbqAsRKZEo6G0QIGwpoyxs7ZiASkVEVUg7szwKw'
}

function getCompanyId() {
  return 704
}

initRequestInterceptors(config => {
  config.headers.Authorization = `Bearer ${getToken()}`

  config.headers.companyId = 704
  config.headers.profileId = 2797
  config.params = {
    ...config.params,
    COMPANYID: getCompanyId()
  }
  return config
})

createApp(App).mount('#app')
