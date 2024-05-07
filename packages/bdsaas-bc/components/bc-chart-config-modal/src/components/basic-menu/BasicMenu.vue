<template>
  <div class="basic-menu">
    <div v-for="item of $props.menuData" :key="item.title" class="menu-item">
      <h3
        class="title"
        @click="item.open = !item.open"
        :class="item.open && 'open'"
      >
        {{ item.title }}
        <el-icon class="arrow-icon" v-if="item?.children?.length">
          <ArrowRight />
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
                  <span class="w125">
                    {{ `${index + 1}.${subItem.title}` }}
                  </span>
                  <!--                  <el-tooltip-->
                  <!--                    v-if="subItem.desc"-->
                  <!--                    :content="subItem.desc"-->
                  <!--                    placement="bottom"-->
                  <!--                    effect="light"-->
                  <!--                  >-->
                  <!--                    <el-icon v-if="subItem.desc" class="tips-question">-->
                  <!--                      <QuestionFilled />-->
                  <!--                    </el-icon>-->
                  <!--                  </el-tooltip>-->
                </li>
              </ol>
            </CollapseTransition>
          </li>
        </ul>
      </CollapseTransition>
    </div>
  </div>
</template>

<script lang="ts">
import { ElIcon } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import CollapseTransition from '../collapse-transition/CollapseTransition.vue'
import { computed, unref, defineComponent } from 'vue'
import { groupBy } from './hooks'
import type { PropType } from 'vue'
import type { ChildItem, SubItem, Menu } from './types'

export default defineComponent({
  name: 'BasicMenu',
  components: {
    ElIcon,
    ArrowRight,
    CollapseTransition
  },
  props: {
    menuData: {
      type: Array as PropType<Menu>,
      required: true
    },
    trigger: {
      type: String as () => 'hover' | 'click',
      default: 'hover'
    }
  },
  setup(props, { emit, expose }) {
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

    expose({
      getSelectedItems
    })

    return {
      clickOpenHandler,
      hoverOpenHandler,
      selectHandler,
      getSelectedItems
    }
  }
})
</script>
