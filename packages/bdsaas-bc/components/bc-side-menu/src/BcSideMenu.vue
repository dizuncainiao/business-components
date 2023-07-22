<template>
  <div class="bc-side-menu">
    <template v-for="item of $props.menuData" :key="item.groupName">
      <dl v-if="item.showGroup">
        <dt>{{ item.groupName }}</dt>
        <template v-for="child of item.children" :key="child.title">
          <dd
            v-if="child.showItem"
            :class="currentRouteName === child.routeName && 'active'"
            @click="
              navigation({
                name: child.routeName,
                mainQuery: { routeName: child.title }
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

import { defineComponent, toRefs, unref, computed } from 'vue'
import { navigation } from '../../../_plugins/inhub'
import { badgeConfig } from './hooks'
import { useRoute } from 'vue-router'
import { Badge } from 'blocks-next'
import type { BeforeJump, Menu, MenuItem } from './types'
import type { PropType } from 'vue'
import { JumpMethod } from './types'
import { isFunction } from 'lodash-es'

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
    const currentMenuItem = null

    function jump(item: MenuItem) {
      const params = {
        name: item.routeName,
        mainQuery: { routeName: item.title }
      }

      if (isFunction(unref(jumpMethod))) {
        unref(jumpMethod)?.(item)
      } else {
        navigation(params)
      }
    }

    return {
      currentRouteName,
      badgeConfig,
      jump
    }
  }
})
</script>
