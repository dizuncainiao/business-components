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
            <!--            <b-icon-->
            <!--              name="delete"-->
            <!--              class="delete"-->
            <!--              :style="{ fontSize: '24px' }"-->
            <!--              style="margin-right: 16px"-->
            <!--              @click="cancelActive(item)"-->
            <!--            ></b-icon>-->
            <el-icon class="action-icon move"><Sort /></el-icon>
            <!--            <b-icon-->
            <!--              name="move"-->
            <!--              class="move"-->
            <!--              :style="{ fontSize: '24px' }"-->
            <!--            ></b-icon>-->
          </div>
        </div>
      </transition-group>
    </VueDraggableNext>
  </div>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { Delete, Sort } from '@element-plus/icons-vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { reactive, toRaw, watch } from 'vue'
import { cloneDeep } from 'lodash-es'

const props = withDefaults(
  defineProps<{
    bigSelectedList: any
    onSelected: (type: 'small' | 'big', data: any) => void
  }>(),
  {
    bigSelectedList: []
  }
)

const state = reactive({
  selectedList: []
})

watch(
  () => props.bigSelectedList,
  val => {
    state.selectedList = val
    console.log(val, 'bigSelectedList bigSelectedList bigSelectedList')
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
    console.log(val, 'line 45 45 45 45 45 big big big big')
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
</script>

<script lang="ts">
export default {
  name: 'DataReportBig'
}
</script>
