<template>
  <div style="height: 350px; overflow: hidden; box-shadow: 0 0 8px #eee;">
    <BcSideMenu />
  </div>
</template>

<script setup lang="ts">
import { defineOptions } from 'vue'
import { BcSideMenu } from 'bdsaas-bc'

defineOptions({
  name: 'SideMenuDemo'
})
</script>
