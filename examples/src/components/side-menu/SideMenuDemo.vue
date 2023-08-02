<template>
  <div style="height: 350px; overflow: hidden; box-shadow: 0 0 8px #eee;">
    <BcSideMenu
      :menuData="menuData"
      :jumpMethod="jumpMethod"
      :beforeJump="beforeJump"
    >
    </BcSideMenu>
  </div>
</template>

<script setup lang="ts">
import { BcSideMenu } from 'bdsaas-bc'

defineOptions({
  name: 'SideMenuDemo'
})

const menuData = [
  {
    groupName: '概况',
    showGroup: true,
    children: [
      {
        icon: 'icon-things-icon-2',
        title: '概况',
        routeName: 'OverviewBi',
        showItem: true,
        authKeys: []
      }
    ]
  },
  {
    groupName: '工作台',
    showGroup: true,
    children: [
      {
        icon: 'icon-things-icon-5',
        title: '通话记录',
        routeName: 'CallRecord',
        showItem: true,
        authKeys: [],
        notice: true
      }
    ]
  },
  {
    groupName: '管理',
    showGroup: true,
    children: [
      {
        icon: 'icon-things-icon-4',
        title: '质检管理',
        routeName: 'QualityInspection',
        showItem: true,
        authKeys: [],
        notice: 9
      },
      {
        icon: 'icon-things-icon-6',
        title: '人员管理',
        routeName: 'PersonnelManagement',
        showItem: true,
        authKeys: []
      },
      {
        icon: 'icon-things-icon-3',
        title: '号码管理',
        routeName: 'NumberManagement',
        showItem: true,
        authKeys: []
      }
    ]
  }
]

function jumpMethod(data: any) {
  console.log('自定义的跳转方法', data)
}

function beforeJump(to: any, from: any, next: (args: any) => void) {
  console.log(to, 'to to')
  console.log(from, 'from from')
  next({ name: 'NumberManagement' })
}
</script>
