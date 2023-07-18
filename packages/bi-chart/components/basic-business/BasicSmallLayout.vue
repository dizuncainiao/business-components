<template>
  <div class="special-small-chart">
    <div class="l-box">
      <h3>
        <slot name="title">{{ $props.title }}</slot>
      </h3>
      <div class="action-or-info">
        <div class="info">
          <slot name="info">{{ today }} | {{ $props.type }}</slot>
        </div>
      </div>
    </div>
    <div class="r-box">
      <div class="value">
        <slot name="value">{{ $props.value }}</slot>
        <span class="unit">
          <slot name="unit">{{ $props.unit }}</slot></span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import { today } from './hooks/date'

export default defineComponent({
  name: 'BasicSmallLayout',
  props: {
    // 单位
    unit: {
      type: String as PropType<string>
    },
    // 数值
    value: {
      type: String as PropType<string | number>
    },
    // 标题
    title: {
      type: String as PropType<string>
    },
    // 图表类型，例如：我的、部门……
    type: {
      type: String as PropType<string>
    }
  },
  setup() {
    const state = reactive({
      title: '活跃坐席数',
      hasRecharge: false,
      infoValue: '2022-02-01',
      infoType: '团队',
      unit: '人',
      value: 1
    })

    return {
      state,
      today
    }
  }
})
</script>
