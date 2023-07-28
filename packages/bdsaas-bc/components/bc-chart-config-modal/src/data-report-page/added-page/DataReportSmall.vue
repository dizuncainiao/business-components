<template>
  <div class="selected-content-small selected-content">
    <div class="tips-box">
      <div>
        已添加
        <span class="gray">（{{ state.selectedList.length }}）</span>
      </div>

      <span>最多可添加6条小报表，数量为3的倍数</span>
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
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
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
    smallSelectedList: any
    onSelected: (type: 'small' | 'big', data: any) => void
  }>(),
  {
    smallSelectedList: []
  }
)

const state = reactive({
  selectedList: []
})

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
    console.log(val, 'line 45 45 45 45 45 small small small small small')
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
</script>

<script lang="ts">
export default {
  name: 'DataReportSmall'
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1;
  }

  .selected-list {
    display: grid;
    grid-template-rows: repeat(1, 80px);
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 12px;
    height: 272px;
    margin-top: 32px;
    overflow: hidden;

    .list-item {
      position: relative;
      display: grid;
      place-items: center;
      height: 80px;
      overflow: hidden;
      border: 1px solid #e1e4e8;
      border-radius: 8px;

      &:hover {
        .mask-box {
          z-index: 2;
          opacity: 1;
        }
      }

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
    }

    .empty-list-item {
      border: 1px dashed #e1e4e8;
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
