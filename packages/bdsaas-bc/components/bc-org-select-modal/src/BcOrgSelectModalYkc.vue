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
          placeholder="输入姓名/部门进行搜索"
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
          已选择 {{ state.checkedNodes.length }} 人
        </div>
        <ul class="selected-list-box">
          <li v-for="(item, index) of state.checkedNodes" :key="item.id">
            <img :src="item.image" class="list-avatar" alt="" />
            <span
              class="person-name"
              style="
                flex: initial !important;
                width: 68px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
"
              >{{ item.label }}</span
            >
            <el-input-number
              v-model="item.number"
              style="width: 116px; margin-right: 23px;"
              :min="0"
              :max="10000"
              controls-position="right"
              :controls="false"
              placeholder="请输入解锁量"
            />
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

import { defineComponent, nextTick, reactive, ref, watch } from 'vue'
import {
  Dialog as BnDialog,
  Input as BnInput,
  BnIconClose,
  Space as BnSpace,
  Button as BnButton
} from 'blocks-next'
import { ElInputNumber } from 'element-plus'
import {
  getDepAndUserTree,
  QueryInitDep
} from '../../../_plugins/axios-http/apis'
import { getTreeData, initTreeData, setDisabled } from './hooks'
import { cloneDeep } from 'lodash-es'

export default defineComponent({
  name: 'BcOrgSelectModalYkc',
  components: {
    BnDialog,
    BnInput,
    BnIconClose,
    BnSpace,
    BnButton,
    ElInputNumber
  },
  props: {
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

    watch(query, text => {
      tree.value?.filter(text)
    })

    const initState = {
      loading: false,
      filterText: '',
      checkedKeys: props.defaultCheckedKeys,
      treeData: [],
      defaultExpandedKeys: [],
      checkedNodes: []
    }

    const state = reactive({
      loading: false,
      filterText: '',
      checkedKeys: props.defaultCheckedKeys,
      treeData: [],
      defaultExpandedKeys: [],
      checkedNodes: []
    })

    // 更新树数据
    async function updateTreeData() {
      // const params = {
      //   withPeople: true,
      //   withUserNum: true,
      //   withDepLeafNum: true,
      //   COMPANYID: localStorage.getItem('_BDSAAS_COMPANY_ID') || 1564
      // }
      // loading.value = true
      //
      // QueryInitDep(params).then(res => {
      //   state.treeData = initTreeData(res.data)
      //   nextTick(() => getCheckedNodesOfKeys(props.defaultCheckedKeys))
      //   loading.value = false
      // })
      const params = {}
      loading.value = true
      getDepAndUserTree(params).then(res => {
        const list = res?.data?.innerDep || []
        state.treeData = setDisabled(getTreeData(list))
        console.log(getTreeData(list), 'getTreeData(list)')
        nextTick(() => getCheckedNodesOfKeys(props.defaultCheckedKeys))
        loading.value = false
      })
    }

    function getCheckedNodesOfKeys(checkedKeys) {
      const leftCheckedNodes = tree.value
        .getNodesByValues(checkedKeys)
        .map(item => ({
          ...item.data,
          depName: item.parent.label
        }))

      const cacheStateCheckedNodes = cloneDeep(state.checkedNodes)

      state.checkedNodes = leftCheckedNodes.map(item => {
        return {
          ...item,
          number:
            cacheStateCheckedNodes.find(v => v.id === item.id)?.number || 0
        }
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
            checkedNodes: state.checkedNodes.map(item => {
              return {
                attendant: item.name,
                dailyUnlockAmount: item.number,
                depId: Math.abs(item.pId),
                depName: item.depName,
                profileId: Math.abs(item.id)
              }
            })
          })
        )

        toggle(false)
      },
      visible,
      loading,
      tree,
      query,
      state
    }
  }
})
</script>
