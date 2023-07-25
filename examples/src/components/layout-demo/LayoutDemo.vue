<script setup lang="ts">
import { BcLayout } from 'bdsaas-bc'
import { ref } from 'vue'

defineOptions({
  name: 'LayoutDemo'
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
const options = ref({
  menuData,
  jumpMethod: (routeName: string) => {
    console.log(routeName)
  },
  showMenu: true
})

setTimeout(() => {
  options.value.menuData[0].children[0].title = '概况1'
}, 2000)
</script>

<template>
  <div style="width: 100%; height: 100%;">
    <BcLayout :options="options">
      <div style="width: 600px; height: 600px; background: #646cff;">
        <button @click="options.showMenu = !options.showMenu">
          click {{ options.showMenu }}
        </button>
      </div>
    </BcLayout>
  </div>
</template>
