export function getTreeData(arr: any[]) {
  const pIdMap = groupBy(arr, 'pId')

  pIdMap.forEach((value: any[], pId: string, map: Map<number, any[]>) => {
    for (const node of value) {
      node.children = map.get(node.id) || []
    }
  })

  // 获取最顶层父级
  return pIdMap.get(0) || []
}

// 收集 pId 下的所有子集
function groupBy(arr: any[], key: string) {
  return arr.reduce((prevValue, currentValue) => {
    if (currentValue) {
      currentValue.label = currentValue.name
      currentValue.value = currentValue.id
    }

    const pId = currentValue?.[key]
    if (prevValue.has(pId) && prevValue.get(pId)?.length) {
      prevValue.get(pId)?.push(currentValue)
    } else {
      const children = []
      children.push(currentValue)
      prevValue.set(pId, children)
    }
    return prevValue
  }, new Map())
}
