import type { InternalAxiosRequestConfig } from 'axios'
import {
  useCompanyId,
  useProfileId,
  useProfileName,
  useToken,
  useXWSSecurity
} from '@/hooks/user-info'

type RequestMiddlewareFunctionList = 'xwsse' | 'userinfo' | 'compatibility'

// 前后端加密
export function setXwSse(config: InternalAxiosRequestConfig) {
  const { xwsse, timestamp } = useXWSSecurity()
  config.headers.xwsse = xwsse
  config.headers.timestamp = timestamp
}

// 后端接收登录用户信息进行一些操作（曹勇：后期可能从网关直接获取，不用传）
export function setUserinfo(config: InternalAxiosRequestConfig) {
  const lowerMethod = config.method?.toLowerCase()

  const userInfo = {
    profileId: useProfileId(),
    profileName: useProfileName(),
    companyId: useCompanyId()
  }

  if (lowerMethod === 'get') {
    config.params = {
      ...config.params,
      ...userInfo
    }
  } else {
    config.data = {
      ...config.data,
      ...userInfo
    }
  }
}

// 老接口的兼容性传参（后期或许会优化吧）
export function compatibilityHandler(config: InternalAxiosRequestConfig) {
  // 兼容需要传 COMPANYID 字段的老接口
  config.params = {
    ...config.params,
    COMPANYID: useCompanyId()
  }
}

type Func = (agr: any) => void

// 收集在一起，设计为可插拔式
const requestMiddlewareFunctions: Record<RequestMiddlewareFunctionList, Func> =
  {
    xwsse: setXwSse,
    userinfo: setUserinfo,
    compatibility: compatibilityHandler
  }

export function requestMiddleware(
  config: InternalAxiosRequestConfig,
  functions: RequestMiddlewareFunctionList[]
) {
  config.baseURL = window.parent.origin // todo：换成工具类，可以根据当前环境判断得到 window
  config.headers.Authorization = `Bearer ${useToken()}`

  functions.forEach(fnName => {
    if (typeof requestMiddlewareFunctions[fnName] === 'function') {
      requestMiddlewareFunctions[fnName](config)
    }
  })

  return config
}
