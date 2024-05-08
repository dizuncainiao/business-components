<template>
  <div class="data-report-selected-content-small data-report-selected-content">
    <div class="tips-box">
      <div style="font-weight: bold;">
        已添加小报表
        <span class="gray">（{{ state.selectedList.length }}）</span>
      </div>

      <span class="gray fz14"
        >最多可添加{{ configModalProps.smallChartMax }}条小报表，数量为{{
          configModalProps.integerMultiple
        }}的倍数</span
      >
    </div>
    <VueDraggableNext
      class="selected-list"
      :list="state.selectedList"
      handle=".move"
      @change="draggableChange"
    >
      <transition-group name="fade">
        <div v-for="item of state.selectedList" :key="item" class="list-item">
          {{ item.title }}
          <div class="mask-box">
            <img
              class="action-icon"
              @click="cancelActive(item)"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+5Yig6ZmkaWNvbjwvdGl0bGU+CiAgICA8ZyBpZD0i5o6n5Yi25Y+wK+a2iOaBryIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjMt5o6n5Yi25Y+wLeiHquWumuS5ieW/q+aNt+WFpeWPo+W8ueeqlyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk2OC4wMDAwMDAsIC01MzEuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtMTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkyOC4wMDAwMDAsIDUwMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSLliKDpmaRpY29uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MC4wMDAwMDAsIDI4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNi45OTgzMjQ2LDcgQzE4LjEwNjUxNjEsNyAxOS4wMDQ4ODI4LDcuODk3MDYwMTMgMTkuMDA0ODgyOCw5LjAwNTg1ODY2IEwxOS4wMDQ4ODI4LDE4Ljk5NDE0MTMgQzE5LjAwNDg4MjgsMjAuMTAxOTQ2NSAxOC4xMDc1MDk4LDIxIDE2Ljk5ODMyNDYsMjEgTDcuMDA2NTU4MjUsMjEgQzUuODk4MzY2NzMsMjEgNSwyMC4xMDI5Mzk5IDUsMTguOTk0MTQxMyBMNSw5LjAwNTg1ODY2IEM1LDcuODk4MDUzNTEgNS44OTczNzMsNyA3LjAwNjU1ODI1LDcgTDE2Ljk5ODMyNDYsNyBaIE0xNy4wMDMyMDcsOS4wMDE1ODgxMyBMNy4wMDE2NzU4Miw5LjAwMTU4ODEzIEw3LjAwMTY3NTgyLDE4Ljk5ODQxMTkgTDE2Ljk5ODMyNDYsMTkgTDE3LjAwMzIwNyw5LjAwMTU4ODEzIFoiIGlkPSJSZWN0YW5nbGUtMzkiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNy4wMDQ4ODMsMyBMMTYuMzMyMzIwNCw3LjAzNTM3NTYgQzE2LjE1MTQ4MTcsOC4xMjA0MDc2OSAxNS4xMTc2MzU0LDkgMTQuMDA1NTYyMSw5IEw5Ljk5OTMyMDk0LDkgQzguODk1MTI2NDgsOSA3Ljg1MjQ0NjU2LDguMTE0Njc5MzQgNy42NzI1NjI2LDcuMDM1Mzc1NiBMNywzIEwxNy4wMDQ4ODMsMyBaIE0xNC42NDQsNSBMOS4zNiw1IEw5LjY0NTM1MDQ1LDYuNzA2NTc3NjIgQzkuNjYxOTYwNjIsNi44MDYyMzg2NyA5LjgxODIwOTY5LDYuOTUwNjI3ODMgOS45NDEzMjQ1Nyw2Ljk4OTg0Nzk4IEw5Ljk5OTMyMDk0LDcgTDE0LjAwNTU2MjEsNyBDMTQuMTE4NzU3Myw3IDE0LjI4MjkwNzgsNi44NzQ3NTg2OSAxNC4zNDA0MDI3LDYuNzYxNTQ2MDQgTDE0LjM1OTUzMjYsNi43MDY1Nzc2MiBMMTQuNjQ0LDUgWiIgaWQ9IlJlY3RhbmdsZS0zOSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMi4wMDI0NDEsIDYuMDAwMDAwKSBzY2FsZSgxLCAtMSkgdHJhbnNsYXRlKC0xMi4wMDI0NDEsIC02LjAwMDAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IkxpbmUiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSIxNSAxMiAxNSAxNiAxMyAxNiAxMyAxMiI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJMaW5lIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHBvaW50cz0iMTEgMTIgMTEgMTYgOSAxNiA5IDEyIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9IjMiIHkxPSI4IiB4Mj0iMjEiIHkyPSI4IiBpZD0iTGluZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
              alt=""
            />
            <img
              class="action-icon move"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+56e75YqoaWNvbjwvdGl0bGU+CiAgICA8ZyBpZD0i5o6n5Yi25Y+wK+a2iOaBryIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjMt5o6n5Yi25Y+wLeiHquWumuS5ieW/q+aNt+WFpeWPo+W8ueeqlyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwMTIuMDAwMDAwLCAtNTMxLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtMTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkyOC4wMDAwMDAsIDUwMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSLnp7vliqhpY29uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4NC4wMDAwMDAsIDI4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJMaW5lIiBwb2ludHM9IjggNS4wMTU0MTE5MSA4IDE4Ljk5OTk5OTkgNiAxOC45OTk5OTk5IDYgNS4wMTU0MTE5MSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJMaW5lIiBwb2ludHM9IjEzIDUuMDE1NDExOTEgMTMgMTguOTk5OTk5OSAxMSAxOC45OTk5OTk5IDExIDUuMDE1NDExOTEiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iTGluZSIgcG9pbnRzPSIxOCA1LjAxNTQxMTkxIDE4IDE4Ljk5OTk5OTkgMTYgMTguOTk5OTk5OSAxNiA1LjAxNTQxMTkxIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTYuMjkzNjMxOTksNC4yOTIxMDI3NiBDNi42ODQ1NjM4NywzLjkwMTk4NjQ4IDcuMzE3NzI4NSwzLjkwMjY0NzY1IDcuNzA3ODQ0NzgsNC4yOTM1Nzk1MyBDOC4wNjc5NTIxMiw0LjY1NDQzOTcyIDguMDk1MDg5MzEsNS4yMjE2OTk0MiA3Ljc4OTY1NDk1LDUuNjEzNjcxOSBMNy43MDYzNjgwMSw1LjcwNzc5MjMyIEw0LjcwNjM2ODAxLDguNzAxNTMzNDQgQzQuMzE1NDM2MTMsOS4wOTE2NDk3MiAzLjY4MjI3MTUsOS4wOTA5ODg1NSAzLjI5MjE1NTIyLDguNzAwMDU2NjcgQzIuOTMyMDQ3ODgsOC4zMzkxOTY0NyAyLjkwNDkxMDY5LDcuNzcxOTM2NzcgMy4yMTAzNDUwNSw3LjM3OTk2NDMgTDMuMjkzNjMxOTksNy4yODU4NDM4OCBMNi4yOTM2MzE5OSw0LjI5MjEwMjc2IFoiIGlkPSJMaW5lIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE5LjI5MzYzMiwxNS4yNzc0OTg3IEMxOS42ODQ1NjM5LDE0Ljg4NzM4MjQgMjAuMzE3NzI4NSwxNC44ODgwNDM2IDIwLjcwNzg0NDgsMTUuMjc4OTc1NSBDMjEuMDY3OTUyMSwxNS42Mzk4MzU3IDIxLjA5NTA4OTMsMTYuMjA3MDk1NCAyMC43ODk2NTQ5LDE2LjU5OTA2NzkgTDIwLjcwNjM2OCwxNi42OTMxODgzIEwxNy43MDYzNjgsMTkuNjg2OTI5NCBDMTcuMzE1NDM2MSwyMC4wNzcwNDU3IDE2LjY4MjI3MTUsMjAuMDc2Mzg0NSAxNi4yOTIxNTUyLDE5LjY4NTQ1MjYgQzE1LjkzMjA0NzksMTkuMzI0NTkyNCAxNS45MDQ5MTA3LDE4Ljc1NzMzMjcgMTYuMjEwMzQ1MSwxOC4zNjUzNjAyIEwxNi4yOTM2MzIsMTguMjcxMjM5OCBMMTkuMjkzNjMyLDE1LjI3NzQ5ODcgWiIgaWQ9IkxpbmUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
              alt=""
            />
          </div>
        </div>
      </transition-group>
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
      <div class="list-item empty-list-item"></div>
    </VueDraggableNext>
  </div>
</template>

<script lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import { cloneDeep } from 'lodash-es'
import { reactive, toRaw, watch, defineComponent, inject } from 'vue'
import type { PropType, ComputedRef } from 'vue'

export default defineComponent({
  name: 'DataReportSmall',
  components: { VueDraggableNext },
  props: {
    smallSelectedList: {
      type: Array,
      default: () => []
    },
    onSelected: {
      type: Function as PropType<(type: 'small' | 'big', data: any) => void>,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      selectedList: []
    })

    const configModalProps = inject('configModalProps') as ComputedRef

    watch(
      () => props.smallSelectedList,
      val => {
        state.selectedList = val
      },
      {
        deep: true,
        immediate: true
      }
    )

    watch(
      () => state.selectedList,
      val => {
        props.onSelected('small', cloneDeep(toRaw(val)))
      },
      {
        deep: true,
        immediate: true
      }
    )

    function draggableChange(val: any) {
      console.log(val, 'line 57 57 57 57')
    }

    function cancelActive(item: any) {
      item.active = false
    }

    return {
      state,
      draggableChange,
      cancelActive,
      configModalProps
    }
  }
})
</script>
