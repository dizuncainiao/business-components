<script setup lang="ts">
import { ref } from 'vue'
import { useBDSaasBC } from '../../utils'

const component = ref()

useBDSaasBC(component, 'BcDialBar')

defineOptions({
  name: 'DialBarDemo'
})

const dialBar = ref()
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
</script>

<template>
  <div style="padding: 20px;">
    <button
      class="beautify"
      @click="callType = callType === 'FS' ? 'CALLBACK' : 'FS'"
    >
      当前 {{ callType }} 切换为{{ callType === 'FS' ? 'CALLBACK' : 'FS' }}
    </button>
    <br />
    <button class="beautify" @click="getConfigText">获取 config 数据</button>
    <button class="beautify" @click="reset">重置 config</button>
    <pre v-html="configText"></pre>
    <button class="beautify" @click="status = 'CALLING'">
      通话中{{ status }}
    </button>

    <component
      :is="component"
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
      <button class="beautify">拨打电话{{ status }}</button>
    </component>
  </div>
</template>
