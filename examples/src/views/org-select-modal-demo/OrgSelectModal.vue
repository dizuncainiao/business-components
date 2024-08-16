<script setup lang="ts">
import { BcOrgSelectModal, BcOrgSelectModalYkc } from 'bdsaas-bc'
import { ref } from 'vue'

const bcOrgSelectModal = ref()
const bcOrgSelectModalYkc = ref()
const disabled = ref(false)

defineOptions({
  name: 'OrgSelectionDemo'
})

function okHandler({ checkedNodes }) {
  console.log(checkedNodes)
}

const profileIds = ref([
  3342, 42918, 43208, 2764, 1366, 3322, 2787, 42987, 42310, 42525, 3381, 3316,
  3314, 3431, 3382, 3214, 3260, 3319, 2788, 3275, 3049, 3261, 3256, 3254, 3243,
  3238, 3001, 2791, 3007, 3094, 266, 2799, 2792, 2786, 43, 2790, 3008, 2800,
  2797, 2798, 1720, 1723, 2782, 2783, 1537, 35, 2766, 1462, 1712, 1448, 31, 30,
  155, 264, 1666, 1408, 1402, 1659, 1660, 1661, 1401, 1400, 1499, 88, 1496,
  1495, 55, 1515, 2, 2762, 2756, 2757, 2758, 2759, 2760, 2761, 138, 2763, 275,
  8, 9, 6, 28, 14, 268, 3, 98
])
</script>

<template>
  <button @click="bcOrgSelectModal.toggle(true)">打开 BcOrgSelectModal</button>
  <br />
  <br />
  <button @click="bcOrgSelectModalYkc.toggle(true)">
    打开 BcOrgSelectModalYkc
  </button>
  <br />
  <br />
  <button @click="disabled = !disabled">禁用状态：{{ disabled }}</button>
  <BcOrgSelectModal
    ref="bcOrgSelectModal"
    mode="personnel"
    @ok="okHandler"
    :default-checked-keys="profileIds"
    :single="false"
  />

  <BcOrgSelectModalYkc
    ref="bcOrgSelectModalYkc"
    @ok="okHandler"
    :disabled="disabled"
    title="添加坐席"
  />
</template>
