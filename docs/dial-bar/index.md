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
function closeHandler() {
  dialBar2.value.close()
}
</script>

<template>
  <div style="padding: 200px;">
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
      <button class="beautify">拨打电话{{ status }}</button>
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
    <button class="beautify" @click="openHandler">手动打开</button>
    <button class="beautify" @click="closeHandler">手动关闭</button>
  </div>
</template>
```

## Props

| 属性名   | 说明         | 类型                | 可选值                                  | 默认值        |
| -------- | ------------ | ------------------- | --------------------------------------- | ------------- |
| options  | 菜单数据     | [Options](#options) | —                                       | —             |
| status   | 打电话状态   | `string`            | 'NOT_STARTED' \| 'DIALING' \| 'CALLING' | 'NOT_STARTED' |
| callType | 拨号类型     | `string`            | 'CALLBACK' \| 'FS'                      | —             |
| showTodo | 显示待办功能 | `boolean`           | —                                       | `false`       |

### Options

| 属性名 | 说明                   | 类型                              | 可选值 | 默认值 |
| ------ | ---------------------- | --------------------------------- | ------ | ------ |
| phone  | 电话号码               | `string` <font>꒐</font> `number` | —      | —      |
| number | 拨打次数               | `number`                          | —      | —      |
| todo   | 点击进行代办操作的数据 | `any`                             | —      | —      |

## 事件

| 事件名      | 说明             | 回调参数       |
| ----------- | ---------------- | -------------- |
| todo        | 点击待办触发     | options.todo   |
| call        | 点击拨打触发     | —              |
| hang-up     | 点击挂断触发     | props.callType |
| beforeOpen  | 拨号条打开前触发 | —              |
| beforeClose | 拨号条关闭前触发 | —              |

## 方法

| 方法名      | 说明                                                   | 参数                          |
| ----------- | ------------------------------------------------------ | ----------------------------- |
| open        | 打开拨号条                                             | —                             |
| close       | 关闭拨号条                                             | —                             |
| getConfig   | 获取当前打电话的配置数据                               | [statusConfig](#statusconfig) |
| resetConfig | 重置打电话的配置数据为初始值（进行下一通电话时很有用） | —                             |

### statusConfig

```typescript
const initStatusConfig = [
  {
    label: '拨打中', // 打电话状态，拨号条上显示的文字
    status: 'DIALING', // 打电话状态，用于业务方操作逻辑
    startTime: 0, // 状态开始时间（时间戳）
    endTime: 0 // 状态结束时间（时间戳）
  },
  { label: '通话中', status: 'CALLING', startTime: 0, endTime: 0 }
]
```
