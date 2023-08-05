import { DefineComponent, VNode } from 'vue'

export interface MenuItem {
  authKeys: string[]
  icon: VNode | DefineComponent
  showItem: boolean
  title: string
  routeName: string
  notice: boolean | string
}

export interface MenuGroup {
  groupName: string
  showGroup: boolean
  children: MenuItem[]
}

export type Menu = MenuGroup[]

export interface NavigationGuardNext {
  (location: { name: string }): void
  (valid: boolean | undefined): void
  (): void
}

export type BeforeJump = (
  to: MenuItem,
  from: MenuItem,
  next: NavigationGuardNext
) => void

// fixme: item 类型改为交叉类型
export type JumpMethod = (item?: MenuItem) => void

export interface SideMenuProps {
  menuData: Menu
  authKeys: string[]
  beforeJump: BeforeJump
  jumpMethod: JumpMethod
}
