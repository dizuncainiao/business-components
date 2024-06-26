<template>
  <el-dialog
    v-model="state.visible"
    class="bc-chart-config-modal"
    width="960px"
    :show-close="false"
    destroy-on-close
  >
    <!-- 头部 -->
    <template #header="{ close }">
      <div class="bc-chart-config-modal-header">
        <div class="title-box">
          <div
            v-for="(name, index) of state.tabs"
            :key="name"
            :class="[
              'title-box-item',
              state.currentIndex === index && 'active'
            ]"
            @click="tabChange(index)"
          >
            {{ name }}
          </div>
        </div>
        <el-icon class="close-icon" @click="close">
          <Close />
        </el-icon>
      </div>
    </template>

    <!-- 内容 -->
    <div class="customize-dialog-content">
      <component :is="currentComponent" />
      <div class="customize-dialog-footer">
        <bn-button @click="toggle(false)">取消</bn-button>
        <bn-button type="primary" @click="saveHandler">确认</bn-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import '../style/index.less'

import { MessageBox, Button as BnButton } from 'blocks-next'
import { computed, reactive, provide, defineComponent, PropType } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { ElDialog, ElButton, ElIcon } from 'element-plus'
import DataReportPage from './data-report-page/DataReportPage.vue'
import { MenuConfig, MenuSourceData } from './types'
import { useMenuData } from './hooks'

export default defineComponent({
  name: 'BcChartConfigModal',
  components: { Close, ElDialog, ElButton, ElIcon, BnButton },
  props: {
    // 接口获取的菜单数据
    menuSourceData: {
      type: Object as PropType<MenuSourceData>,
      required: true
    },
    // 接口获取的已配置的菜单数据
    menuConfig: {
      type: Array as PropType<MenuConfig>,
      required: true
    },
    // 允许放置的小图表整数倍（默认为3）
    integerMultiple: {
      type: Number as PropType<number>,
      default: 3
    },
    // 小图表的最大数量
    smallChartMax: {
      type: Number as PropType<number>,
      default: 6
    }
  },
  emits: ['configured'],
  setup(props, { expose, emit }) {
    const state = reactive({
      visible: false,
      currentIndex: 0,
      tabs: ['数据报表'],
      // 选择后的配置数据
      selectedConfigData: {
        dataReport: {},
        purchase: []
      }
    })

    // 主内容区组件（左侧菜单+右侧已选择内容区）
    const mainComponents = [DataReportPage]

    const currentComponent = computed(() => mainComponents[state.currentIndex])

    function tabChange(index: number) {
      state.currentIndex = index
    }

    function toggle(visible: boolean) {
      state.visible = visible
    }

    /**
     * 获取数据报表的配置数据（核心注释！！！）
     * CustomizeDialog.vue 组件作为数据收集的最顶级父级
     * 该数据会从 CustomizeDialog.vue -----> DataReportPage.vue -----> DataReportBig.vue、DataReportSmall.vue 从父到子层层传递（左边废弃，改为 provide/inject 依赖注入方式直接传递）
     * @param data
     */
    function getDataReportConfigData(data: any) {
      state.selectedConfigData.dataReport = data
    }

    // 获取购买情况的配置数据
    function getPurchaseConfigData(data: any) {
      state.selectedConfigData.purchase = data
    }

    // 保存图表的配置数据
    function saveHandler() {
      const dataReport: any = state.selectedConfigData.dataReport

      if (dataReport?.small?.length % props.integerMultiple) {
        return MessageBox({
          title: `小报表数量不是${props.integerMultiple}的倍数`,
          type: 'strong',
          okText: '确定',
          hideCancel: true,
          popupClass: 'z-index-3000'
        })
      }

      const handleReportFormList = (data: any) => {
        const reportFormList: any[] = []
        const reportFormListId = [...data.big, ...data.small].map(
          item => item.id
        )
        reportFormListId.forEach((id, index) => {
          reportFormList.push({ formSort: index + 1, reportFormId: id })
        })
        return reportFormList
      }

      emit('configured', handleReportFormList(dataReport))
    }

    provide('getDataReportConfigData', getDataReportConfigData)
    provide('getPurchaseConfigData', getPurchaseConfigData)
    provide('useMenuData', () =>
      useMenuData(props.menuSourceData, props.menuConfig)
    )
    provide(
      'configModalProps',
      computed(() => props)
    )

    expose({
      toggle
    })

    return {
      state,
      currentComponent,
      tabChange,
      toggle,
      saveHandler
    }
  }
})
</script>
