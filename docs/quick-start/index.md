---
BI Chart Quick Start
---

# 快速上手

## 使用包管理器

```shell
# pnpm
$ pnpm add dz-bi-chart

# npm
$ npm install dz-bi-chart

# yarn
$ yarn add dz-bi-chart
```

## 引入

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import 'dz-bi-chart/style/index.css'

createApp(App).mount('#app')
```

## hello world

```vue
<script setup lang="ts">
import { BasicSmallLayout } from 'dz-bi-chart'
</script>

<template>
  <BasicSmallLayout
    style="box-shadow: 0 0 8px #eee;"
    title="今日外呼任务数"
    value="800"
    unit="次"
    type="我的"
  />
</template>
```
