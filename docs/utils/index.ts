import { BcSideMenu } from 'bdsaas-bc'
import { BcLayout } from 'bdsaas-bc'
import { BcListSearch } from 'bdsaas-bc'
import { BcTableUtil } from 'bdsaas-bc'
import { BcDialBar } from 'bdsaas-bc'
import { BcChartConfigModal } from 'bdsaas-bc'
import { BcAudio } from 'bdsaas-bc'
import { BcDownload } from 'bdsaas-bc'
import { initRequestInterceptors } from 'bdsaas-bc'

const components = {
  BcAudio,
  BcChartConfigModal,
  BcDialBar,
  BcDownload,
  BcLayout,
  BcListSearch,
  BcSideMenu,
  BcTableUtil,
  initRequestInterceptors
}

type ComponentName =
  | 'BcAudio'
  | 'BcChartConfigModal'
  | 'BcDialBar'
  | 'BcDownload'
  | 'BcLayout'
  | 'BcListSearch'
  | 'BcSideMenu'
  | 'BcTableUtil'
  | 'default'
  | 'initRequestInterceptors'

export async function useBDSaasBC(
  component: any,
  componentName: ComponentName
) {
  console.log('ssr', import.meta.env.SSR)
  if (!import.meta.env.SSR) {
    import('bdsaas-bc').then((module: any) => {
      component.value = module[componentName]
    })
  } else {
    component.value = components[componentName]
  }
}
