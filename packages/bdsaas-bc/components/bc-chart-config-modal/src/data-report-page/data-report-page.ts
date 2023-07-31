import { SmallTagData } from './type'

export function setChartStatus(state: any, index: number) {
  state.currentIndex = index
}

// 收集小报表的长度
export function smLength(data: SmallTagData['small']) {
  const mySmCr = data?.my[0]?.children[0]?.children.filter(i => i.active) || []
  const tmSmCr =
    data?.team[0]?.children[0]?.children.filter(i => i.active) || []
  const smData = [...mySmCr, ...tmSmCr]
  return smData.length
}
