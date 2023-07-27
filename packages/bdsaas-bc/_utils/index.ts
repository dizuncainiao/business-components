const matchingList = [
  'import "../../../packages/bdsaas-bc/components/bc-audio/style/index.less";',
  'import "../../../packages/bdsaas-bc/components/bc-layout/style/index.less";',
  'import "../../../packages/bdsaas-bc/components/bc-side-menu/style/index.less";'
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
