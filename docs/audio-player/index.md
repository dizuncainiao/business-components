# 八度前端业务组件bc-audio

## API

### Props

| 属性名称 | 类型 | 是否必传 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| src | String | 必传 | '' | 音频地址 |
| name | String | 必传 | '' | 音频名称 |
| artist | String | 非必传 | 数企 | 音频作者 |
| successMsg | String | 非必传 | ‘’ | 播放成功提示 |
| errorMsg | String | 非必传 | '资源播放失败，请稍后重试' | 播放失败提示 |
| showBtn | Boolean | 非必传 | true | 是否显示按钮 |
| btnName | String | 非必传 | '播放' | 按钮名称 |
| showErrorMsg | Boolean | 非必传 | false | 是否显示错误提示 |
| inline  | Boolean | 非必传 | false | 是否行内块 |
| showClose | Boolean | 非必传 | false | 是否显示关闭按钮 |
| closeOnClickOutSide | Boolean | 非必传 | false | 是否允许点击其他区域关闭播放器 |
| unCloseClass | String | 非必传 | 'un-close-class' | 点击后不关闭播放器的class |

> 说明unCloseClass: 点击后不关闭播放器的class，当点击的元素有此class时，不关闭播放器。处理的是使用ref调用播放器方法时会使用自定义按钮，此按钮并不在播放器或播放器组件范围内，当closeOnClickOutSide为true时，点击此按钮会关闭播放器，此时可以使用此class来阻止关闭播放器。不传的时候直接在元素上添加这个'un-close-class'即可。

### Methods

| 方法名称 | 描述 |
| --- | --- |
| play() | 播放 |
| destory() | 销毁 |

### Events

| 事件名称 | 描述 |
| --- | --- |
| afterPlay | 播放完成后回调 |
| afterError | 播放错误后回调 |

### Slots

| 插槽名称 | 插槽描述 |
| --- | --- |
| default | 自定义按钮 |

## 使用示例

```html
<template>
  <div>
    <BcAudio ref="BcAudioRef" src="https://demo.bdsaas.cn/call_record/2023/07/06/1564/bf1b017f37d8495d8f824e57949d4fa8..wav" name="测试录音" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { BcAudio } from 'bdsaas-bc'

defineComponent({
  name: 'BcAudioDemo'
})

</script>
```

<!-- ## 预览

<script setup lang="ts">

import { BcAudio } from 'bdsaas-bc'

</script>


<BcAudio ref="BcAudioRef" src="https://demo.bdsaas.cn/call_record/2023/07/06/1564/bf1b017f37d8495d8f824e57949d4fa8..wav" name="测试录音" /> -->
