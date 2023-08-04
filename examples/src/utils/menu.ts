import { h } from 'vue'
import {
  BnIconEmpty,
  BnIconSearch,
  BnIconCalendar,
  BnIconSetting,
  BnIconClock
} from 'blocks-next'

export const menuData = [
  {
    groupName: '功能组件',
    showGroup: true,
    children: [
      {
        icon: h(BnIconEmpty),
        title: '拨号条',
        routeName: 'DialBarDemo',
        showItem: true,
        authKeys: []
      },
      {
        icon: h(BnIconSearch),
        title: '图表配置框',
        routeName: 'BcChartConfigModalDemo',
        showItem: true,
        authKeys: []
      },
      {
        icon: h(BnIconCalendar),
        title: '下载按钮',
        routeName: 'DownloadDemo',
        showItem: true,
        authKeys: []
      },
      {
        icon: h(BnIconSetting),
        title: '音频播放',
        routeName: 'AudioPlayDemo',
        showItem: true,
        authKeys: []
      }
    ]
  },
  {
    groupName: '工具方法',
    showGroup: true,
    children: [
      {
        icon: h(BnIconClock),
        title: '表格工具方法',
        routeName: 'TableUtilDemo',
        showItem: true,
        authKeys: []
      }
    ]
  }
]
