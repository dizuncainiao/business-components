<template>
  <div class="data-report-selected-content-big data-report-selected-content">
    <div class="tips-box">
      已添加
      <span class="gray">（{{ state.selectedList.length }}）</span>
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
    </VueDraggableNext>
  </div>
</template>

<script lang="ts">
import { ElIcon } from 'element-plus'
import { Delete, Sort } from '@element-plus/icons-vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { reactive, toRaw, watch, defineComponent } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'DataReportBig',
  components: { ElIcon, Delete, Sort, VueDraggableNext },
  props: {
    bigSelectedList: {
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

    watch(
      () => props.bigSelectedList,
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
        props.onSelected('big', cloneDeep(toRaw(val)))
      },
      {
        deep: true,
        immediate: true
      }
    )

    function cancelActive(item: any) {
      item.active = false
    }

    function draggableChange(val: any) {
      console.log(val)
    }

    return {
      state,
      cancelActive,
      draggableChange
    }
  }
})
</script>
