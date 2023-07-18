import http from './index'

export type DepInfo = {
  id: number
  isParent: boolean
  name: string
  pId: number
  type: 'dep' | 'people'
}

type DepList = {
  innerDep: DepInfo[]
}

export const getDepartmentList = (params: any = {}) =>
  http.postForm<DepList>('/bdsaas/ajax/user/getDepartmentList.do', params)
