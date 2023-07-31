export interface Item {
  menuLimit: string // 权限标识
  reportFormName: string // 报表名字
  formType: number // 报表类型图形类型
  formProperty: 1 | 2 | 3 // 报表属性1我的 2团队 3其他
  formSort: number
  id: number
  type: 1 | 2 // 报表类型1小 2大
  url: string // 数据链接
  description?: string
}

export type MenuSourceData = {
  parentAuth: string
  auth: string
  parentAuthName: string
  authName: string
  icon: string
  formList: Item[]
  routeName?: null
}

export type MenuConfig = Item[]
