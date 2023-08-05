---
Layout Demo
---

# 子应用布局容器

微服务子应用通用的主体布局容器，包含侧边栏、内容区域。

<script setup lang="ts">
import LayoutDemo from '../components/layout-demo/LayoutDemo.vue'
</script>

## 效果预览

[//]: # '<LayoutDemo/>'

## 示例代码

```vue
<script setup lang="ts">
import { BcLayout } from 'bdsaas-bc'
import { ref } from 'vue'

defineOptions({
  name: 'LayoutDemo'
})

const menuData = []
const options = ref({
  menuData,
  showMenu: true
})
</script>

<template>
  <div style="width: 100%; height: 100%">
    <BcLayout :options="options">
      <div style="width: 600px; height: 600px; background: #646cff">
        内容区
        <br />
        <button @click="options.showMenu = !options.showMenu">
          showMenu: {{ options.showMenu }}
        </button>
      </div>
    </BcLayout>
  </div>
</template>
```

## Props

| 属性名     | 说明             | 类型                     | 可选值 | 默认值 |
| ---------- | ---------------- | ------------------------ | ------ | ------ |
| menuData   | 菜单数据         | Array                    | —      | —      |
| authKeys   | 权限数据         | Array                    | —      | —      |
| beforeJump | 跳转之前的钩子   | (to, from, next) => void | —      | —      |
| jumpMethod | 自定义跳转方法   | (menuItem) => void       | —      | —      |
| showMenu   | 是否显示左侧菜单 | Boolean                  | —      | —      |
