export function groupBy(list: any[], key: string, result = []) {
  return list.reduce((prev, curr) => {
    if (curr[key]) {
      prev.push(curr)
    }
    if (curr.children?.length) {
      groupBy(curr.children, key, result)
    }
    return prev
  }, result) as any[]
}
