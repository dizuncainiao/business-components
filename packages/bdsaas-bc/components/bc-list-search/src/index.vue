<template>
  <div class="bc-list-search-container">
    <div class="bls-header">
      <div class="bls-title">{{ title }}</div>
      <bn-popup ref="blsHeaderPopupRef" placement="bottom" contentClass="bls-header-popup" show-arrow>
        <template #trigger>
          <div class="bls-header-operate">
            <img src="./assets/setting.svg" />
            <span>{{ btnName }}</span>
          </div>
        </template>
        <template #content>
          <div class="bls-checkbox-group">
            <bn-checkbox-group v-model="visibleKeys">
              <div class="bls-checkbox-item" v-for="item in allOptions" :key="item.key" >
                <bn-checkbox :label="item.key">
                  {{ item.name }}
                </bn-checkbox>
              </div>
            </bn-checkbox-group>
          </div>
          <div class="bls-checkbox-operate">
            <bn-button @click="hidePopup">取消</bn-button>
            <bn-button type="primary" @click="confirmPopup">确定</bn-button>
          </div>
        </template>
      </bn-popup>
    </div>
    <div class="bls-content">
      <div class="bls-item" v-for="(item, itemIndex) in visibleOptions" :key="item.key">
        <div class="bls-item-name" :style="`width: ${labelWidth}px`">{{ item.name }}</div>
        <div class="bls-item-values">
          <div class="bls-value-item" @click="clickItem(itemIndex, valIndex)" :class="{ active: val.active }" v-for="(val, valIndex) in item.values" :key="val.value">{{ val.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { PropType, defineComponent, ref } from 'vue'
import { Popup, CheckboxGroup, Checkbox, Button } from 'blocks-next'
import '../style/index.less'

type OptionsType = Array<{
  key: string,
  name: string,
  values: Array<{
    label: string,
    value: string,
    active?: boolean,
    disabled?: boolean
  }>,
  sort?: number,
  hide?: boolean,
  disabled?: boolean
}>

export default defineComponent({
  name: 'BcListSearch',
  components: {
    BnPopup: Popup,
    BnCheckboxGroup: CheckboxGroup,
    BnCheckbox: Checkbox,
    BnButton: Button
  },
  props: {
    options: { // 检索项配置
      type: Object as PropType<OptionsType>,
      required: true
    },
    title: { // 标题名称
      type: String,
      default: '高级查询'
    },
    btnName: { // 按钮名称
      type: String,
      default: '自定义检索项'
    },
    labelWidth: {
      type: Number,
      default: 120
    }
  },
  emits: ['change', 'vsChange'], // 检索项变化 检索项排序和显示隐藏变化
  expose: ['getForm'],
  setup(props, { emit }) {
    const calculateOptions: OptionsType = props.options.map((item: any, index) => {
      return {
        ...item,
        values: item.values.map((val: any, idx: number) => ({
          ...val,
          active: idx === 0
        })),
        sort: index, // 排序
        hide: index > 2 // 是否隐藏
      }
    })

    // popup组件实例
    const blsHeaderPopupRef = ref()

    // 检索项key数组
    const visibleKeys = ref<string[]>(calculateOptions.filter(item => !item.hide).map(item => item.key))
    // 所有检索项
    const allOptions = ref<OptionsType>(calculateOptions)
    // 可见检索项
    const visibleOptions = ref<OptionsType>(calculateOptions.filter(item => !item.hide).sort((a: any, b: any) => a.sort - b.sort))

    const getForm = () => {
      // 获取选中的检索项与值组成的对象
      const form: any = {}
      visibleOptions.value.forEach(item => {
        const activeVal = item.values.find(val => val.active)
        if (activeVal) {
          form[item.key] = activeVal.value
        }
      })
      return form
    }


    const clickItem = (itemIndex: number, valIndex: number) => {
      // 点击检索项，切换检索项的值
      const item = visibleOptions.value[itemIndex]
      const val = item.values[valIndex]
      item.values.forEach(val => {
        val.active = false
      })
      val.active = true
      emit('change', getForm())
    }

    const hidePopup = () => {
      // TODO: 截止目前popup组件还没有暴露出hide方法，已反馈
      console.log('截止目前popup组件还没有暴露出hide方法，已反馈====', blsHeaderPopupRef.value)
    }

    const confirmPopup = () => {
      // 确定按钮
      const newOptions = allOptions.value.map(item => {
        console.log(visibleKeys.value, item.key, visibleKeys.value.includes(item.key))
        if (visibleKeys.value.includes(item.key)) {
          item.hide = false
        } else {
          item.hide = true
        }
        return item
      })
      allOptions.value = newOptions
      visibleOptions.value = newOptions.filter(item => !item.hide).sort((a: any, b: any) => a.sort - b.sort)
      emit('vsChange', visibleKeys.value)
      hidePopup()
    }

    // To Be Continue: 增加检索项拖拽排序功能，暂时不做
    // To Be Continue: 增加检索项超出3条时，显示更多按钮，暂时不做

    return {
      getForm,
      clickItem,
      allOptions,
      visibleOptions,
      visibleKeys,
      hidePopup,
      confirmPopup,
      blsHeaderPopupRef
    }
  }
})
</script>
