import http from './index'

export const getDepAndUserTree = (params: any) =>
  http.postForm('/bdsaas/ajax/user/getDepAndUserTree.do', params)

export const QueryInitDep = (params: any) =>
  http.postForm('/bdsaas/ajax/user/queryInitDep.do', params)
