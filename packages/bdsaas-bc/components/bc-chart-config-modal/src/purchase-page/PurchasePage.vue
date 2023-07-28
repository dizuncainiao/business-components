<template>
  <div class="purchase-page-wrapper">
    <aside class="purchase-page-left-aside">
      <ol class="purchase-page-list">
        <li
          v-for="(item, index) of state.menus"
          :key="index"
          :class="item.active && 'active'"
          @click="selectHandler(item)"
        >
          {{ ++index }}. {{ item.title }}
        </li>
      </ol>
    </aside>
    <div class="selected-content">
      <div class="tips-box">
        已添加 <span class="gray">（{{ state.selectedList.length }}）</span>
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
              <b-icon
                name="delete"
                class="delete"
                :style="{ fontSize: '24px' }"
                style="margin-right: 16px;"
                @click="cancelActive(item)"
              ></b-icon>
              <b-icon
                name="move"
                class="move"
                :style="{ fontSize: '24px' }"
              ></b-icon>
            </div>
          </div>
        </transition-group>
      </VueDraggableNext>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'

const state = reactive({
  menus: [
    {
      title: '话费余额',
      active: false
    },
    {
      title: '当月消费',
      active: false
    },
    {
      title: '码号数量',
      active: false
    }
  ],
  selectedList: []
})

function selectHandler(item: any) {
  item.active = true
}

function draggableChange(val: any) {
  console.log(val)
}

function cancelActive(info: any) {
  const index = state.menus.findIndex(item => info.title === item.title)
  state.menus[index].active = false
}

watch(
  () => state.menus,
  val => {
    state.selectedList = val.filter(item => item.active)
  },
  {
    deep: true
  }
)
</script>

<script lang="ts">
export default {
  name: 'PurchasePage'
}
</script>

<style scoped lang="less">
.purchase-page-wrapper {
  display: flex;
  height: 671px;
}

.purchase-page-left-aside {
  width: 280px;
  height: 100%;
  overflow-y: auto;
  background: rgb(245 247 251 / 60%);

  .purchase-page-list {
    padding: 0 40px 0 48px;
    margin-top: 15px;
    overflow-y: auto;
    line-height: 1;
    user-select: none;

    > li {
      display: flex;
      align-items: center;
      height: 28px;
      padding-left: 16px;
      font-size: 14px;
      font-weight: 400;
      color: #9ca6b9;
      cursor: pointer;

      &:hover,
      &.active {
        color: #004de5;
      }
    }
  }
}

.selected-content {
  flex: 1;
  height: 100%;
  padding: 32px 40px 80px;
  overflow-y: auto;

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

        :deep(.b-icon) {
          font-size: 22px;
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
