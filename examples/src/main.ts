import { createApp } from 'vue'
import App from './App.vue'
import '../../packages/bdsaas-bc/style/index.less'
import { initRequestInterceptors } from 'bdsaas-bc'
import router from './router'

function getToken() {
  return 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJiZHNhYXMiLCJzdWIiOiIyNzk3IiwiZXhwIjoxNjg2MTI3ODU0fQ.DbYuEoiihanktkxiL9WzvMYt0Vm8IkddTzPr5MHZa44J-tRjbqAsRKZEo6G0QIGwpoyxs7ZiASkVEVUg7szwKw'
}

initRequestInterceptors(config => {
  config.headers.Authorization = `Bearer ${getToken()}`
  config.headers.companyId = 704
  config.headers.profileId = 2797
  config.params = {
    ...config.params,
    COMPANYID: 704
  }
  return config
})

createApp(App).use(router).mount('#app')
