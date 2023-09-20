<script setup lang="ts">
import { ref } from 'vue'
import { useBDSaasBC } from '../../utils'

const bcOrgSelectModal = ref()
const disabled = ref(false)

defineOptions({
  name: 'OrgSelectionDemo'
})

function okHandler({ checkedKeys, checkedNodes }) {
  console.log(checkedKeys, checkedNodes)
}

const component = ref()

useBDSaasBC(component, 'BcOrgSelectModal')

console.log(component)
</script>

<template>
  <button @click="bcOrgSelectModal.toggle(true)">打开</button>
  <br />
  <br />
  <button @click="disabled = !disabled">禁用状态：{{ disabled }}</button>
  <component
    :is="component"
    ref="bcOrgSelectModal"
    :defaultCheckedKeys="[383026, 552928, 104180, 556560]"
    :disabled="disabled"
    @ok="okHandler"
  />
</template>
