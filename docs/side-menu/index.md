---
Small Chart Demo
---

# 子应用导航菜单

微服务子应用通用的左侧导航菜单，可以自定义跳转方法，也可以自定义跳转前的钩子函数。

<script setup lang="ts">
import SideMenuDemo from '../components/side-menu/SideMenuDemo.vue'
</script>

## 效果预览

<SideMenuDemo/>

## 示例代码

```vue
<template>
  <div style="height: 350px; overflow: hidden; box-shadow: 0 0 8px #eee;">
    <BcSideMenu
      :menuData="menuData"
      :jumpMethod="jumpMethod"
      :beforeJump="beforeJump"
    />
  </div>
</template>

<script setup lang="ts">
import { BcSideMenu } from 'bdsaas-bc'
import { BnIconSearch } from 'blocks-next'

defineOptions({
  name: 'SideMenuDemo'
})

const menuData = [
  {
    groupName: '概况', // 组名称
    showGroup: true, // 是否显示组
    children: [
      {
        icon: h(BnIconSearch), // blocks-next Icon 图标名称（暂时只接收 VNode）
        title: '概况', // 菜单子项名称
        routeName: 'OverviewBi', // 跳转页面的 routeName
        showItem: true, // 是否显示组下面的菜单子项
        authKeys: ['a', 'b'], // 控制菜单展示的权限 key
        notice: true // boolean | number，true 则显示红点，数值则显示红点数字。默认值：false
      }
    ]
  },
  {
    groupName: '工作台',
    showGroup: true,
    children: [
      {
        icon: h(BnIconSearch),
        title: '通话记录',
        routeName: 'CallRecord',
        showItem: true,
        authKeys: [],
        notice: true
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
```

## Props

| 属性名     | 说明           | 类型                      | 可选值 | 默认值 |
| ---------- | -------------- | ------------------------- | ------ | ------ |
| menuData   | 菜单数据       | [GroupItem](#groupitem)[] | —      | —      |
| authKeys   | 权限数据       | `string`[]                | —      | —      |
| beforeJump | 跳转之前的钩子 | (to, from, next) => void  | —      | —      |
| jumpMethod | 自定义跳转方法 | (menuItem) => void        | —      | —      |

### GroupItem

| 属性名    | 说明             | 类型                    | 可选值 | 默认值 |
| --------- | ---------------- | ----------------------- | ------ | ------ |
| groupName | 组名称           | `string`                | —      | —      |
| showGroup | 是否显示组       | `boolean`               | —      | —      |
| children  | 组下的菜单项集合 | [MenuItem](#menuitem)[] | —      | —      |

### MenuItem

| 属性名    | 说明                                     | 类型                       | 可选值 | 默认值 |
| --------- | ---------------------------------------- | -------------------------- | ------ | ------ |
| icon      | blocks-next Icon 组件                    | `VNode`꒐`DefineComponent` | —      | —      |
| title     | 菜单子项名称                             | `boolean`                  | —      | —      |
| routeName | 跳转页面的 routeName                     | `string`                   | —      | —      |
| showItem  | 是否显示组下面的菜单子项                 | `boolean`                  | —      | —      |
| authKeys  | 控制菜单展示的权限 key                   | `string`[]                 | —      | —      |
| notice    | 布尔值：是否显示红点，数值：显示红点数字 | `boolean`꒐`number`        | —      | —      |
