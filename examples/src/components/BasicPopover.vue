<script setup lang="ts">
defineOptions({
  name: 'BasicPopover'
})
</script>

<template>
  <el-popover placement="bottom-start" trigger="click" :show-arrow="false">
    <template #reference>
      <el-button class="m-2">Click to activate</el-button>
    </template>
    <template #default> </template>
  </el-popover>
</template>
