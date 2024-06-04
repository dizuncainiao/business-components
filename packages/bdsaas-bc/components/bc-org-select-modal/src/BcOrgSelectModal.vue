<template>
  <BnDialog
    popup-class="bc-org-select-modal"
    v-model="visible"
    :title="$props.title"
    :width="$props.width"
    :height="$props.height"
    center
  >
    <div class="bc-org-select-content">
      <div class="bc-org-select-content-left">
        <bn-input
          v-model="query"
          class="w344"
          :placeholder="placeholder"
          suffix-icon="bn-icon-search"
        ></bn-input>

        <bn-tree
          v-bn-loading="loading"
          bn-loading-text="数据加载中…"
          ref="tree"
          class="tree-box"
          :class="$props.disabled && 'disabled'"
          v-model:checked="state.checkedKeys"
          show-checkbox
          :check-strictly="$props.single || $props.checkStrictly"
          checked-on-click-node
          :default-unfold-all="$props.defaultUnfoldAll"
          :data="state.treeData"
          :unfold-on-click-node="false"
          :default-unfold-values="state.checkedKeys"
          @change-checked="onChangeChecked"
        />
      </div>
      <div class="bc-org-select-content-right">
        <div class="selected-person">
          已选择 {{ state.checkedNodes.length }}
          {{ $props.mode === 'personnel' ? '人' : '部门' }}
        </div>
        <ul class="selected-list-box">
          <li v-for="(item, index) of state.checkedNodes" :key="item.id">
            <img
              v-if="item.image"
              :src="item.image"
              class="list-avatar"
              alt=""
            />
            <span class="person-name">{{ item.name }}</span>
            <bn-icon-close
              v-if="!$props.disabled"
              @click="remove(index)"
              class="del-icon"
            />
          </li>
        </ul>
        <BnSpace class="action-box">
          <BnButton @click="toggle(false)">取消</BnButton>
          <BnButton type="primary" @click="saveHandler">确认</BnButton>
        </BnSpace>
      </div>
    </div>
  </BnDialog>
</template>

<script lang="ts">
import '../style/index.less'

import {
  computed,
  defineComponent,
  nextTick,
  PropType,
  reactive,
  ref,
  toRaw,
  watch
} from 'vue'
import {
  Dialog as BnDialog,
  Input as BnInput,
  BnIconClose,
  Space as BnSpace,
  Button as BnButton
} from 'blocks-next'
import { getDepAndUserTree } from '../../../_plugins/axios-http/apis'
import { getTreeData, setDisabled, setDisabledSingle } from './hooks'
import { cloneDeep, isNumber, last } from 'lodash-es'

export default defineComponent({
  name: 'BcOrgSelectModal',
  components: { BnDialog, BnInput, BnIconClose, BnSpace, BnButton },
  props: {
    /**
     * personnel: 人员模式，department: 部门模式
     */
    mode: {
      type: String as PropType<'personnel' | 'department'>,
      default: 'personnel'
    },
    /**
     * 单选模式
     * personnel 模式下部门禁用，只有人员可选，单选；
     * department 模式下部门可选，人员禁用，单选；
     * 为true时开启check-strictly：父子不互相关联,父级状态不会影响子级状态）
     */
    single: {
      type: Boolean,
      default: false
    },
    /*父子不互相关联,父级状态不会影响子级状态*/
    checkStrictly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showSure: {
      type: Boolean,
      default: false
    },
    // 默认展开所有
    defaultUnfoldAll: {
      type: Boolean,
      default: false
    },
    // 父级无数据开启禁用
    parentNoDataOpenDisabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '700px'
    },
    height: {
      type: String,
      default: '600px'
    },
    okText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    title: {
      type: String,
      default: '选择人员'
    },
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { expose, emit }) {
    const visible = ref(false)
    const loading = ref(false)
    const tree = ref()
    const query = ref('')

    const placeholder = computed(() => {
      if (props.mode === 'personnel') {
        return '输入姓名/部门进行搜索'
      } else if (props.mode === 'department') {
        return '输入部门进行搜索'
      } else {
        return '输入姓名/部门进行搜索'
      }
    })

    watch(query, text => {
      tree.value?.filter(text)
    })

    const initState = {
      loading: false,
      filterText: '',
      checkedKeys: [],
      treeData: [],
      defaultExpandedKeys: [],
      checkedNodes: []
    }

    const state = reactive({
      loading: false,
      filterText: '',
      checkedKeys: [],
      treeData: [],
      defaultExpandedKeys: [],
      checkedNodes: []
    })

    watch(
      () => props.defaultCheckedKeys,
      newVal => {
        initState.checkedKeys = newVal as any
        state.checkedKeys = newVal as any
      },
      {
        immediate: true
      }
    )

    // 更新树数据
    async function updateTreeData() {
      const params = {}
      loading.value = true

      getDepAndUserTree(params).then(res => {
        const list = (res?.data?.innerDep || []).map(item => {
          return {
            ...item,
            id: isNumber(item.id) ? Math.abs(item.id) : item.id,
            pId: isNumber(item.pId) ? Math.abs(item.pId) : item.pId
          }
        })
        if (props.single) {
          if (props.mode === 'personnel') {
            state.treeData = setDisabledSingle(getTreeData(list))
          } else if (props.mode === 'department') {
            state.treeData = getTreeData(
              list.filter((item: any) => item.type === 'dep')
            )
          } else {
            state.treeData = setDisabled(getTreeData(list))
          }
        } else {
          if (props.mode === 'personnel') {
            state.treeData = setDisabled(getTreeData(list))
          } else if (props.mode === 'department') {
            state.treeData = getTreeData(
              list.filter((item: any) => item.type === 'dep')
            )
          } else {
            state.treeData = setDisabled(getTreeData(list))
          }
        }

        nextTick(() => {
          if (props.defaultCheckedKeys?.length) {
            getCheckedNodesOfKeys(props.defaultCheckedKeys)
          }
        })
        loading.value = false
      })
    }

    function getCheckedNodesOfKeys(checkedKeys: any[]) {
      if (props.single && checkedKeys.length) {
        state.checkedKeys = [last(checkedKeys)] as any
      }

      nextTick(() => {
        state.checkedNodes = tree.value
          .getNodesByValues(state.checkedKeys)
          .map((item: any) => {
            return {
              ...(item.data || {}),
              name: item?.data?.label || '',
              id: item?.data?.value || '',
              image: item?.data?.image || '',
              depName: item?.parent?.label || ''
            }
          })
      })
    }

    // 移除选中的节点
    function remove(index: number) {
      state.checkedNodes.splice(index, 1)
      state.checkedKeys.splice(index, 1)
    }

    const onChangeChecked = (keys: any[]) => getCheckedNodesOfKeys(keys)

    function toggle(val: boolean) {
      // 关闭，重置数据
      if (!val) {
        Object.assign(state, initState)
        loading.value = false
        query.value = ''
      } else {
        updateTreeData()
      }

      visible.value = val
    }

    expose({
      toggle,
      updateTreeData,
      getCheckedKeys() {
        return state.checkedKeys
      },
      getCheckedNodes() {
        return state.checkedNodes
      },
      getCheckedNodesOfKeys
    })

    return {
      toggle,
      remove,
      onChangeChecked,
      saveHandler() {
        emit(
          'ok',
          cloneDeep({
            checkedKeys: state.checkedKeys,
            checkedNodes: state.checkedNodes
          })
        )

        toggle(false)
      },
      visible,
      placeholder,
      loading,
      tree,
      query,
      state
    }
  }
})
</script>
