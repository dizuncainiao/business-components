import { AudioPlayer } from '../../../../_plugins/a-player'
import { Message } from 'blocks-next'
let audioPlayer: any = null

function initHtml() {
  if (!document.getElementById('audioPlayer')) {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="audio-player-wrap"><div id="audioPlayer"></div><div class="audio-player-close hide"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">  <image id="image0" width="48" height="48" x="0" y="0"
    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAIGNIUk0AAHomAACAhAAA+gAAAIDo
AAB1MAAA6mAAADqYAAAXcJy6UTwAAAAnUExURQAAADY8QDc9QTY8Qjc9QDc9QzY8QDc9QT09PTk5
RzU6QDc9Qf///0QN3EUAAAALdFJOUwB/31WqKoDUFRIwWd4eaAAAAAFiS0dEDIGzUWMAAAAHdElN
RQfoAhcDGDbOKryQAAAAmElEQVQ4y+3RMQqAMAwF0IItiJN4DRd3F/cubq69hKC4eCURdejlrJIW
0v7F3UyBz0PzK8Q/H6dq/CY7FtS73/TBgtYSkdawILNE9Bl9hEgMAkkAkRQQ0Rs4xRFpSxA4AsFD
IHgIBu6Xrh4G+lxGDMwAiTtaIfIejcjbEiDUUkqo1oSEWmMS3kEtEw+M34aZBUXY8lX883FulZsv
qoOCPNsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDItMjNUMDM6MjQ6NTMrMDA6MDBMOLa6AAAA
JXRFWHRkYXRlOm1vZGlmeQAyMDI0LTAyLTIzVDAzOjI0OjUzKzAwOjAwPWUOBgAAACh0RVh0ZGF0
ZTp0aW1lc3RhbXAAMjAyNC0wMi0yM1QwMzoyNDo1NCswMDowMK/XEVcAAAAASUVORK5CYII=" />
</svg></div></div>`
    )
  }
}

export function audioDestory() {
  if (audioPlayer) {
    audioPlayer.destroy()
    audioPlayer = null
    const element = document.getElementById('audioPlayer')?.nextElementSibling
    element?.classList.add('hide')
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

  // 点击按钮audio-player-close关闭音频播放器
  const audioPlayerClose =
    document.getElementById('audioPlayer')?.nextElementSibling
  // 移除hide类名
  if (props.showClose) {
    audioPlayerClose?.classList.remove('hide')
  }
  // 先移除事件，再添加事件，避免重复绑定
  audioPlayerClose?.removeEventListener('click', () => {
    console.log('移除事件')
    audioDestory()
  })
  audioPlayerClose?.addEventListener('click', () => {
    console.log('关闭音频播放器')
    audioDestory()
  })

  // 点击其他区域关闭音频播放器
  // 先移除事件，再添加事件，避免重复绑定
  document.removeEventListener('click', () => {
    console.log('移除事件')
  })

  if (props.closeOnClickOutside) {
    // 点击其他区域关闭音频播放器
    document.addEventListener('click', e => {
      // #audioPlayer .audio-player-close .bc-audio-btn 以及传入的prop.unCloseClass都不会关闭音频播放器
      if (
        !document.getElementById('audioPlayer')?.contains(e.target as Node) &&
        !audioPlayerClose?.contains(e.target as Node) &&
        !document.querySelector('.bc-audio-btn')?.contains(e.target as Node) &&
        !document
          .querySelector('.' + props.unCloseClass)
          ?.contains(e.target as Node)
      ) {
        console.log('关闭音频播放器')
        audioDestory()
      }
    })
  }
}

