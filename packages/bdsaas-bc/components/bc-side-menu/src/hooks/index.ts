import { BeforeJump, JumpMethod, MenuItem } from '../types'
import { isBoolean, isFunction, isNaN, isNumber } from 'lodash-es'
import { navigation } from '../../../../_plugins/inhub'

// 角标配置
export function badgeConfig(item: MenuItem) {
  const config: any = {
    type: 'danger'
  }

  if (isBoolean(item.notice) && item.notice) {
    config.isDot = true
  } else if (isNumber(item.notice) && !isNaN(item.notice)) {
    config.value = item.notice
  }

  return config
}

// 内部跳转方法
export function internalJump(jumpMethod: JumpMethod) {
  return isFunction(jumpMethod) ? jumpMethod : defaultJump
}

// 默认跳转方法
export function defaultJump(params: any) {
  return navigation(params)
}

// 点击菜单子项跳转
export function clickToJump(beforeJump: BeforeJump) {
  return isFunction(beforeJump) ? beforeJump : internalJump
}
