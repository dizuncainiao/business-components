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
