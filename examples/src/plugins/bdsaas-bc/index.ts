import { initRequestInterceptors } from 'bdsaas-bc'
import { requestMiddleware } from '@/middleware'

initRequestInterceptors(config =>
  requestMiddleware(config, ['xwsse', 'userinfo', 'compatibility'])
)
