<template>
  <!--  1.鼠标移入，展示拨号条，鼠标移除关闭拨号条-->
  <!--  2.进入到拨号中页面，拨号条常驻，hover 关闭失效-->
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
          <div class="call" @click="$emit('call')">
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
              <div class="img-box">
                <img :src="imgCall" alt="拨打" />
              </div>
            </div>
            <div class="call-info">
              <div class="status-label">
                {{ currentStatus.label }}<span class="dot">...</span>
              </div>
              <div class="tip">{{ currentStatus.tip }}</div>
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
</template>

<script lang="ts">
import '../style/index.less'

import type { PropType } from 'vue'
import { computed, toRaw, defineComponent, reactive, ref } from 'vue'
import { CallType, MouseEventType, Options, Status } from './types'
import { imgCall, imgClose, imgTodo } from './base64'

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
  setup(props, { expose, emit }) {
    const visible = ref(false)
    const statusConfig = reactive([
      {
        label: '拨打中', // 打电话状态，拨号条上显示的文字
        status: 'DIALING', // 打电话状态，用于业务方操作逻辑
        time: 0, // 状态持续的时间（秒）
        startTime: 0, // 状态开始时间（时间戳）
        endTime: 0 // 状态结束时间（时间戳）
      },
      { label: '通话中', status: 'CALLING', time: 0, startTime: 0, endTime: 0 }
    ])

    const tipConfig = {
      CALLBACK: {
        DIALING: '您的号码已经呼出，请注意接听'
      },
      FS: {
        DIALING: '拨号时长',
        CALLING: '通话时长'
      }
    }

    const currentStatus = computed(() => {
      const currentStatus =
        statusConfig.find(item => item.status === props.status) ?? {}
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

      if (type === 'mouseover') {
        toggle(true)
      } else {
        toggle(false)
      }
    }

    function closeHandler() {
      emit('hang-up')
      toggle(false)
    }

    function todoHandler() {
      emit('todo', props.options.todo)
      toggle(false)
    }

    expose({
      open() {
        toggle(true)
      },
      close() {
        toggle(false)
      },
      getConfig() {
        return toRaw(statusConfig)
      }
    })

    return {
      imgTodo,
      imgCall,
      imgClose,
      hoverHandler,
      closeHandler,
      todoHandler,
      visible,
      currentStatus,
      classList
    }
  }
})
</script>
