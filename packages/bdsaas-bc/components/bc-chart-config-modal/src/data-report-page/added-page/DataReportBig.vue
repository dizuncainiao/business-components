<template>
  <div class="selected-content-big selected-content">
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

<style scoped lang="less">
.selected-content {
  flex: 1;
  height: 100%;
  padding: 32px 40px 80px;
  overflow-y: auto;
  user-select: none;

  .tips-box {
    line-height: 1;
  }

  .selected-list {
    display: grid;
    grid-template-rows: repeat(1, 80px);
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 12px;
    margin-top: 32px;

    .list-item {
      position: relative;
      display: grid;
      place-items: center;
      height: 80px;
      overflow: hidden;
      border: 1px solid #e1e4e8;
      border-radius: 8px;

      .mask-box {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: rgb(0 0 0 / 60%);
        opacity: 0;
        transition: 0.3s;

        :deep(.action-icon) {
          font-size: 24px;
          color: #fff;
          cursor: pointer;
        }

        .move {
          cursor: move;
        }
      }

      &:hover {
        .mask-box {
          z-index: 2;
          opacity: 1;
        }
      }
    }
  }
}

.gray {
  color: #9ca6b9;
}

/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}
</style>
