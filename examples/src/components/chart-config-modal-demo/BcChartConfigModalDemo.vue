<script setup lang="ts">
import { BcChartConfigModal } from 'bdsaas-bc'
function save(val: any) {
  console.log(val)
}
</script>

<template>
  <BcChartConfigModal @configured="save" />
</template>
