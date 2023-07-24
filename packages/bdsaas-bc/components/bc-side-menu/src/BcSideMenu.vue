<template>
  <div class="bc-side-menu">
    <template v-for="item of $props.menuData" :key="item.groupName">
      <dl v-if="item.showGroup">
        <dt>{{ item.groupName }}</dt>
        <template v-for="child of item.children" :key="child.title">
          <!--fixme: as any，后期需增加为 undefined 的判断-->
          <dd
            v-if="child.showItem"
            :class="currentRouteName === child.routeName && 'active'"
            @click="
              jumpHandler({
                to: child,
                from: currentMenuItem,
                beforeJump: $props.beforeJump as any,
                jumpMethod: $props.jumpMethod as any,
                menuData: $props.menuData
              })
            "
          >
            <!--todo: 后期可采用 TSX 编写-->
            <Badge v-if="child.notice" v-bind="badgeConfig(child)">
              <span class="title">{{ child.title }}</span>
            </Badge>
            <span v-else class="title">{{ child.title }}</span>
          </dd>
        </template>
      </dl>
    </template>
  </div>
</template>

<script lang="ts">
import '../style/index.less'

import type { PropType } from 'vue'
import { computed, defineComponent, toRefs, unref } from 'vue'
import { navigation } from '../../../_plugins/inhub'
import { badgeConfig, jumpHandler } from './hooks'
import { useRoute } from 'vue-router'
import { Badge } from 'blocks-next'
import { isFunction } from 'lodash-es'
import type { BeforeJump, Menu, MenuItem, JumpMethod } from './types'

export default defineComponent({
  name: 'BcSideMenu',
  methods: { navigation },
  components: {
    Badge
  },
  props: {
    // 菜单数据
    menuData: {
      type: Array as PropType<Menu>,
      required: true
    },
    // 权限数据
    authKeys: {
      type: Array as PropType<string[]>
    },
    // 路由守卫-跳转之前
    beforeJump: {
      type: Function as PropType<BeforeJump>
    },
    // 导航跳转方法
    jumpMethod: {
      type: Function as PropType<JumpMethod>
    }
  },
  setup(props) {
    const { jumpMethod, beforeJump } = toRefs(props)
    const currentRouteName = computed(() => useRoute()?.name ?? 'OverviewBi')
    // 当前的 MenuItem
    const currentMenuItem = computed(() => {
      const { menuData } = toRefs(props)
      return unref(menuData)
        .map(item => item.children)
        .flat()
        .find(item => item.routeName === unref(currentRouteName))
    })

    return {
      currentMenuItem,
      currentRouteName,
      badgeConfig,
      jumpHandler
    }
  }
})
</script>
