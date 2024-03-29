<script setup lang="ts">
import { BcOrgSelectModal, BcOrgSelectModalYkc } from 'bdsaas-bc'
import { ref } from 'vue'

const bcOrgSelectModal = ref()
const bcOrgSelectModalYkc = ref()
const disabled = ref(false)

defineOptions({
  name: 'OrgSelectionDemo'
})

function okHandler({ checkedKeys, checkedNodes }) {
  console.log(checkedKeys, checkedNodes)
}
</script>

<template>
  <button @click="bcOrgSelectModalYkc.toggle(true)">
    打开 BcOrgSelectModalYkc
  </button>
  <br />
  <br />
  <button @click="disabled = !disabled">禁用状态：{{ disabled }}</button>
  <BcOrgSelectModal
    ref="bcOrgSelectModal"
    :defaultCheckedKeys="[383026, 552928, 104180, 556560]"
    @ok="okHandler"
    :disabled="disabled"
  />

  <BcOrgSelectModalYkc
    ref="bcOrgSelectModalYkc"
    :defaultCheckedKeys="[8, 266, 1702, 42987, 1445, 42755]"
    @ok="okHandler"
    :disabled="disabled"
  />
</template>
