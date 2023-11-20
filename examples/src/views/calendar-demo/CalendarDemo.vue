<template>
  <div class="content">
    <bc-calendar
      ref="calendar"
      :start-monday="true"
      :indicator="data.indicator"
      :view="data.view"
      :choseDay="data.currentSelectDate"
      @today="clickToday"
      @selected="selected"
      @onchange="calendarChange"
    >
      <template #action>
        <div @click="changeView">{{ viewName }}</div>
      </template>
    </bc-calendar>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { BcCalendar } from 'bdsaas-bc'
const data = reactive({
  view: 'week',
  indicator: {},
  currentSelectDate: new Date(), // 当前选择的时间默认是当前时间
  taskform: {
    // 增加工作任务表单数据
    taskname: '',
    content: '', // 工作内容
    tasktype: 'personal', // 任务类型 个人 协助 指派 私人
    wtLevelCd: 'normal', // 任务等级 普通 重要 紧急 重要且紧急
    uploadList: [], // 附件
    startDate: new Date(), // 开始日期
    startTime: '08:30', // 开始时间
    endDate: new Date(), // 结束日期
    endTime: '18:30', // 结束时间
    repeatType: '0', // 重复类型
    repeatEndDate: '', // 重复结束时间
    taskRemind: '1' // 任务提醒
  },
  level: 'all', // 任务等级
  endDatePickOption: {
    // 结束日期配置
    disabledDate(time) {
      return time.getTime() < Date.now() - 8.64e7
    }
  }
})

const viewName = computed(() => {
  if (data.view === 'week') {
    return '月历模式'
  } else {
    return '星期模式'
  }
})

function clickToday(day) {
  selected(day)
}
function selected(day) {
  data.currentSelectDate = day
  data.taskform.startDate = day
  data.taskform.endDate = day

  data.level = 'all'

  dealWithIndicator(day)
  // 重置结束时间禁用项
  data.endDatePickOption = {
    disabledDate(time) {
      return time.getTime() < day.getTime()
    }
  }
}
function dealWithIndicator(startDate) {
  let indicator = {}
  if (startDate.getMonth() <= 6) {
    indicator.title = startDate.getFullYear() + '上半年'
    indicator.detail = startDate
  } else {
    indicator.title = startDate.getFullYear() + '下半年'
    indicator.detail = startDate
  }
  data.indicator = indicator
}
function calendarChange(value) {
  let tempDate = new Date(value)
  let month = tempDate.getMonth() + 1
  let indicator = {}
  if (month <= 6) {
    indicator.title = value.getFullYear() + '上半年'
  } else {
    indicator.title = value.getFullYear() + '下半年'
  }
  data.indicator = indicator
}
function changeView() {
  if (data.view === 'week') {
    data.view = 'month'
  } else {
    data.view = 'week'
  }
}
</script>
<style lang="less" scoped>
:deep.content {
  padding: 30px;

  .bc-calendar .calendar__header {
    top: 5px !important;
  }
}
</style>
