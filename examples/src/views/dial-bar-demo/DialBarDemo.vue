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

function beforeOpen() {
  console.log('beforeOpen')
}

function todoHandler(val: any) {
  console.log('todo的数据：', val)
}

function hangUpHandler(type: string) {
  console.log(dialBar.value.getConfig(), 'configText.value')
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
    <bn-button @click="callType = callType === 'FS' ? 'CALLBACK' : 'FS'">
      当前 {{ callType }} 切换为{{ callType === 'FS' ? 'CALLBACK' : 'FS' }}
    </bn-button>
    <br />
    <bn-button @click="getConfigText">获取 config 数据</bn-button>
    <bn-button @click="reset">重置 config</bn-button>
    <pre v-html="configText"></pre>
    <bn-button @click="status = 'CALLING'">通话中{{ status }}</bn-button>
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
      @before-open="beforeOpen"
    >
      <bn-button>拨打电话{{ status }}</bn-button>
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
      showTodo
      @todo="todoHandler"
      @call="callHandler"
      @hang-up="hangUpHandler"
    />
    <bn-button @click="openHandler">手动打开</bn-button>
  </div>
</template>
