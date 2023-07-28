import { createRouter, createWebHashHistory } from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/test-one'
  },
  {
    path: '/test-one',
    name: 'TestOne',
    component: () => import('@/views/TestOne.vue')
  },
  {
    path: '/test-two',
    name: 'TestTwo',
    component: () => import('@/views/TestTwo.vue')
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
