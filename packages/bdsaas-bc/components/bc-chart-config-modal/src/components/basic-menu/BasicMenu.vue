<template>
  <div class="basic-menu">
    <div v-for="item of props.menuData" :key="item.title" class="menu-item">
      <h3 class="title" @click="item.open = !item.open">
        {{ item.title }}
        <el-icon v-if="item?.children?.length">
          <ArrowDown />
        </el-icon>
      </h3>
      <CollapseTransition>
        <ul v-if="item?.children?.length && item.open" class="children">
          <li
            v-for="childItem of item?.children"
            :key="childItem.title"
            :class="[
              'children-item',
              childItem?.children?.length && 'has-dot',
              childItem.open && 'active'
            ]"
            @mouseenter="hoverOpenHandler(childItem, true)"
            @mouseleave="hoverOpenHandler(childItem, false)"
          >
            <h4
              class="children-item-title"
              @click="clickOpenHandler(childItem)"
            >
              {{ childItem.title }}
            </h4>
            <CollapseTransition>
              <ol
                v-if="childItem?.children?.length && childItem.open"
                class="item-ol"
              >
                <li
                  v-for="(subItem, index) of childItem?.children"
                  :key="subItem.title"
                  :class="subItem.active && 'active'"
                  @click="selectHandler(subItem)"
                >
                  <span style="width: 125px;">
                    {{ `${index + 1}.${subItem.title}` }}
                  </span>
                  <el-tooltip
                    v-if="subItem.desc"
                    :content="subItem.desc"
                    placement="bottom"
                    effect="light"
                  >
                    <el-icon class="tips-question">
                      <QuestionFilled />
                    </el-icon>
                  </el-tooltip>
                </li>
              </ol>
            </CollapseTransition>
          </li>
        </ul>
      </CollapseTransition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElIcon, ElTooltip } from 'element-plus'
import { ArrowDown, QuestionFilled } from '@element-plus/icons-vue'
import CollapseTransition from '../collapse-transition/CollapseTransition.vue'
import { computed, unref } from 'vue'
import { groupBy } from './hooks'
import type { ChildItem, Props, SubItem } from './types'

const props = withDefaults(defineProps<Props>(), {
  trigger: 'hover'
})

const emit = defineEmits<{
  (e: 'change', data: any): void
}>()

// 包含 active 属性（最底级的数据项）的扁平化数组
const activeList = computed(() => groupBy(props.menuData, 'desc'))

function clickOpenHandler(childItem: ChildItem) {
  if (props.trigger === 'click') {
    childItem.open = !childItem.open
  }
}

function hoverOpenHandler(childItem: ChildItem, val: boolean) {
  if (props.trigger === 'hover') {
    childItem.open = val as boolean
  }
}

function selectHandler(subItem: SubItem) {
  emit('change', {
    menuData: props.menuData,
    item: subItem,
    active: !subItem.active
  })
}

// 获取选中的项，输出一个扁平化的数组
function getSelectedItems() {
  return unref(activeList).filter((item: any) => item.active)
}

defineExpose({
  getSelectedItems
})
</script>

<script lang="ts">
export default {
  name: 'BasicMenu'
}
</script>

<style scoped lang="less">
// 滚动条
::-webkit-scrollbar {
  width: 2px;
  height: 8px;
}

// 滚动条头
::-webkit-scrollbar-thumb {
  background-color: rgb(184 198 211 / 20%);
  border-radius: 1em;
}

// 滚动条轨道
::-webkit-scrollbar-track {
  background-color: rgb(244 237 237 / 20%);
  border-radius: 1em;
}

.basic-menu {
  height: 522px;
  padding: 0 40px 0 48px;
  margin-top: 15px;
  overflow-y: auto;
  line-height: 1;
  user-select: none;

  .menu-item {
    position: relative;
    cursor: pointer;

    &:not(:last-child) {
      margin-bottom: 30px;
    }

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 500;
      color: #242934;
    }

    .children {
      overflow: hidden;

      .children-item {
        &:first-child {
          margin-top: 22px;
        }

        &:not(:last-child) {
          margin-bottom: 6px;
        }

        // dot 代表有子数据
        &.has-dot {
          .children-item-title {
            &::before {
              display: inline-block;
              width: 4px;
              height: 4px;
              content: "";
              background: #646b7a;
              border-radius: 100%;
              transform: translateX(-6px);
            }
          }

          &.active {
            box-shadow: 0 2px 30px 0 rgb(50 94 181 / 8%);

            .children-item-title {
              background: rgb(252 253 254);
              border-radius: 8px 8px 0 0;

              &::before {
                visibility: hidden;
              }
            }
          }
        }

        .children-item-title {
          display: flex;
          align-items: center;
          height: 28px;
          padding-left: 16px;
          font-size: 14px;
          font-weight: 400;
          color: #9ca6b9;
          cursor: pointer;
        }

        .item-ol {
          position: absolute;
          z-index: 2;
          width: 100%;
          padding: 0 20px;
          background: #fff;
          border-radius: 0 0 8px 8px;
          opacity: 1;

          > li {
            display: flex;
            gap: 4px;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            cursor: pointer;

            &:first-child {
              padding-top: 24px;
            }

            &:last-child {
              padding-bottom: 24px;
            }

            &:hover,
            &.active {
              color: #0056ff;
            }

            &:not(:last-child) {
              margin-bottom: 20px;
            }

            .tips-question {
              color: #9ca6b9;
              cursor: help;
            }

            span {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
</style>
