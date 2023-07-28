import {
  BeforeJump,
  JumpMethod,
  Menu,
  MenuItem,
  NavigationGuardNext
} from '../types'
import { isBoolean, isFunction, isNaN, isNumber } from 'lodash-es'
import type { Router } from 'vue-router'

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

// 内部跳转方法（组件内部调用的跳转方法）
export function internalJump(
  jumpMethod: JumpMethod,
  menuData: Menu,
  router: Router
): JumpMethod {
  return (params: any) => {
    let menuItem: unknown
    // internalJump 被作为项目方的 next 回调调用
    if (params && params.name) {
      // 通过 params.name 匹配到 menuData 中的路由
      menuItem = menuData
        .map(group => group.children)
        .flat()
        .find(child => child.routeName === params.name)
    } else {
      // internalJump 在 组件内部调用（params 为 click 的当前菜单项数据）
      menuItem = params
    }
    return isFunction(jumpMethod)
      ? jumpMethod(menuItem as MenuItem)
      : defaultJump(menuItem as MenuItem, router)
  }
}

// 默认跳转方法
export function defaultJump(params: MenuItem, router: Router) {
  const { routeName } = params
  router.push({ name: routeName })
}

// 跳转方法 todo: 考虑 next 参数是否可以直接传 internalJump 简化
export function nextHandler(next: JumpMethod) {
  return (params: any) => {
    // 传入 false，不跳转
    if (isBoolean(params) && !params) {
      return
    }
    // 传入对象，跳转到指定路由
    if (params && params.name) {
      next(params)
    } else {
      // 不传参 (params 值为 undefined)，走内部跳转
      next()
    }
  }
}

type Params = {
  to: MenuItem // 跳转到的路由
  from: MenuItem // 当前路由
  beforeJump: BeforeJump // 跳转前的钩子函数
  jumpMethod: JumpMethod // 外部配置的跳转方法
  menuData: Menu // 菜单数据
  router: Router
}

/**
 * 点击子菜单跳转的处理
 * 1. 如果有 beforeJump 钩子函数，执行钩子函数，否则执行默认跳转
 * 2. 如果 beforeJump 钩子函数中执行了 next(false)，则不跳转
 * 3. 如果 beforeJump 钩子函数中执行了 next({ name: 'xxx' })，则跳转到指定路由
 * 4. 如果 beforeJump 钩子函数中执行了 next()，则执行默认跳转
 * 5. next 方法根据 jumpMethod 参数决定是否执行默认跳转
 */
export function jumpHandler({
  to,
  from,
  beforeJump,
  jumpMethod,
  menuData,
  router
}: Params) {
  // 判断 beforeJump 是否为存在
  if (isFunction(beforeJump)) {
    const navigationNext = () => {
      return (params: any) => {
        if (params) {
          internalJump(jumpMethod, menuData, router)(params)
        } else {
          // 当调用 next()，也就是调用 next 不传参时
          internalJump(jumpMethod, menuData, router)(to)
        }
      }
    }

    beforeJump(
      to,
      from,
      nextHandler(navigationNext()) as NavigationGuardNext // fixme: nextHandler 传入的参数类型不对
    )
  } else {
    // 不存在则直接跳转，执行默认跳转（走 默认跳转方法 或 传入的 jumpMethod）
    internalJump(jumpMethod, menuData, router)(to)
  }
}
