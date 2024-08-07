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

// 将 children.length 为 0 的部门节点设为 disabled
export function setDisabled(arr: any[]): any {
  // arr.forEach((item: any) => {
  //   if (item.type === 'dep' && item.children?.length === 0) {
  //     item.disabled = true
  //   }
  //   if (item.children?.length) {
  //     setDisabled(item.children)
  //   }
  // })
  // return arr

  const stack = [...arr] // 创建一个栈用于迭代处理

  while (stack.length > 0) {
    const item = stack.pop()
    if (
      item.type === 'dep' &&
      item.children !== undefined &&
      Array.isArray(item.children) &&
      item.children.length >= 0
    ) {
      if (item.children.length === 0) {
        item.disabled = true
      }
      if (item.children.length > 0) {
        stack.push(...item.children) // 将子元素加入到栈中继续处理
      }
    }
  }
}

export function setDisabledSingle(arr: any[]): any {
  // arr.forEach((item: any) => {
  //   if (item.type === 'dep') {
  //     item.disabled = true
  //   }
  //   if (item.children?.length) {
  //     setDisabledSingle(item.children)
  //   }
  // })

  const stack = [...arr] // 创建一个栈用于迭代处理

  while (stack.length > 0) {
    const item = stack.pop()
    if (item.type === 'dep') {
      item.disabled = true
      if (item.children.length > 0) {
        stack.push(...item.children) // 将子元素加入到栈中继续处理
      }
    }
  }
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
      if (item.children?.length) {
        addLabelValue(item.children)
      } else if (item.type === 'dep') {
        // 部门禁用
        item.disabled = item.type === 'dep'
      }
    })
  }

  addLabelValue(treeData)

  return treeData
}
