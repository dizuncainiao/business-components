export interface SubItem {
  title: string
  desc?: string
  active: boolean
  type: 1 | 2
}

export type SubChildren = SubItem[]

export interface ChildItem {
  title: string
  open: boolean
  children: SubChildren
}

export type Children = ChildItem[]

export interface MenuItem {
  title: string
  open: boolean
  children: Children
}

export type Menu = MenuItem[]

export interface Props {
  menuData: any
  trigger?: 'click' | 'hover'
}
