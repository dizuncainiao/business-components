<template>
  <!--  1.鼠标移入，展示拨号条，鼠标移除关闭拨号条-->
  <!--  2.进入到拨号中页面，拨号条常驻，hover 关闭失效-->
  <div class="relative-box" :class="!hasDefaultSlot && 'no-slot'">
    <div
      class="hover-wrapper"
      @mouseover="hoverHandler('mouseover')"
      @mouseleave="hoverHandler('mouseout')"
    >
      <slot></slot>
      <transition name="fade-out-up">
        <div v-show="visible" class="bc-dial-bar">
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
            <div class="todo" @click="todoHandler">
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
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import '../style/index.less'

import type { PropType } from 'vue'
import { computed, toRaw, defineComponent, ref, watch } from 'vue'
import {
  CallType,
  MouseEventType,
  Options,
  Status,
  StatusConfig
} from './types'
import { imgCall, imgClose, imgTodo } from './base64'
import { addZeros, secondsToHms } from '../../../_utils'
import { cloneDeep } from 'lodash-es'
import { initStatusConfig } from './hooks'

export default defineComponent({
  name: 'BcDialBar',
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
    }
  },
  emits: ['todo', 'call', 'hang-up', 'update:status'],
  setup(props, { expose, emit, slots }) {
    const visible = ref(false)
    const statusConfig = ref<StatusConfig[]>(cloneDeep(initStatusConfig))
    const hasDefaultSlot = computed(() => !!slots.default)

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

    const classList = computed(() => [
      ['DIALING', 'CALLING'].includes(props.status) ? 'show' : ''
    ])

    function toggle(val: boolean) {
      visible.value = val
      // 关闭时，将状态重置为 “未开始”
      !val && emit('update:status', 'NOT_STARTED')
    }

    function hoverHandler(type: MouseEventType) {
      if (['DIALING', 'CALLING'].includes(props.status)) {
        return
      }

      if (!hasDefaultSlot.value) {
        return
      }

      if (type === 'mouseover') {
        toggle(true)
      } else {
        toggle(false)
      }
    }

    function closeHandler() {
      clearTimer()
      emit('hang-up', props.callType)
      toggle(false)
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
      }
    })

    return {
      imgTodo,
      imgCall,
      imgClose,
      hoverHandler,
      closeHandler,
      todoHandler,
      callHandler,
      visible,
      currentStatus,
      classList,
      timeText,
      hasDefaultSlot
    }
  }
})
</script>
