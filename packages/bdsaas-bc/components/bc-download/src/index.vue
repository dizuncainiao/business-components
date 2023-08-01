<template>
  <div class="bc-download-btn" :class="{ inline }" @click="download">
    <BnButton v-if="showBtn && !isSlot" type="primary" link>{{ btnName }}</BnButton>
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, useSlots } from 'vue'
import { Button, Message } from 'blocks-next'
import { last } from 'lodash-es'

export default defineComponent({
  name: 'BcDownload',
  components: {
    BnButton: Button
  },
  props: {
    action: {
      // 下载地址
      type: String,
      default: '',
      required: true
    },
    fileName: {
      // 下载文件名称
      type: String,
      default: ''
    },
    isBlob: {
      // 是否是二进制流
      type: Boolean,
      default: false
    },
    params: {
      // 下载参数
      type: Object,
      default: () => ({})
    },
    headers: {
      // 下载请求头
      type: Object,
      default: () => ({})
    },
    showBtn: {
      // 是否显示按钮
      type: Boolean,
      default: true
    },
    btnName: {
      // 按钮名称
      type: String,
      default: '下载'
    },
    inline: {
      // 是否行内元素
      type: Boolean,
      default: false
    }
  },
  emits: ['afterDownload'], // 下载完成后触发
  expose: ['download'], // 暴露方法
  setup(props, { emit }) {
    const isSlot = !!useSlots().default

    // 下载
    const download = () => {
      const params = Object.keys(props.params)
        .map((key) => `${key}=${props.params[key]}`)
        .join('&')
      const url = `${props.action}${params ? `?${params}` : ''}`
      if (props.isBlob) {
        // 二进制流下载
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.responseType = 'blob'
        if (Object.keys(props.headers).length) {
          Object.keys(props.headers).forEach((key) => {
            xhr.setRequestHeader(key, props.headers[key])
          })
        }
        xhr.onload = () => {
          try {
            if (xhr.status === 200 && xhr.readyState === 4) {
              // 下载成功
              const blob = xhr.response
              const fileName = props.fileName || last(xhr.getResponseHeader('Content-Disposition')?.split('filename=')) || 'template.xlsx'
              const a = document.createElement('a')
              a.href = window.URL.createObjectURL(blob)
              a.href = url
              a.download = decodeURI(fileName)
              a.click()
              window.URL.revokeObjectURL(url)
              emit('afterDownload')
            } else {
              // 下载失败
              Message.error('下载失败，请稍后重试')
            }
          } catch (error) {
            // 控制台打印异常
            console.error(error)
            // 下载异常
            Message.error('下载失败，请稍后重试')
          }
        }
        xhr.send()
      } else {
        // 普通下载
        const a = document.createElement('a')
        a.href = url
        if (props.fileName) {
          a.download = props.fileName
        }
        a.click()
        emit('afterDownload')
      }
    }

    return {
      download,
      isSlot
    }
  }
})
</script>

<style lang="less" scoped>
.bc-download-btn {
  &.inline {
    display: inline-block;
  }
}
</style>
