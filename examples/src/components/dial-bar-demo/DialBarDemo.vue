<script setup lang="ts">
import { BcDialBar } from 'bdsaas-bc'
import { ref } from 'vue'

defineOptions({
  name: 'DialBarDemo'
})

const dialBar = ref()

const status = ref('NOT_STARTED')

function todoHandler(val: any) {
  console.log('todo的数据：', val)
}

function hangUpHandler() {
  console.log('挂断电话')
}
</script>

<template>
  <div style="padding: 200px;">
    <BcDialBar
      ref="dialBar"
      callType="CALLBACK"
      v-model:status="status"
      :options="{
        phone: 18156224704,
        number: 2,
        todo: 'todo-id-001'
      }"
      @todo="todoHandler"
      @call="status = 'DIALING'"
      @hang-up="hangUpHandler"
    >
      <button>拨打电话{{ status }}</button>
    </BcDialBar>
  </div>
</template>
