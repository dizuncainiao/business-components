<script setup lang="ts">
import { BcLayout } from 'bdsaas-bc'
import type { MenuItem } from 'bdsaas-bc/components/bc-side-menu/src/types.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { menuData } from '@/utils/menu.ts'

defineOptions({
  name: 'App'
})
const router = useRouter()
const options = ref({
  menuData,
  beforeJump: (to: any, from: any, next: any) => {
    // console.log('to: ', to, 'from: ', from, 'next: ', next)
    // todo 异步延迟跳转到指定路由
    // setTimeout(() => next({name: 'TableUtilDemo'}), 2000)
    // todo 取消跳转
    // next(false)
    // todo 执行跳转
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
