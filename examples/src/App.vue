<script setup lang="ts">
import { BcLayout } from 'bdsaas-bc'
import type { MenuItem } from 'bdsaas-bc/components/bc-side-menu/src/types.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'App'
})
const router = useRouter()
const menuData = [
  {
    groupName: '功能组件',
    showGroup: true,
    children: [
      {
        icon: 'icon-things-icon-2',
        title: '拨号条',
        routeName: 'DialBarDemo',
        showItem: true,
        authKeys: []
      },
      {
        icon: 'icon-things-icon-2',
        title: '图表配置框',
        routeName: 'BcChartConfigModalDemo',
        showItem: true,
        authKeys: []
      },
      {
        icon: 'icon-things-icon-2',
        title: '下载按钮',
        routeName: 'DownloadDemo',
        showItem: true,
        authKeys: []
      },
      {
        icon: 'icon-things-icon-2',
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
        icon: 'icon-things-icon-2',
        title: '表格工具方法',
        routeName: 'TableUtilDemo',
        showItem: true,
        authKeys: []
      }
    ]
  }
]
const options = ref({
  menuData,
  beforeJump: (to: any, from: any, next: any) => {
    // console.log('to: ', to, 'from: ', from, 'next: ', next)
    // todo test one
    // setTimeout(() => next({name: 'TableUtilDemo'}), 2000)
    // todo test two
    // next(false)
    // todo test three
    next()
  },
  jumpMethod: (menuItem: MenuItem) => {
    console.log('menuItem: ', menuItem)
    router.push({ name: menuItem.routeName })
  },
  showMenu: true
})
</script>

<template>
  <BcLayout :options="options">
    <router-view />
  </BcLayout>
</template>
