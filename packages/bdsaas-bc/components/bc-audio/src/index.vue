<template>
  <div class="bc-audio-btn" :class="{ inline }" @click="play">
    <bn-button type="primary" v-if="showBtn && !isSlot" link>{{ btnName }}</bn-button>
    <slot name="default"></slot>
    <div class="audio-player-wrap">
      <div id="audioPlayer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useSlots } from 'vue'
import { Button, Message } from 'blocks-next'
import { AudioPlayer } from '../../../_plugins/a-player'
import 'aplayer/dist/APlayer.min.css'
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
    }
  },
  emits: ['afterPlay', 'afterError'],
  expose: ['play', 'destroy'],
  setup(props, { emit }) {

    const isSlot = !!useSlots().default

    let audioPlayer: any = null

    // 播放
    const play = () => {
      destroy()
      if (!props.src) {
        Message.warning('音频地址不能为空')
        return false
      }

      if (!props.name) {
        Message.warning('音频名称不能为空')
        return false
      }

      if (!audioPlayer) {
        audioPlayer = new AudioPlayer({
          container: document.getElementById('audioPlayer'),
          autoplay: true,
          loop: 'none',
          audio: [
            {
              name: props.name,
              url: props.src,
              artist: props.artist
            }
          ]
        })
      }

      audioPlayer.on('canplaythrough', () => {
        if (props.successMsg) {
          Message.success(props.successMsg)
        }
      })

      audioPlayer.on('ended', () => {
        emit('afterPlay')
        destroy()
      })

      // TODO: 播放失败情况暂不提示，不确定是否是本地跨域访问音频资源报错导致每次播放完毕都会报错
      audioPlayer.on('error', e => {
        emit('afterError')
        if (props.showErrorMsg) {
          Message.error(props.errorMsg)
        }
        destroy()
      })
    }

    // 销毁
    const destroy = () => {
      if (audioPlayer) {
        audioPlayer.destroy()
      }
      audioPlayer = null
    }

    return {
      play,
      destroy,
      isSlot
    }
  }
})
</script>
