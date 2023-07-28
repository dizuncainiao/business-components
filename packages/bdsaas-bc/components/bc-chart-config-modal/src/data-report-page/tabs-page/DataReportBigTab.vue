<template>
  <el-tabs v-model="state.activeName">
    <el-tab-pane label="我的" name="my">
      <BasicMenu :menu-data="props.data.big.my" @change="getData" />
    </el-tab-pane>
    <el-tab-pane label="团队" name="team">
      <BasicMenu :menu-data="props.data.big.team" @change="getData" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ElTabs, ElTabPane } from 'element-plus'
import { reactive } from 'vue'
import BasicMenu from '../../components/basic-menu/BasicMenu.vue'
import type { Menu } from '../../components/basic-menu/types'

const props = defineProps<{
  data: {
    big: {
      my: Menu
      team: Menu
    }
  }
}>()

const state = reactive({
  activeName: 'my'
})

function getData(info: any) {
  info.active && (info.item.active = info.active)
}
</script>

<script lang="ts">
export default {
  name: 'DataReportBigTag'
}
</script>
