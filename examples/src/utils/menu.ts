import { shallowRef } from 'vue'
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
        icon: shallowRef(BnIconEmpty),
        title: '拨号条',
        routeName: 'DialBarDemo',
        showItem: true,
        authKeys: []
      },
      {
        icon: shallowRef(BnIconEmpty),
        title: '拨号条 Popover',
        routeName: 'BasicPopoverDemo',
        showItem: true,
        authKeys: []
      },
      {
        icon: BnIconSearch,
        title: '图表配置框',
        routeName: 'BcChartConfigModalDemo',
        showItem: true,
        authKeys: []
      },
      {
        icon: shallowRef(BnIconCalendar),
        title: '下载按钮',
        routeName: 'DownloadDemo',
        showItem: true,
        authKeys: [],
        notice: 5
      },
      {
        icon: shallowRef(BnIconSetting),
        title: '音频播放',
        routeName: 'AudioPlayDemo',
        showItem: true,
        authKeys: [],
        notice: true
      }
    ]
  },
  {
    groupName: '工具方法',
    showGroup: true,
    children: [
      {
        icon: shallowRef(BnIconClock),
        title: '表格工具方法',
        routeName: 'TableUtilDemo',
        showItem: true,
        authKeys: []
      }
    ]
  }
]
