import { AudioPlayer } from '../../../../_plugins/a-player'
import 'aplayer/dist/APlayer.min.css'
import { Message } from 'blocks-next'
let audioPlayer: any = null

function initHtml() {
  if (!document.getElementById('audioPlayer')) {
    document.body.insertAdjacentHTML('beforeend', '<div class="audio-player-wrap"><div id="audioPlayer"></div></div>')
  }
}

export function audioDestory() {
  if (audioPlayer) {
    audioPlayer.destroy()
    audioPlayer = null
  }
}

export function audioPlay(props: any, emit: any) {
  initHtml()
  if (audioPlayer) {
    audioPlayer.list.clear()
    audioPlayer.list.add({
      name: props.name,
      url: props.src,
      artist: props.artist
    })
    audioPlayer.play()
    return false
  }
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
    audioDestory()
  })

  // TODO: 播放失败情况暂不提示，不确定是否是本地跨域访问音频资源报错导致每次播放完毕都会报错
  audioPlayer.on('error', () => {
    emit('afterError')
    if (props.showErrorMsg) {
      Message.error(props.errorMsg)
    }
    audioDestory()
  })
}

