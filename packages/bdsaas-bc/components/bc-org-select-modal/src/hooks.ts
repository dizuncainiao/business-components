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

export function initTreeData(treeData: any[]) {
  const idMap = new Map()

  function addIdMap(arr: any[]) {
    arr.forEach((item: any) => {
      idMap.set(item.id, item)
      if (item.children) {
        addIdMap(item.children)
      }
    })
  }

  addIdMap(treeData)

  function addLabelValue(arr: any[]) {
    arr.forEach((item: any) => {
      item.label = item.name
      item.value = item.id
      item.depName = idMap.get(item.parentId)?.name
      if (item.children) {
        addLabelValue(item.children)
      }
    })
  }

  addLabelValue(treeData)

  return treeData
}
