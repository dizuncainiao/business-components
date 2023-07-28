<template>
  <el-tabs v-model="state.activeName">
    <el-tab-pane label="我的" name="my">
      <BasicMenu :menu-data="props.data.small.my" @change="getData" />
    </el-tab-pane>
    <el-tab-pane label="团队" name="team">
      <BasicMenu :menu-data="props.data.small.team" @change="getData" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ElTabs, ElTabPane } from 'element-plus'
import { reactive } from 'vue'
import BasicMenu from '../../components/basic-menu/BasicMenu.vue'
import { smLength } from '../data-report-page'
import type { MenuDataHasChild } from '../type'

const props = defineProps<{
  data: {
    small: {
      my: MenuDataHasChild[]
      team: MenuDataHasChild[]
    }
  }
}>()

const state = reactive({
  activeName: 'my'
})

function getData(info: any) {
  // 收集小报表的长度
  const smLen = smLength(props.data.small)
  // 小报表数量不超过6个
  if (smLen < 6 && info.active) {
    info.item.active = info.active
  }
}
</script>

<script lang="ts">
export default {
  name: 'DataReportSmallTag'
}
</script>
