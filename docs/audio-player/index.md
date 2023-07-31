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

[//]: # (## 预览)

[//]: # (<script setup lang="ts">)

[//]: # (import { BcAudio } from 'bdsaas-bc')

[//]: # (</script>)

[//]: # ()
[//]: # (<BcAudio ref="BcAudioRef" src="https://demo.bdsaas.cn/call_record/2023/07/06/1564/bf1b017f37d8495d8f824e57949d4fa8..wav" name="测试录音" />)
