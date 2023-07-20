<template>
  <div class="bc-side-menu">
    <template v-for="item of menuData" :key="item.groupName">
      <dl v-if="item.showGroup">
        <dt>{{ item.groupName }}</dt>
        <template v-for="child of item.children" :key="child.title">
          <dd v-if="child.showItem" :class="child.title === '概况' && 'active'">
            <span class="menu-icon" :class="child.icon">
              <span class="path1"></span>
              <span class="path2"></span>
            </span>
            <span class="title">{{ child.title }}</span>
          </dd>
        </template>
      </dl>
    </template>
  </div>
</template>

<script lang="ts">
import '../style/index.less'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BcSideMenu',
  setup() {
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
            authKeys: []
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
            authKeys: []
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

    return {
      menuData
    }
  }
})
</script>
