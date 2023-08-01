<script setup lang="ts">
import { BcDialBar } from 'bdsaas-bc'
import { ref } from 'vue'

defineOptions({
  name: 'DialBarDemo'
})

const dialBar = ref()
const dialBar2 = ref()
const callType = ref('FS')
const status = ref('NOT_STARTED')

function todoHandler(val: any) {
  console.log('todo的数据：', val)
}

function hangUpHandler(type: string) {
  console.log('挂断电话：', type)
}

// 拨打电话
function callHandler() {
  console.log('拨打电话')
  status.value = 'DIALING'
}

const configText = ref('')

function getConfigText() {
  configText.value = JSON.stringify(dialBar.value.getConfig(), null, 2)
}

function reset() {
  dialBar.value.resetConfig()
}

function openHandler() {
  dialBar2.value.open()
}
</script>

<template>
  <div style="padding: 200px;">
    <button @click="callType = callType === 'FS' ? 'CALLBACK' : 'FS'">
      当前 {{ callType }} 切换为{{ callType === 'FS' ? 'CALLBACK' : 'FS' }}
    </button>
    <br />
    <button @click="getConfigText">获取 config 数据</button>
    <button @click="reset">重置 config</button>
    <pre v-html="configText"></pre>
    <button @click="status = 'CALLING'">通话中{{ status }}</button>
    <BcDialBar
      ref="dialBar"
      :callType="callType"
      v-model:status="status"
      :options="{
        phone: 18156224704,
        number: 2,
        todo: 'todo-id-001'
      }"
      @todo="todoHandler"
      @call="callHandler"
      @hang-up="hangUpHandler"
    >
      <button>拨打电话{{ status }}</button>
    </BcDialBar>
    <div style="height: 200px;">
      <p>DiaBar 组件测试</p>
      <p>DiaBar 组件测试</p>
      <p>DiaBar 组件测试</p>
      <p>DiaBar 组件测试</p>
      <p>DiaBar 组件测试</p>
      <p>DiaBar 组件测试</p>
    </div>
    <BcDialBar
      ref="dialBar2"
      :callType="callType"
      v-model:status="status"
      :options="{
        phone: 18156224704,
        number: 2,
        todo: 'todo-id-001'
      }"
      @todo="todoHandler"
      @call="callHandler"
      @hang-up="hangUpHandler"
    />
    <button @click="openHandler">手动打开</button>
  </div>
</template>
