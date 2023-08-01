---
Dial Bar Demo
---

# 拨号条

拨号条，集成了完整的交互，包括拨号、拨号后的动画、拨号后的结果展示等，并提供事件。

<script setup lang="ts">
import DialBarDemo from '../components/dial-bar-demo/DialBarDemo.vue'
</script>

## 效果预览

[//]: # '<DialBarDemo/>'

## 示例代码

```vue
<script setup lang="ts">
import { BcDialBar } from 'bdsaas-bc'
import { ref } from 'vue'

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
  </div>
</template>
```

## 属性

| 属性名     | 说明           | 类型                     | 可选值 | 默认值 |
| ---------- | -------------- | ------------------------ | ------ | ------ |
| menuData   | 菜单数据       | Array                    | —      | —      |
| authKeys   | 权限数据       | Array                    | —      | —      |
| beforeJump | 跳转之前的钩子 | (to, from, next) => void | —      | —      |
| jumpMethod | 自定义跳转方法 | (menuItem) => void       | —      | —      |

## 事件

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
|        |      |          |
|        |      |          |
|        |      |          |
|        |      |          |

## 方法

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
|        |      |      |
|        |      |      |
|        |      |      |
|        |      |      |
