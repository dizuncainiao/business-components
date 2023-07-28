// 查询菜单关联报表接口
export interface FormList {
  formProperty: number
  formType: number
  id: number
  menuLimit: string
  reportFormName: string
  type: number
  url: string
  description?: string
}
// 组装数据
export interface Children {
  title: string
  desc?: string
  active: boolean
  compName: string
  reportFormId: number
  type: number
  formProperty: number
}

export interface ReportForms {
  auth: string
  authName: string
  formList?: FormList[]
  icon: string
  parentAuth: string
  parentAuthName: string
  routeName?: string
}
export interface MenuData {
  title: string
  open: boolean
}

interface MyTeamChild extends MenuData {
  children: Children[]
}

export interface MenuDataHasChild extends MenuData {
  children: MyTeamChild[]
}

export interface MyTeam {
  my: MenuDataHasChild[]
  team: MenuDataHasChild[]
}
// ts真好， 给我整吐了
export interface State {
  small: MyTeam
  big: MyTeam
}

// 保存报表接口类型
export interface ReportFormList {
  formSort: number
  reportFormId: number
}
// 保存报表接口传参类型
export interface DataReport {
  big?: Children[]
  small?: Children[]
}
// 初始数据
export interface MenuDataState {
  currentIndex: number
  smallBigChartText: string[]
  menuData: State
}
