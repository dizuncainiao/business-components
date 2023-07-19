import AxiosHttp, { RequestInterceptors } from './http'

const http = new AxiosHttp({
  baseURL: '',
  timeout: 60 * 1000
})

export const initRequestInterceptors = (callback: RequestInterceptors) => {
  http.requestInterceptors(callback)
}

export default http
