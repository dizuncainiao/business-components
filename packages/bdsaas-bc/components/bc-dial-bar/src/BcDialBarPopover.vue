<template>
  <teleport to="body">
    <div
      v-if="$props.showMask && visible"
      class="bc-dial-bar-popover-mask"
    ></div>
  </teleport>
  <ElPopover
    v-model:visible="visible"
    popper-class="bc-dial-bar-popover"
    width="520px"
    placement="bottom-start"
    trigger="click"
    transition="fade-out-up"
    :show-arrow="false"
    :popper-style="popperStyleComputed"
    @before-enter="$emit('beforeOpen')"
    @before-leave="beforeCloseHandler"
  >
    <template #reference>
      <slot />
    </template>

    <div
      ref="bcDialBar"
      class="bc-dial-bar"
      :class="$props.draggable && 'drag'"
    >
      <!--开始页面-->
      <!--todo:如果需要隐藏的话，在计算属性里延迟 500ms 返回布尔值，让蓝色背景移入完毕再隐藏
       v-if="!['DIALING', 'CALLING'].includes($props.status)"-->
      <div class="bc-dial-bar-start">
        <div class="call-info">
          <div class="phone">{{ $props.options.phone }}</div>
          <div class="number">
            该号码今日已被拨打
            <span>{{ $props.options.number }}</span> 次，继续拨打吗？
          </div>
        </div>
        <div v-if="showTodo" class="todo" @click="todoHandler">
          <img :src="imgTodo" alt="待办" />
          代办
        </div>
        <div class="call" @click="callHandler">
          <img :src="imgCall" alt="拨打" />拨打
        </div>
      </div>

      <!--拨号中页面-->
      <transition name="slide-move">
        <div
          v-if="['DIALING', 'CALLING'].includes($props.status)"
          class="bc-dial-bar-in-progress"
        >
          <div class="call-img">
            <div
              class="img-box"
              :class="$props.status === 'CALLING' && 'is-calling'"
            >
              <img :src="imgCall" alt="拨打" />
            </div>
          </div>
          <div class="call-info">
            <div class="status-label">
              {{ currentStatus.label }}<span class="dot">...</span>
            </div>
            <div class="tip">{{ currentStatus.tip }} {{ timeText }}</div>
          </div>
          <div class="action" @click="closeHandler">
            <template v-if="$props.callType === 'CALLBACK'">
              <img class="close" :src="imgClose" alt="关闭" />
            </template>
            <template v-else>
              <div class="hang-up">挂断</div>
            </template>
          </div>
        </div>
      </transition>
    </div>
  </ElPopover>
</template>

<script lang="ts">
import '../style/index.less'

import {
  computed,
  toRaw,
  defineComponent,
  ref,
  watch,
  nextTick
  // onMounted,
  // unref
} from 'vue'
import { useDraggable } from '@vueuse/core'
import { ElPopover } from 'element-plus'
import { imgCall, imgClose, imgTodo } from './base64'
import { addZeros, secondsToHms } from '../../../_utils'
import { cloneDeep } from 'lodash-es'
import { initStatusConfig } from './hooks'
import { CallType, Options, Status, StatusConfig } from './types'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'BcDialBarPopover',
  components: {
    ElPopover
  },
  props: {
    options: {
      type: Object as PropType<Options>,
      required: true
    },
    // 打电话状态
    status: {
      type: String as PropType<Status>,
      default: 'NOT_STARTED',
      required: true
    },
    // 拨号类型：回拨、FS
    callType: {
      type: String as PropType<CallType>,
      required: true
    },
    // 显示待办功能
    showTodo: {
      type: Boolean,
      default: false
    },
    // 显示蒙层
    showMask: {
      type: Boolean,
      default: true
    },
    // 可拖拽（优先级比 popperStyle 高，为 true 时，覆盖掉 popperStyle 的样式）
    draggable: {
      type: Boolean,
      default: false
    },
    // 外部定义 popover 的位置，通常在函数调用打开 BcDialBarPopover 时使用
    popperStyle: {
      type: [Object, String],
      default: () => ({})
    }
  },
  emits: [
    'todo',
    'call',
    'hang-up',
    'update:status',
    'beforeOpen',
    'beforeClose'
  ],
  setup(props, { expose, emit, slots }) {
    const visible = ref(false)
    const statusConfig = ref<StatusConfig[]>(cloneDeep(initStatusConfig))
    const hasDefaultSlot = computed(() => !!slots.default)
    const bcDialBar = ref<HTMLElement | null>(null)

    const tipConfig = {
      CALLBACK: {
        DIALING: '您的号码已经呼出，请注意接听'
      },
      FS: {
        DIALING: '拨号时长: ',
        CALLING: '通话时长: '
      }
    }

    const currentStatus = computed(() => {
      const currentStatus =
        statusConfig.value.find(item => item.status === props.status) ?? {}
      const tip = tipConfig[props.callType][props.status]

      return {
        ...currentStatus,
        tip
      }
    })

    // const { style } = useDraggable(bcDialBar)
    const dragData = useDraggable(bcDialBar)
    const style = dragData.style
    const INIT_STYLE_VALUE = 'left:0px;top:0px;' // 没有任务初始配置时，style 的值

    watch(visible, val => {
      // 判断只在初始状态时，才重置定位
      if (val && props.status === 'NOT_STARTED') {
        // 解决拖动后，关闭，再开启（位置不能复原）
        dragData.position.value.x = 0
        dragData.position.value.y = 0
      }
    })
    // console.log(dragData, 'dragData')
    const popperStyleComputed = computed(() => {
      if (props.draggable) {
        if (style.value === INIT_STYLE_VALUE) {
          return {}
        }
        return style.value
      } else {
        return props.popperStyle
      }
    })

    function toggle(val: boolean) {
      visible.value = val

      if (val) {
        // 无需主动触发，@before-enter="$emit('beforeOpen')" 已经触发过了
        // emit('beforeOpen')
      } else {
        emit('beforeClose')
        // 关闭时，将状态重置为 “未开始”
        emit('update:status', 'NOT_STARTED')
      }
    }

    function closeHandler() {
      clearTimer()
      toggle(false)
      emit('hang-up', props.callType)
    }

    function todoHandler() {
      emit('todo', props.options.todo)
      toggle(false)
    }

    const timer = ref()
    const statusTimeCount = ref(0)
    const timeText = computed(() => {
      const { h, m, s } = secondsToHms(statusTimeCount.value)
      return `${addZeros(h)}:${addZeros(m)}:${addZeros(s)}`
    })

    function clearTimer() {
      clearInterval(timer.value)
      statusTimeCount.value = 0
    }

    function initTimer() {
      clearTimer()
      timer.value = setInterval(() => {
        statusTimeCount.value++
      }, 1000)
    }

    watch(
      () => props.status,
      (val, oldVal) => {
        console.log(val, oldVal, 'status change')
        if (val === 'DIALING') {
          // 拨号开始（FS、回拨状态）
          statusConfig.value[0].startTime = Date.now()
        } else if (val === 'CALLING') {
          // 通话开始 & 拨号结束（FS状态）
          statusConfig.value[1].startTime = Date.now()
          statusConfig.value[0].endTime = Date.now()
          initTimer()
        } else if (oldVal === 'CALLING') {
          // 通话结束（FS状态）
          statusConfig.value[1].endTime = Date.now()
        } else if (oldVal === 'DIALING') {
          // 拨号结束（回拨状态、FS拨号中挂断）
          statusConfig.value[0].endTime = Date.now()
        }
      }
    )

    function callHandler() {
      emit('call')
      initTimer()
    }

    function beforeCloseHandler() {
      // 拨号、通话中
      if (['DIALING', 'CALLING'].includes(props.status)) {
        visible.value = true
      }
    }

    expose({
      open() {
        toggle(true)
      },
      close() {
        toggle(false)
      },
      getConfig() {
        return toRaw(statusConfig.value)
      },
      resetConfig() {
        statusConfig.value = cloneDeep(initStatusConfig)
      },
      hangUp() {
        closeHandler()
      }
    })

    return {
      imgTodo,
      imgCall,
      imgClose,
      closeHandler,
      todoHandler,
      callHandler,
      beforeCloseHandler,
      visible,
      currentStatus,
      timeText,
      hasDefaultSlot,
      bcDialBar,
      popperStyleComputed
    }
  }
})
</script>
