<template>
  <div class="bc-audio-btn" :class="{ inline }" @click="play">
    <bn-button type="primary" v-if="showBtn && !isSlot" link>{{ btnName }}</bn-button>
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, useSlots } from 'vue'
import { Button } from 'blocks-next'
import { audioPlay, audioDestory } from './hooks/player'
import '../style/index.less'

export default defineComponent({
  name: 'BcAudio',
  components: {
    BnButton: Button
  },
  props: {
    src: {
      // 音频地址
      type: String,
      default: '',
      required: true
    },
    name: {
      // 音频名称
      type: String,
      default: '',
      required: true
    },
    artist: {
      // 音频作者
      type: String,
      default: '数企'
    },
    successMsg: {
      // 播放成功提示
      type: String,
      default: ''
    },
    errorMsg: {
      // 播放失败提示
      type: String,
      default: '资源播放失败，请稍后重试'
    },
    showBtn: {
      // 是否显示按钮
      type: Boolean,
      default: true
    },
    btnName: {
      // 按钮名称
      type: String,
      default: '播放'
    },
    showErrorMsg: {
      // 是否显示错误提示
      type: Boolean,
      default: false
    },
    inline: {
      // 是否行内展示
      type: Boolean,
      default: false
    },
    // 属于播放区域的额外类名
    unCloseClass: {
      // 额外类名
      type: String,
      default: 'un-close-class'
    },
    // 显示关闭按钮
    showClose: {
      type: Boolean,
      default: false
    },
    // 点击区域外关闭
    closeOnClickOutside: {
      type: Boolean,
      default: false
    }
  },
  emits: ['afterPlay', 'afterError'],
  expose: ['play', 'destroy', ],
  setup(props, { emit }) {

    const isSlot = !!useSlots().default

    const play = () => {
      nextTick(() => {
        audioPlay(props, emit)
      })
    }

    const destroy = () => {
      audioDestory()
    }

    return {
      play,
      destroy,
      isSlot
    }
  }
})
</script>
