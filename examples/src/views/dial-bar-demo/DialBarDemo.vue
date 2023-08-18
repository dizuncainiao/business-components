<script setup lang="ts">
import { Table as BnTable } from 'blocks-next'
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

const columns = ref([
  {
    prop: 'projectTeamName',
    title: '项目组名称'
  },
  {
    prop: 'projectTeamMemberNames',
    title: '项目组成员'
  },
  {
    prop: 'updateByName',
    title: '修改人',
    slotName: 'updateByName',
    width: 200
  },
  {
    prop: 'createdTimeStr',
    title: '修改时间'
  },
  {
    prop: 'enable',
    title: '启用'
  },
  {
    slotName: 'handle',
    title: '操作',
    fixed: 'right'
  }
])

// 根据 columns 生成 10 条数据
const tableData = ref(
  Array(10)
    .fill(0)
    .map((_, index) => ({
      projectTeamName: `项目组名称${index}`,
      projectTeamMemberNames: `项目组成员${index}`,
      updateByName: `修改人${index}`,
      createdTimeStr: `修改时间${index}`,
      enable: `启用${index}`,
      handle: `操作${index}`
    }))
)
</script>

<template>
  <div style="padding: 20px;">
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

  <hr />

  <bn-table class="dial-bar-table" :columns="columns" :data="tableData">
    <template #updateByName="{ row }">
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
        <button class="beautify">{{ row.updateByName }}--{{ status }}</button>
      </BcDialBar>
    </template>
  </bn-table>
</template>

<style lang="less">
.dial-bar-table {
  .bn-tbody {
    tr {
      .bn-td:nth-child(3) {
        // 设置溢出隐藏局限性太大，重置为默认不影响基础功能
        overflow: initial !important;

        // td 是支持放块级元素的，给个行内很奇怪，将它改为块级（行内元素只能放行内元素，而块级元素即支持放块级，也支持放行内元素）
        .bn-table__cell {
          display: block !important;
        }
      }
    }
  }
}
</style>
