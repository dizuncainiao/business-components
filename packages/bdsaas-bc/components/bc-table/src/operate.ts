/**
 * 通用增删改操作Composition API
 * @param {string} url 操作接口请求地址
 * @param {string} type 操作方式 add | update | del
 * @param {object} operateForm 操作接口的参数表单
 * @param {object} options 请求参数
 *  @param {string} options.method 请求方法 默认postJson
 *  @param {object} options.params 请求参数 默认{}
 *  @param {object} options.headers 请求头
 *  @param {function} options.formHandle 参数表单处理函数
 *  @param {function} options.afterOperate 操作后回调函数
 *  @param {string} options.successMessage 操作成功后的提示语
 *  @param {string} options.errorMessage 操作失败后的备用提示语 默认会提示后台返回的错误msg
 *  @param {string} options.cancelMessage 取消操作的提示语
 * @returns {object} 返回数据或方法
 *  @returns {function} handle 添加操作函数
 *  @returns {function} cancel 取消添加操作函数
 */

import http from '../../../_plugins/axios-http'
import { getXWSSEHeaders } from '../../../_utils'
import { Message } from 'blocks-next'

type TypeForm = {
  [key: string]: any
}

type TypeOptions = {
  method?: 'postJson' | 'get'
  params?: object
  headers?: object
  formHandle?: (form: TypeForm) => TypeForm
  afterOperate?: (type: 'success' | 'error' | 'cancel', obj: any) => void
  successMessage?: string
  errorMessage?: string
  cancelMessage?: string
}

const typeLabelMap = {
  create: '新增',
  update: '修改',
  del: '删除'
}

export default function (url: string, type: 'create' | 'update' | 'del', operateForm: TypeForm, options: TypeOptions) {

  const _DEFAULT_OPTIONS = {
    method: 'postJson',
    params: {},
    headers: {},
    formHandle: null,
    successMessage: `${typeLabelMap[type]}成功`,
    errorMessage: '操作失败，请稍后重试',
    cancelMessage: '操作取消'
  }

  

  const funcOptions: TypeOptions = Object.assign({}, _DEFAULT_OPTIONS, options) // 合并默认参数

  function handle() {
    let form = Object.assign({}, operateForm)
    // 如果有表单处理函数
    if (funcOptions.formHandle) {
      form = Object.assign({}, operateForm, funcOptions.formHandle(operateForm))
    }

    // 请求参数
    const params = Object.assign({}, form, funcOptions.params)

    // 请求头
    const headers = Object.assign({}, getXWSSEHeaders(), funcOptions.headers)

    // 请求方法
    const method = funcOptions.method || 'postJson'

    // 请求
    return new Promise<void>((resolve, reject) => {
      http[method](url, params, { headers }).then((r) => {
        Message.success({
          message: funcOptions.successMessage
        })
        if (funcOptions.afterOperate) {
          funcOptions.afterOperate('success', r)
        }
        resolve()
      }).catch(e => {
        Message.error({
          message: e.msg || funcOptions.errorMessage,
        })
        if (funcOptions.afterOperate) {
          funcOptions.afterOperate('error', e)
        }
        reject()
      })
    })
  }

  function cancel() {
    Message.info({
      message: funcOptions.cancelMessage
    })
    if (funcOptions.afterOperate) {
      funcOptions.afterOperate('cancel', null)
    }
  }

  

  return {
    handle,
    cancel
  }
}
