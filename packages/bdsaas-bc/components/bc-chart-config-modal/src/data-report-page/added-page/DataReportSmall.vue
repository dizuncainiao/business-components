<template>
  <div class="data-report-selected-content-small data-report-selected-content">
    <div class="tips-box">
      <div>
        已添加
        <span class="gray">（{{ state.selectedList.length }}）</span>
      </div>

      <span
        >最多可添加{{ configModalProps.smallChartMax }}条小报表，数量为{{
          configModalProps.integerMultiple
        }}的倍数</span
      >
    </div>
    <VueDraggableNext
      class="selected-list"
      :list="state.selectedList"
      handle=".move"
      @change="draggableChange"
    >
      <transition-group name="fade">
        <div v-for="item of state.selectedList" :key="item" class="list-item">
          {{ item.title }}
          <div class="mask-box">
            <el-icon class="action-icon" @click="cancelActive(item)"
              ><Delete
            /></el-icon>
            <el-icon class="action-icon move"><Sort /></el-icon>
          </div>
        </div>
      </transition-group>
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
    </VueDraggableNext>
  </div>
</template>

<script lang="ts">
import { ElIcon } from 'element-plus'
import { Delete, Sort } from '@element-plus/icons-vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { cloneDeep } from 'lodash-es'
import { reactive, toRaw, watch, defineComponent, inject } from 'vue'
import type { PropType, ComputedRef } from 'vue'

export default defineComponent({
  name: 'DataReportSmall',
  components: { ElIcon, Delete, Sort, VueDraggableNext },
  props: {
    smallSelectedList: {
      type: Array,
      default: () => []
    },
    onSelected: {
      type: Function as PropType<(type: 'small' | 'big', data: any) => void>,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      selectedList: []
    })

    const configModalProps = inject('configModalProps') as ComputedRef

    watch(
      () => props.smallSelectedList,
      val => {
        state.selectedList = val
      },
      {
        deep: true,
        immediate: true
      }
    )

    watch(
      () => state.selectedList,
      val => {
        props.onSelected('small', cloneDeep(toRaw(val)))
      },
      {
        deep: true,
        immediate: true
      }
    )

    function draggableChange(val: any) {
      console.log(val, 'line 57 57 57 57')
    }

    function cancelActive(item: any) {
      item.active = false
    }

    return {
      state,
      draggableChange,
      cancelActive,
      configModalProps
    }
  }
})
</script>
