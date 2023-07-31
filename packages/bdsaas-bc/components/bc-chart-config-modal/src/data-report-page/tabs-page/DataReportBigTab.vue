<template>
  <el-tabs v-model="state.activeName">
    <el-tab-pane label="我的" name="my">
      <BasicMenu :menu-data="$props.data.big.my" @change="getData" />
    </el-tab-pane>
    <el-tab-pane label="团队" name="team">
      <BasicMenu :menu-data="$props.data.big.team" @change="getData" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { ElTabPane, ElTabs } from 'element-plus'
import BasicMenu from '../../components/basic-menu/BasicMenu.vue'
import { defineComponent, reactive } from 'vue'
import type { BigTagData } from '../type'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'DataReportBigTag',
  components: { BasicMenu, ElTabs, ElTabPane },
  props: {
    data: {
      type: Object as PropType<BigTagData>,
      required: true
    }
  },
  setup() {
    const state = reactive({
      activeName: 'my'
    })

    function getData(info: any) {
      info.active && (info.item.active = info.active)
    }

    return {
      state,
      getData
    }
  }
})
</script>
