/**
 * 通用表格分页查询Composition API
 * @param {string} url 请求地址
 * @param {object} queryForm 查询条件表单
 * @param {object} options 请求参数
 *  @param {string} options.method 请求方法 默认get
 *  @param {object} options.params 请求参数 默认{}
 *  @param {object} options.headers 请求头
 *  @param {string} options.recordsKey 请求返回数据的key 默认records
 *  @param {string} options.totalKey 请求返回数据总数的key 默认total
 *  @param {string} options.pageSizeKey 请求返回数据每页条数的key 默认size
 *  @param {string} options.pageNumKey 请求返回数据当前页码的key 默认pages
 *  @param {string} options.paramPageKey 请求参数中的页码key 默认pageNo
 *  @param {string} options.paramPageSizeKey 请求参数中的每页条数key 默认pageSize
 *  @param {boolean} options.autoSearch 是否自动查询 默认true
 *  @param {function} options.dataFilter 数据过滤函数
 *  @param {function} options.formHandler 表单处理函数
 *  @param {function} options.afterSearch 查询后的回调函数
 * @returns {object} 返回表格数据
 *  @returns {array} tableData 表格数据
 *  @returns {object} pageConfig 分页数据
 *  @returns {function} search 查询函数
 *  @returns {function} handleSizeChange 每页条数改变函数
 *  @returns {function} handlePageChange 页码改变函数
 *  @returns {function} queryCurrentPage 查询当前页函数
 *  @returns {function} handlePrevPage 上一页函数
 *  @returns {function} handleNextPage 下一页函数
 */

import { reactive, toRefs } from 'vue'
import http from '../../../_plugins/axios-http'
import { getXWSSEHeaders } from '../../../_utils'

type TypeQueryForm = {
  [key: string]: any
}

type TypeOptions = {
  method?: 'get' | 'postForm' | 'postJson'
  params?: object
  headers?: object
  recordsKey?: string
  totalKey?: string
  pageSizeKey?: string
  pageNumKey?: string
  paramPageKey?: string
  paramPageSizeKey?: string
  autoSearch?: boolean
  dataFilter?: (data: any[]) => any[]
  formHandler?: (form: TypeQueryForm) => TypeQueryForm
  afterSearch?: () => void
}

const _DEFAULT_OPTIONS = {
  method: 'get',
  params: {},
  headers: {},
  recordsKey: 'records',
  totalKey: 'total',
  pageSizeKey: 'size',
  pageNumKey: 'current',
  paramPageKey: 'pageNo',
  paramPageSizeKey: 'pageSize',
  autoSearch: true,
  dataFilter: null,
  formHandler: null,
  afterSearch: null
}

export default function (url: string, queryForm: TypeQueryForm, options: TypeOptions) {

  const funcOptions: TypeOptions = Object.assign({}, _DEFAULT_OPTIONS, options) // 合并默认参数

  const paramPageKey = funcOptions.paramPageKey || 'pageNo' // 请求参数中的页码key

  const paramPageSizeKey = funcOptions.paramPageSizeKey || 'pageSize'  // 请求参数中的每页条数key

  const pageParams = reactive({
    [paramPageKey]: 1,
    [paramPageSizeKey]: 10
  })

  const state = reactive({
    tableData: [], // 表格数据
    pageConfig: { // 分页数据
      page: 1,
      pageSize: 10,
      total: 0
    },
    tableLoading: false // 表格loading
  })

  // 接口请求
  function apiHandle() {
    let form = Object.assign({}, queryForm)
    // 如果有表单处理函数
    if (funcOptions.formHandler) {
      form = Object.assign({}, queryForm, funcOptions.formHandler(queryForm))
    }

    // 请求参数
    const params = Object.assign({}, form, pageParams, funcOptions.params)

    // 请求头
    const headers = Object.assign({}, getXWSSEHeaders(), funcOptions.headers)

    // 请求方法
    const method = funcOptions.method || 'get'

    // 请求
    state.tableLoading = true
    http[method](url, params, { headers }).then(({data}) => {
      // recordskey 可能存在有.的情况，递归获取值
      const records = funcOptions.recordsKey ? funcOptions.recordsKey.split('.').reduce((obj, key) => obj[key], data) : data['records']
      state.tableData = funcOptions.dataFilter ? funcOptions.dataFilter(records) : records
      // pageNumKey、pageSizeKey、totalKey 可能存在有.的情况，递归获取值
      const pageSize = funcOptions.pageSizeKey ? funcOptions.pageSizeKey.split('.').reduce((obj, key) => obj[key], data) : pageParams[paramPageKey]
      const page = funcOptions.pageNumKey ? funcOptions.pageNumKey.split('.').reduce((obj, key) => obj[key], data) : pageParams[paramPageSizeKey]
      const total = funcOptions.totalKey ? funcOptions.totalKey.split('.').reduce((obj, key) => obj[key], data) : (state.pageConfig.total || state.tableData.length)
      state.pageConfig = {
        page,
        pageSize,
        total
      }
      state.tableLoading = false
      if (funcOptions.afterSearch) {
        funcOptions.afterSearch()
      }
    }).catch(() => {
      state.tableLoading = false
    })
  }

  // 查询
  function search() {
    pageParams[paramPageKey] = 1
    apiHandle()
  }

  // 每页条数改变
  function handleSizeChange(size: number) {
    pageParams[paramPageKey] = 1
    pageParams[paramPageSizeKey] = size
    apiHandle()
  }

  // 页码改变
  function handlePageChange(page: number) {
    pageParams[paramPageKey] = page
    apiHandle()
  }

  // 查询当前页
  function queryCurrentPage() {
    apiHandle()
  }

  // 上一页
  function handlePrevPage() {
    pageParams[paramPageKey] = pageParams[paramPageKey] - 1
    apiHandle()
  }

  // 下一页
  function handleNextPage() {
    pageParams[paramPageKey] = pageParams[paramPageKey] + 1
    apiHandle()
  }

  funcOptions.autoSearch && search()

  return {
    ...toRefs(state),
    search,
    handleSizeChange,
    handlePageChange,
    queryCurrentPage,
    handlePrevPage,
    handleNextPage
  }
}
