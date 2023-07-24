<template>
  <div class="bc-audio-btn" @click="play">
    <bn-button type="primary" link>{{ btnName }}</bn-button>
    <div class="audio-player-wrap">
      <div id="audioPlayer"></div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { Button, Message } from 'blocks-next'
import AudioPlayer from 'aplayer'
import 'aplayer/dist/APlayer.min.css'

export default defineComponent({
  name: 'BcAudio',
  components: {
    BnButton: Button
  },
  props: {
    src: { // 音频地址
      type: String,
      default: '',
      required: true
    },
    name: { // 音频名称
      type: String,
      default: '',
      required: true
    },
    artist: { // 音频作者
      type: String,
      default: '数企'
    },
    successMsg: { // 播放成功提示
      type: String,
      default: ''
    },
    errorMsg: { // 播放失败提示
      type: String,
      default: '资源播放失败，请稍后重试'
    },
    styleType: { // 样式风格
      type: String,
      default: 'light' // light: 浅色风格，dark: 深色风格
    },
    showBtn: { // 是否显示按钮
      type: Boolean,
      default: true
    },
    btnName: { // 按钮名称
      type: String,
      default: '播放'
    },
    showErrorMsg: { // 是否显示错误提示
      type: Boolean,
      default: false
    }
  },
  emits: ['afterPlay', 'afterError'],
  expose: ['play', 'destroy'],
  setup(props, { emit }) {
    let audioPlayer: any = null

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
              artist: props.artist,
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
      audioPlayer.on('error', (e) => {
        emit('afterError')
        if (props.showErrorMsg) {
          Message.error(props.errorMsg)
        }
        destroy()
      })
    }

    const destroy = () => {
      if (audioPlayer) {
        audioPlayer.destroy()
      }
      audioPlayer = null
    }
    
    return {
      play,
      destroy
    }
  }
})
</script>

<style lang="less">
@import "../style/index.less";
</style>