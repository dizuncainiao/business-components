/******* WuJie App *******/
// 使用VueRouter4
import type { Router } from 'vue-router'
declare global {
  interface Window {
    // 是否存在无界
    __POWERED_BY_WUJIE__?: boolean
    // 子应用mount函数
    __WUJIE_MOUNT: () => void
    // 子应用unmount函数
    __WUJIE_UNMOUNT: () => void
    // 子应用无界实例
    __WUJIE: { mount: () => void }
    // 子应用快捷实例
    $wujie: {
      bus: {
        $on: typeof Function
        $onAll: typeof Function
        $once: typeof Function
        $off: typeof Function
        $offAll: typeof Function
        $emit: typeof Function
        $clear: typeof Function
        id: string
      }
      props: {
        actions: {
          navigation: (params: NavigationType) => void
          reload: () => void
          reloadWindow: () => void
          redirectWindow: (path: string) => void
        }
        attrs: Record<string, any>
      }
    }
  }
}

interface WebComponentRegister {
  router: Router
}

export function isObject(obj: any): obj is Record<string, unknown> {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0
}

export function isEmpty(obj: any): boolean {
  // null undefined '' 排除 0
  if (!obj && obj !== 0) {
    return true
  }
  return isEmptyObject(obj)
}

export class WebComponent {
  public static register({ router }: WebComponentRegister) {
    WebComponent.getInstance().cache.set('router', router)
  }

  public static getRouter() {
    return WebComponent.getInstance().cache.get('router')
  }

  public static getInstance() {
    let instance = WebComponent.instance
    if (!instance || !(instance instanceof WebComponent)) {
      instance = WebComponent.instance = new WebComponent()
    }
    return instance
  }
  protected static instance: InstanceType<typeof WebComponent>
  private cache = new Map()
}

/**
 * 依赖收集
 * 目前只处理vue2/vue3版本
 * @param inject
 */
export function webComponentDependent(inject: WebComponentRegister) {
  WebComponent.register(inject)
}

/**
 * isWebComponent
 * 当前环境是否为子应用
 */
export function isWebComponent() {
  return !!window.__POWERED_BY_WUJIE__
}

/**
 * isMicroApp
 * 当前环境是否为子应用
 * @return {boolean}
 */
export function isMicroApp() {
  return isWebComponent()
}

/**
 * 拿到基座中 web-component组件里attrs的配置
 * @param {String} name
 */
export function getAttr(name: string): any {
  if (isWebComponent()) {
    return window.$wujie?.props?.attrs[name]
  }
  console.warn('请查看基座web-component组件中是否配置attrs')
}

// Navigation
interface NavigationType {
  appName?: string | undefined
  name?: string | undefined
  path?: string | undefined
  query?: Record<string, any>
  mainName?: string | undefined
  mainPath?: string | undefined
  mainQuery?: Record<string, any>
  mainParams?: Record<string, any>
}

/**
 * 刷新当前webComponent
 * 如果作为单独应用跑的话则刷新当前页
 */
export function reload() {
  // 如果是 WebComponent
  if (isWebComponent()) {
    // 刷新当前webComponent
    const reloadFunc = window.$wujie?.props?.actions?.reload
    if (typeof reloadFunc === 'function') {
      reloadFunc()
    }
  } else {
    window.location.reload()
  }
}

/**
 * 刷新整个窗口
 */
export function reloadWindow() {
  // 如果是 WebComponent
  if (isWebComponent()) {
    // 刷新当前webComponent
    const reloadFunc = window.$wujie?.props?.actions?.reloadWindow
    if (typeof reloadFunc === 'function') {
      reloadFunc()
    }
  } else {
    window.location.reload()
  }
}

/**
 * 页面整体重定向
 * @param path
 */
export function redirectWindow(path: string) {
  // 如果是 WebComponent
  if (isWebComponent()) {
    // 刷新当前webComponent
    const reloadFunc = window.$wujie?.props?.actions?.redirectWindow
    if (typeof reloadFunc === 'function') {
      reloadFunc(path)
    }
  } else {
    window.location.href = path
  }
}

/**
 * 执行挂载
 * 按照无界官方的说明，由于vite是异步加载，这里采用主动调用防止用没有mount，无界mount函数内置标记，不用担心重复mount
 */
export function webComponentMount() {
  if (isWebComponent()) {
    try {
      window.__WUJIE.mount()
    } catch (e) {
      console.log('=====Web component mount Error=====', e)
    }
  }
}

type WebComponentEventCallback = () => void

/**
 * 挂载事件
 * @param callback
 */
export function webComponentMountEvent(callback: WebComponentEventCallback) {
  if (typeof callback !== 'function') {
    throw new Error('webComponentMountEvent需要传入回调函数')
  }
  if (isWebComponent()) {
    try {
      // 绑定无界Mount生命周期
      window.__WUJIE_MOUNT = callback
    } catch (e) {
      console.log('=====Web component mount Event Error=====', e)
    }
  } else {
    callback()
  }
}

/**
 * 卸载事件
 * 无界微服务需要手动执行UnMount
 * @param callback
 */
export function webComponentUnMountEvent(callback: WebComponentEventCallback) {
  if (typeof callback !== 'function') {
    throw new Error('webComponentUnMountEvent需要传入回调函数')
  }
  if (isWebComponent()) {
    try {
      // 绑定无界UnMount生命周期
      window.__WUJIE_UNMOUNT = callback
    } catch (e) {
      console.log('=====Web component unMount Event Error=====', e)
    }
  }
}

/**
 * webComponentRouter
 * VueRouter instance
 * 需要使用webComponentDependent进行依赖收集
 */
export function webComponentRouter(): Router {
  return WebComponent.getRouter()
}

export function webComponentName() {
  return isWebComponent() ? window.$wujie?.bus?.id : ''
}

/**
 * 自作微服务跳转统一方法
 * @param appName
 * @param name
 * @param path
 * @param query
 * @param mainName
 * @param mainPath
 * @param mainQuery
 * @param vueRouter
 */
export async function navigation({
  appName,
  name,
  path,
  query,
  mainName,
  mainPath,
  mainQuery,
  mainParams
}: NavigationType) {
  // console.log(
  //   '路由传值参数',
  //   appName,
  //   name,
  //   path,
  //   query,
  //   mainName,
  //   mainPath,
  //   mainQuery
  // )
  // 为微服务
  if (isWebComponent()) {
    // 路由导航
    const navigationFunc = window.$wujie?.props?.actions?.navigation
    // 发送数据
    const sendData: NavigationType = {}
    // 子应用路由Query
    if (isObject(query)) {
      sendData.query = query
    }
    // 子应用传过来的是路由名称
    if (name) {
      sendData.name = name
      // 获取子应用路径
      sendData.path = webComponentRouter().resolve({
        name,
        query: sendData.query
      }).href
    }
    // 子应用传过来的是路径
    if (path) {
      sendData.path = path
    }
    // 需要传到基座的mainQuery
    if (mainName) {
      sendData.mainName = mainName
    }
    // 需要传到基座的mainQuery
    if (mainPath) {
      sendData.mainPath = mainPath
    }
    // 需要传到基座的mainQuery
    if (isObject(mainQuery)) {
      sendData.mainQuery = mainQuery
    }
    // 需要传到基座的mainParams
    if (isObject(mainParams)) {
      sendData.mainParams = mainParams
    }
    // 以下几种存在
    if (appName || mainName || mainPath || mainQuery) {
      if (typeof navigationFunc === 'function') {
        if (appName || mainName || mainPath || mainQuery) {
          if (sendData.path) {
            sendData.mainQuery = {
              ...sendData.mainQuery,
              ...{
                [webComponentName()]: sendData.path
                // 'web.path': sendData.path,
                // 'load.hash': Math.random()
              }
            }
          }
          // console.log(
          //   '===========ROUTE===========',
          //   history.length,
          //   sendData,
          //   webComponentName()
          // )
          navigationFunc(sendData)
          return
        }
        // 执行路由跳转
        await webComponentRouter().push(sendData)
        return
      }
    }
    // 执行路由跳转
    await webComponentRouter().push(sendData)
    // console.log('路由发送的数据------------->>>', sendData)
  }
  // 不为微服务
  else {
    // 发送数据
    const sendData: NavigationType = {}
    // 子应用传过来的是路由名称
    if (name) {
      sendData.name = name
    }
    // 子应用传过来的是路径
    if (path) {
      sendData.path = path
    }
    // 子应用路由Query
    if (isObject(query)) {
      sendData.query = query
    }
    // 需要传到基座的mainQuery在子应用环境中合并
    if (isObject(mainQuery)) {
      sendData.query = isObject(sendData.query)
        ? { ...sendData.query, ...mainQuery }
        : mainQuery
    }
    // 执行路由跳转
    await webComponentRouter().push(sendData)
  }
}

/**
 * 跳转并刷新
 * @param route
 */
export async function reloadTo(route: NavigationType) {
  await navigation(route)
  setTimeout(() => {
    reload()
  }, 100)
}
