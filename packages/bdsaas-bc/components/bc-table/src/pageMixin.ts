/**
 * 通用CRUD Composition API
 * @param readParams {Object} 参考./util.ts的入参说明
 * @param operateParams {Object} 剩余参数，所有的操作参数配置都可以传递进来，参考./operate.ts的入参说明
 * 使用时: const all = PageMixin({}, {}, {}, {});
 * 
 */

import search from './util'
import operate from './operate'

type FormType = {
  [key: string]: any
}

type ReadParamsType = {
  url: string,
  queryForm: FormType,
  options: {
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
    formHandler?: (form: FormType) => FormType
    afterSearch?: () => void
  }
}

type OperateParamType = {
  url: string,
  type: 'create' | 'update' | 'del'
  operateForm: FormType
  options: {
    method?: 'postJson' | 'get'
    params?: object
    headers?: object
    formHandle?: (form: FormType) => FormType
    afterOperate?: (type: 'success' | 'error' | 'cancel', obj: any) => void
    successMessage?: string
    errorMessage?: string
    cancelMessage?: string
  }
}

type OperateReturnsType = {
  handle: () => Promise<void>;
  cancel: () => void;
}

export default function(readParams: ReadParamsType, ...operateParams: Array<OperateParamType>) {

  const {  url, queryForm, options } = readParams

  const searchMachine = search(url, queryForm, options)

  const operateMachine: {
    create: OperateReturnsType
    update: OperateReturnsType,
    del: OperateReturnsType
  } = {
    create: {
      handle: function (): Promise<void> {
        throw new Error('Function not implemented.')
      },
      cancel: function (): void {
        throw new Error('Function not implemented.')
      }
    },
    update: {
      handle: function (): Promise<void> {
        throw new Error('Function not implemented.')
      },
      cancel: function (): void {
        throw new Error('Function not implemented.')
      }
    },
    del: {
      handle: function (): Promise<void> {
        throw new Error('Function not implemented.')
      },
      cancel: function (): void {
        throw new Error('Function not implemented.')
      }
    }
  }

  for (const eachOperate of operateParams) {
    const { url, type, operateForm, options } = eachOperate
    operateMachine[type] = operate(url, type, operateForm, options)
  }

  const handleCreate = () => {
    operateMachine.create?.handle().then(() => {
      searchMachine.search()
    })
  }

  const handleUpdate = () => {
    operateMachine.update.handle().then(() => {
      searchMachine.queryCurrentPage()
    })
  }

  const handleDelete = () => {
    operateMachine.del.handle().then(() => {
      searchMachine.queryCurrentPage()
    })
  }

  const handleCancelOperate = (type: 'create' | 'update' | 'del') => {
    operateMachine[type].cancel()
  }

  return {
    ...searchMachine,
    ...operateMachine,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleCancelOperate
  }
}
