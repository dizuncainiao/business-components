import { Message } from 'blocks-next'
import md5 from 'md5'

const matchingList = [
  'import "../../../packages/bdsaas-bc/components/bc-audio/style/index.less";',
  'import "../../../packages/bdsaas-bc/components/bc-layout/style/index.less";',
  'import "../../../packages/bdsaas-bc/components/bc-side-menu/style/index.less";',
  'import "../../../packages/bdsaas-bc/components/bc-list-search/style/index.less";',
  'import "../../../packages/bdsaas-bc/components/bc-dial-bar/style/index.less";',
  'import "../../../packages/bdsaas-bc/components/bc-download/style/index.less";',
  'import "../../../packages/bdsaas-bc/components/bc-chart-config-modal/style/index.less";',
  'import "../../../packages/bdsaas-bc/components/bc-org-select-modal/style/index.less";'
]

const replaceVal = 'import "../style/index.css";'

export function replaceBundle(code: string) {
  matchingList.forEach(searchVal => {
    code = code.replace(searchVal, replaceVal)
  })
  return code
}

export function secondsToHms(seconds: number) {
  seconds = Math.floor(seconds)
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = (seconds % 3600) % 60
  return { h, m, s }
}

export function complementaryZeroes(
  val: number | string,
  digits: number
): string {
  return '0'.repeat(digits).concat(val.toString())
}

export function addZeros(val: number): string {
  return val.toString().length < 2
    ? complementaryZeroes(val, 1)
    : val.toString()
}

export function getXWSSEHeaders() {
  const token = localStorage.getItem('_BDSAAS_TOKEN') || 'empty_token'
  if (token === 'empty_token') {
    Message.error('token为空')
    return {}
  }
  const authorization = 'Bearer ' + token
  const timestamp = new Date().getTime()
  const xwsse = md5(`token${token}timestamp${timestamp}`)
  return {
    authorization,
    timestamp,
    xwsse,
    'Tracking-Url': window.parent.location.href
  }
}
