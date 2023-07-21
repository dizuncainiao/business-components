---
BI Chart Quick Start
---

# 快速上手

## 使用包管理器

```shell
# pnpm
$ pnpm add bdsaas-bc

# npm
$ npm install bdsaas-bc

# yarn
$ yarn add bdsaas-bc
```

## 引入

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import 'bdsaas-bc/style/index.css'

createApp(App).mount('#app')
```

## Hello World

```vue
<script setup lang="ts">
import { BcSideMenu } from 'bdsaas-bc'
</script>

<template>
  <BcSideMenu />
</template>
```
