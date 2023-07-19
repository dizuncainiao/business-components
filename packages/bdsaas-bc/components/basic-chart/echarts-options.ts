import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'
import * as allEchartsOptions from './chart-option'

export type AllChartOptions = typeof allEchartsOptions

export type ChartType = keyof AllChartOptions

export function getChartOption(type: ChartType) {
  const option = cloneDeep(Reflect.get(allEchartsOptions, type))
  return ref(option)
}

export default allEchartsOptions
