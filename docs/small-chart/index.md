---
BI Chart Small Chart Demo
---

# 小报表

<script setup lang="ts">
import { BasicSmallLayout } from 'dz-bi-chart';
</script>

<style>
.special-small-chart .l-box h3 { margin-top: 0; }
</style>

## 预览

<BasicSmallLayout
style="box-shadow: 0 0 8px #eee;"
title="今日外呼任务数"
value="800"
unit="次"
type="我的"
/>

## 示例

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
