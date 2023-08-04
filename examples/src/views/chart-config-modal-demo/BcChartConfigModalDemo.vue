<script setup lang="ts">
import { BcChartConfigModal } from 'bdsaas-bc'
import { ref } from 'vue'

const modal = ref()
function save(val: any) {
  console.log(val)
  modal.value.toggle(false)
}

const data = {
  auth: 'THING',
  authName: '事儿电话',
  parentAuth: 'MARKETING',
  parentAuthName: '营销中心',
  routeName: null,
  icon: 'phone-call',
  formList: [
    {
      id: 98,
      menuLimit: 'THING',
      reportFormName: '事儿-话费余额',
      url: 'TelephoneBalance',
      type: 1,
      formType: 1,
      formProperty: 2,
      description: ' ',
      scope: 0
    },
    {
      id: 99,
      menuLimit: 'THING',
      reportFormName: '事儿-号码数',
      url: 'PhoneNumbers',
      type: 1,
      formType: 1,
      formProperty: 1,
      description: ' ',
      scope: 0
    },
    {
      id: 100,
      menuLimit: 'THING',
      reportFormName: '事儿-当月消耗',
      url: 'CurrentMonthConsume',
      type: 1,
      formType: 1,
      formProperty: 2,
      description: ' ',
      scope: 0
    },
    {
      id: 101,
      menuLimit: 'THING',
      reportFormName: '事儿-外呼总次数',
      url: 'SmallTotalOutboundCalls',
      type: 1,
      formType: 1,
      formProperty: 1,
      description: '公司外呼数量的总计',
      scope: 0
    },
    {
      id: 102,
      menuLimit: 'THING',
      reportFormName: '事儿-外呼接通次数',
      url: 'SmallNumberOfOutboundCallConnections',
      type: 1,
      formType: 1,
      formProperty: 1,
      description: '已接通状态的数量总计',
      scope: 0
    },
    {
      id: 103,
      menuLimit: 'THING',
      reportFormName: '事儿-外呼接通率',
      url: 'SmallOutgoingCallCompletionRate',
      type: 1,
      formType: 1,
      formProperty: 2,
      description: '已接通状态在全部外呼状态的占比',
      scope: 0
    },
    {
      id: 104,
      menuLimit: 'THING',
      reportFormName: '事儿-平均通话时长',
      url: 'SmallAverageCallDuration',
      type: 1,
      formType: 1,
      formProperty: 1,
      description: '通话平均时长',
      scope: 0
    },
    {
      id: 105,
      menuLimit: 'THING',
      reportFormName: '事儿-投诉总数',
      url: 'SmallTotalNumberOfComplaints',
      type: 1,
      formType: 1,
      formProperty: 1,
      description: '我的团队中，被投诉的总数',
      scope: 0
    },
    {
      id: 106,
      menuLimit: 'THING',
      reportFormName: '事儿-通话时长',
      url: 'SmallTalkTime',
      type: 1,
      formType: 1,
      formProperty: 2,
      description: '我的团队，通话总时长',
      scope: 0
    },
    {
      id: 107,
      menuLimit: 'THING',
      reportFormName: '事儿-扣费金额',
      url: 'SmallDeductionAmount',
      type: 1,
      formType: 1,
      formProperty: 1,
      description: '我的团队，扣费金额总金额',
      scope: 0
    },
    {
      id: 108,
      menuLimit: 'THING',
      reportFormName: '事儿-活跃人员',
      url: 'SmallActivePersonnel',
      type: 1,
      formType: 1,
      formProperty: 1,
      description: '我的团队，使用了事儿电话进行外呼的人员',
      scope: 0
    },
    {
      id: 109,
      menuLimit: 'THING',
      reportFormName: '事儿-实名认证人数',
      url: 'SmallNumberOfRealNameAuthPersonnel',
      type: 1,
      formType: 1,
      formProperty: 1,
      description: '我的团队，实名认证的人员',
      scope: 0
    },
    {
      id: 110,
      menuLimit: 'THING',
      reportFormName: '事儿-异常跨域人员统计',
      url: 'SmallAbnormalCrossDomainPersonnelStatistics',
      type: 1,
      formType: 1,
      formProperty: 1,
      description: '我的团队，异常跨域人数统计',
      scope: 0
    },
    {
      id: 111,
      menuLimit: 'THING',
      reportFormName: '事儿-外呼次数排行榜',
      url: 'ThingsOutboundNumberRanking',
      type: 2,
      formType: 1,
      formProperty: 1,
      description: ' ',
      scope: 0
    },
    {
      id: 112,
      menuLimit: 'THING',
      reportFormName: '事儿-外呼接通率排行榜',
      url: 'ThingsOutboundConnectionRateRanking',
      type: 2,
      formType: 1,
      formProperty: 2,
      description: ' ',
      scope: 0
    },
    {
      id: 113,
      menuLimit: 'THING',
      reportFormName: '事儿-外呼接通次数排行榜',
      url: 'ThingsOutboundConnectionNumberRanking',
      type: 2,
      formType: 1,
      formProperty: 2,
      description: ' ',
      scope: 0
    }
  ]
}
const config = [
  {
    id: 111,
    menuLimit: 'THING',
    reportFormName: '事儿-外呼次数排行榜',
    url: 'ThingsOutboundNumberRanking',
    type: 2,
    formType: 1,
    formProperty: 1,
    formSort: 1
  },
  {
    id: 112,
    menuLimit: 'THING',
    reportFormName: '事儿-外呼接通率排行榜',
    url: 'ThingsOutboundConnectionRateRanking',
    type: 2,
    formType: 1,
    formProperty: 2,
    formSort: 3
  },
  {
    id: 98,
    menuLimit: 'THING',
    reportFormName: '事儿-话费余额',
    url: 'TelephoneBalance',
    type: 1,
    formType: 1,
    formProperty: 2,
    description: ' ',
    scope: 0
  },
  {
    id: 99,
    menuLimit: 'THING',
    reportFormName: '事儿-号码数',
    url: 'PhoneNumbers',
    type: 1,
    formType: 1,
    formProperty: 1,
    description: ' ',
    scope: 0
  },
  {
    id: 100,
    menuLimit: 'THING',
    reportFormName: '事儿-当月消耗',
    url: 'CurrentMonthConsume',
    type: 1,
    formType: 1,
    formProperty: 2,
    description: ' ',
    scope: 0
  }
]
</script>

<template>
  <bn-button type="primary" @click="modal.toggle(true)">打开配置框</bn-button>
  <BcChartConfigModal
    ref="modal"
    :menuSourceData="data"
    :menuConfig="config"
    @configured="save"
  />
</template>
