type ComponentName =
  | 'BcAudio'
  | 'BcChartConfigModal'
  | 'BcOrgSelectModal'
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
  if (!(import.meta as any).env.SSR) {
    import('bdsaas-bc').then((module: any) => {
      component.value = module[componentName]
    })
  }
}
