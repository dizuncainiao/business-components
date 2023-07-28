<!-- todo 数据报表组件 -->
<template>
  <div class="data-report-page-wrapper">
    <aside class="left-aside">
      <!-- 大小报表切换 -->
      <div class="small-big-chart-wrapper">
        <span
          v-for="(item, index) of state.smallBigChartText"
          :key="item"
          :class="['chart-item', state.currentIndex === index && 'active']"
          @click="setChartStatus(state, index)"
          >{{ item }}</span
        >
      </div>
      <!-- 大、小报表对应 Tabs 组件 -->
      <component
        :is="tabComp"
        class="data-report-page-tags"
        :data="state.menuData"
      />
    </aside>
    <!-- 大、小报表对应的“已添加内容” -->
    <keep-alive>
      <component
        :is="selectedListComp"
        :small-selected-list="smallDataReportSelectedList"
        :big-selected-list="bigDataReportSelectedList"
        :on-selected="setSelectedList"
      />
    </keep-alive>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, toRaw, inject, onMounted } from 'vue'
import { cloneDeep } from 'lodash-es'
import DataReportSmall from './added-page/DataReportSmall.vue'
import DataReportBig from './added-page/DataReportBig.vue'
import { setChartStatus } from './data-report-page'
import DataReportSmallTab from './tabs-page/DataReportSmallTab.vue'
import DataReportBigTab from './tabs-page/DataReportBigTab.vue'
import { groupBy } from '../components/basic-menu/hooks'
import { mockMenuData2 } from './mock'
const getDataReportConfigData = inject('getDataReportConfigData') as any
const state = reactive({
  currentIndex: 0,
  smallBigChartText: ['小报表', '大报表'],
  menuData: mockMenuData2
  // menuData: {
  //   small: {
  //     my: [],
  //     team: []
  //   },
  //   big: {
  //     my: [],
  //     team: []
  //   }
  // }
})
// 在子组件中收集选中的项
const selectedList = reactive({
  small: [],
  big: []
})

// 小报表选中的项
const smallDataReportSelectedList = computed(() => {
  const myAndTeam = [...state.menuData.small.my, ...state.menuData.small.team]
  const activeList = groupBy(myAndTeam, 'compName')
  return activeList.filter((item: any) => item.active)
})

// 大报表选中的项
const bigDataReportSelectedList = computed(() => {
  const myAndTeam = [...state.menuData.big.my, ...state.menuData.big.team]
  const activeList = groupBy(myAndTeam, 'compName')
  return activeList.filter((item: any) => item.active)
})

// 通过 props 属性注入子组件获取被选中的列表
function setSelectedList(type: 'small' | 'big', data: any) {
  selectedList[type] = data
  console.log(type, data, 'type, data')
  getDataReportConfigData(cloneDeep(toRaw(selectedList)))
}

const selectedListComps = [DataReportSmall, DataReportBig]
const tabComps = [DataReportSmallTab, DataReportBigTab]

const selectedListComp = computed(() => selectedListComps[state.currentIndex])
const tabComp = computed(() => tabComps[state.currentIndex])

onMounted(async () => {
  setSelectedList('small', smallDataReportSelectedList.value)
  setSelectedList('big', bigDataReportSelectedList.value)
})
</script>

<script lang="ts">
export default {
  name: 'DataReportPage'
}
</script>

<style scoped lang="less">
.data-report-page-wrapper {
  display: flex;
  height: 671px;
}

.left-aside {
  width: 280px;
  height: 100%;
  overflow-y: auto;
  background: rgb(245 247 251 / 60%);
}
</style>

<style lang="less">
.left-aside {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.small-big-chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 40px;
  // 结合 el-tabs 组件高度，计算得出 10px
  margin: 20px 0 10px;
  background: #fff;
  border-radius: 25px;

  .chart-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 92px;
    height: 32px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 25px;
    transition: 0.3s;

    &:hover,
    &.active {
      color: #0056ff;
      background: rgb(0 86 255 / 6%);
    }
  }
}

.data-report-page-tags {
  width: 100%;

  .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
    padding: 0 46px;
  }

  .el-tabs__nav-wrap::after {
    display: block !important;
    height: 1px;
    background-color: #edf1f6;
  }

  .el-tabs__active-bar {
    height: 1px;
    background-color: #0056ff;
  }

  .el-tabs__item {
    font-size: 14px !important;
  }
}
</style>
