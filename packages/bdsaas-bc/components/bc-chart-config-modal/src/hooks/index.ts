import { MenuConfig, MenuSourceData } from '../types'
import { Menu } from '../components/basic-menu/types'

export function generateMenuItem(
  title: string,
  childTitle: string,
  children: Menu
) {
  return [
    {
      title: title,
      open: false,
      children: [
        {
          title: childTitle,
          open: false,
          children: children
        }
      ]
    }
  ]
}

export function getMyAndTeam(list: any[]) {
  return {
    my: list
      .filter(item => item.formProperty === 1)
      .map(item => ({
        ...item,
        title: item.reportFormName,
        desc: item.description,
        active: item.active,
        compName: item.url
      })),
    team: list
      .filter(item => item.formProperty === 2)
      .map(item => ({
        ...item,
        title: item.reportFormName,
        desc: item.description,
        active: item.active,
        compName: item.url
      }))
  }
}

export function useMenuData(
  menuSourceData: MenuSourceData,
  menuConfig: MenuConfig = []
) {
  const {
    formList = [],
    authName = '事儿电话',
    parentAuthName = '营销中心'
  } = menuSourceData ?? {}

  const useConfiguredChartCompNames = {
    smallList: menuConfig.filter(item => item.type === 1).map(item => item.url),
    bigList: menuConfig.filter(item => item.type === 2).map(item => item.url)
  }

  const { smallList, bigList } = useConfiguredChartCompNames

  const smallChartList = formList
    .filter(item => item.type === 1)
    .map(item => ({
      ...item,
      active: smallList.includes(item.url)
    }))

  const bigChartList = formList
    .filter(item => item.type === 2)
    .map(item => ({
      ...item,
      active: bigList.includes(item.url)
    }))

  const handleSmallAndBig = {
    small: getMyAndTeam(smallChartList),
    big: getMyAndTeam(bigChartList)
  }

  const { small, big } = handleSmallAndBig

  return {
    small: {
      my: generateMenuItem(parentAuthName, authName, small.my),
      team: generateMenuItem(parentAuthName, authName, small.team)
    },
    big: {
      my: generateMenuItem(parentAuthName, authName, big.my),
      team: generateMenuItem(parentAuthName, authName, big.team)
    }
  }
}
