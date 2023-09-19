---
Layout Demo
---

# 组织架构树选择框

集成了现成的接口数据，直接用

<script setup lang="ts">
import OrgSelectModal from '../components/org-select-modal-demo/OrgSelectModal.vue'
</script>

## 效果预览

<OrgSelectModal/>

## 示例代码

```vue
<script setup lang="ts">
import { BcOrgSelectModal } from 'bdsaas-bc'
import { ref } from 'vue'

const bcOrgSelectModal = ref()
const disabled = ref(false)

defineOptions({
  name: 'OrgSelectionDemo'
})

function okHandler({ checkedKeys, checkedNodes }) {
  console.log(checkedKeys, checkedNodes)
}
</script>

<template>
  <button @click="bcOrgSelectModal.toggle(true)">打开</button>
  <br />
  <br />
  <button @click="disabled = !disabled">禁用状态：{{ disabled }}</button>
  <BcOrgSelectModal
    ref="bcOrgSelectModal"
    :defaultCheckedKeys="[383026, 552928, 104180, 556560]"
    @ok="okHandler"
    :disabled="disabled"
  />
</template>
```
