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
