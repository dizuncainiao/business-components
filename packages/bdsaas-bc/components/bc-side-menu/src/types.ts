export interface MenuItem {
  authKeys: string[]
  icon: string
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

interface NavigationGuardNext {
  (location: { name: string }): void
  (valid: boolean | undefined): void
}

export type BeforeJump = (
  to: MenuItem,
  from: MenuItem,
  next: NavigationGuardNext
) => void

// fixme: item 类型改为交叉类型
export type JumpMethod = (item: MenuItem) => void
