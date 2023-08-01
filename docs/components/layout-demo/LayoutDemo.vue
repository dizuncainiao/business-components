<script setup lang="ts">
import { ref } from 'vue'
import { useBDSaasBC } from '../../utils'

const component = ref()

useBDSaasBC(component, 'BcLayout')

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
      },
      {
        icon: 'icon-things-icon-2',
        title: 'TestOne',
        routeName: 'TestOne',
        showItem: true,
        authKeys: []
      },
      {
        icon: 'icon-things-icon-2',
        title: 'TestTwo',
        routeName: 'TestTwo',
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
  showMenu: true
})
</script>

<template>
  <div style="width: 100%; height: 100%;">
    <component :is="component" :options="options">
      <div style="height: 600px; background: #646cff;">
        内容区
        <br />
        <button class="beautify" @click="options.showMenu = !options.showMenu">
          showMenu: {{ options.showMenu }}
        </button>
      </div>
    </component>
  </div>
</template>
