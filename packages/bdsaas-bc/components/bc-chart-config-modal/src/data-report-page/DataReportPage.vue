<!-- 数据报表组件 -->
<template>
  <div class="data-report-page-wrapper">
    <aside class="data-report-page-left-aside">
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

<script lang="ts">
import {
  computed,
  reactive,
  toRaw,
  inject,
  onMounted,
  defineComponent
} from 'vue'
import { groupBy } from '../components/basic-menu/hooks'
import { setChartStatus } from './data-report-page'
import DataReportSmall from './added-page/DataReportSmall.vue'
import DataReportBig from './added-page/DataReportBig.vue'
import DataReportSmallTab from './tabs-page/DataReportSmallTab.vue'
import DataReportBigTab from './tabs-page/DataReportBigTab.vue'
import { cloneDeep } from 'lodash-es'
import { mockMenuData2 } from './mock'

export default defineComponent({
  name: 'DataReportPage',
  setup() {
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
      const myAndTeam = [
        ...state.menuData.small.my,
        ...state.menuData.small.team
      ]
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

    const selectedListComp = computed(
      () => selectedListComps[state.currentIndex]
    )
    const tabComp = computed(() => tabComps[state.currentIndex])

    onMounted(async () => {
      setSelectedList('small', smallDataReportSelectedList.value)
      setSelectedList('big', bigDataReportSelectedList.value)
    })

    return {
      state,
      selectedList,
      smallDataReportSelectedList,
      bigDataReportSelectedList,
      selectedListComp,
      tabComp,
      setSelectedList,
      setChartStatus
    }
  }
})
</script>
