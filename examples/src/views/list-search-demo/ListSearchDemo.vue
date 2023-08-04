<template>
  <div style="padding: 20px; background: #f5f5f5;">
    <BcListSearch ref="BcListSearchDemo" :options="searchOptions" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { BcListSearch } from 'bdsaas-bc'

defineOptions({
  name: 'BcListSearchDemo'
})

const searchOptions = [
  {
    key: 'searchKey', // 检索项的参数key
    name: '检索项名称', // 检索项名称
    values: [
      {
        label: '检索项值1', // 页面显示的参数名称
        value: 'searchValueKey1' // 传递给接口的参数值
      },
      {
        label: '检索项值2',
        value: 'searchValueKey2'
      }
    ] // 检索项参数值数组
  },
  {
    key: 'searchKey2', // 检索项的参数key
    name: '检索项名称2', // 检索项名称
    values: [
      {
        label: '检索项值1', // 页面显示的参数名称
        value: 'searchValueKey3' // 传递给接口的参数值
      },
      {
        label: '检索项值2',
        value: 'searchValueKey4'
      }
    ] // 检索项参数值数组
  }
]
</script>
