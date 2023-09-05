import { createRouter, createWebHashHistory } from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/audio-play-demo'
  },
  {
    path: '/audio-play-demo',
    name: 'AudioPlayDemo',
    component: () => import('@/views/audio-play-demo/AudioPlayDemo.vue')
  },
  {
    path: '/chart-config-modal-demo',
    name: 'BcChartConfigModalDemo',
    component: () =>
      import('@/views/chart-config-modal-demo/BcChartConfigModalDemo.vue')
  },
  {
    path: '/dial-bar-demo',
    name: 'DialBarDemo',
    component: () => import('@/views/dial-bar-demo/DialBarDemo.vue')
  },
  {
    path: '/download-demo',
    name: 'DownloadDemo',
    component: () => import('@/views/download-demo/DownloadDemo.vue')
  },
  {
    path: '/list-search-demo',
    name: 'ListSearchDemo',
    component: () => import('@/views/list-search-demo/ListSearchDemo.vue')
  },
  {
    path: '/table-util-demo',
    name: 'TableUtilDemo',
    component: () => import('@/views/table-util-demo/TableUtilDemo.vue')
  },
  {
    path: '/basic-popover-demo',
    name: 'BasicPopoverDemo',
    component: () => import('@/views/basic-popover-demo/BasicPopoverDemo.vue')
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from)
    return savedPosition || { top: 0 }
  }
})
