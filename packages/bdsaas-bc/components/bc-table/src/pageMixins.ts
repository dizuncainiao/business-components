/**
 * 通用CRUDComposition API
 */

import search from './util'
import operate from './operate'

export default function(searchParams: any, ...operates: any) {

  const {  url, queryForm, options } = searchParams

  const read = search(url, queryForm, options)

  const operateObjects = {
    create: {},
    update: {},
    del: {}
  }

  for (const eachOperate of operates) {
    const { url, type, operateForm, options } = eachOperate
    operateObjects[type] = operate(url, type, operateForm, options)
  }

  return {
    ...read
  }
}
