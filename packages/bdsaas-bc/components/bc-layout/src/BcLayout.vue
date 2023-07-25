<template>
  <div class="bc-layout">
    <BcSideMenu v-if="$props.options.showMenu" v-bind="$props.options" />
    <div class="{classList.value}">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import '../style/index.less'

import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import BcSideMenu from '../../bc-side-menu/src/BcSideMenu.vue'
import type { LayoutProps } from './types'

export default defineComponent({
  name: 'BcLayout',
  components: { BcSideMenu },
  props: {
    options: {
      type: Object as PropType<LayoutProps>,
      required: true
    }
  },
  setup(props) {
    const classList = computed(() => [
      'bc-layout-container',
      props.options.showMenu ? 'with-menu' : ''
    ])

    return {
      classList
    }
  }
})
</script>
