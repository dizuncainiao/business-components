# 八度前端业务组件bc-download

## API

### Props

| 属性名称     | 类型      | 是否必传 | 默认值   | 描述      |
|----------|---------| --- |-------|---------|
| action   | String  | 必传 | ''    | 下载地址    |
| fileName | String  | 非必传 | ''    | 下载文件名称  |
| isBlob   | Boolean | 非必传 | false | 是否是二进制流 |
| params   | Object  | 非必传 | {}    | 下载参数    |
| headers  | Object  | 非必传 | {}    | 下载请求头   |
| showBtn  | Boolean | 非必传 | true  | 是否显示按钮  |
| btnName  | String  | 非必传 | '下载'  | 按钮名称    |
| inline   | Boolean | 非必传 | false | 是否行内块   |

### Methods

| 方法名称 | 描述 |
| --- | --- |
| download() | 下载 |

### Events

| 事件名称 | 描述 |
| --- | --- |
| afterDownload | 下载完成后回调 |

### Slots

| 插槽名称 | 插槽描述 |
| --- | --- |
| default | 自定义按钮 |

## 使用示例

```vue
<template>
  <div>
    <BcDownload ref="BcDownloadDemo" action="https://demo.bdsaas.cn/call_record/2023/07/06/1564/bf1b017f37d8495d8f824e57949d4fa8..wav" file-name="测试下载录音" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { BcDownload } from 'bdsaas-bc'

defineComponent({
  name: 'BcDownloadDemo'
})

</script>
```

[//]: # (## 预览)

[//]: # ()
[//]: # ()
[//]: # (<script setup lang="ts">)

[//]: # ()
[//]: # (import { BcDownload } from 'bdsaas-bc';)

[//]: # ()
[//]: # (</script>)

[//]: # ()
[//]: # ()
[//]: # (<BcDownload ref="BcDownloadDemo" action="https://demo.bdsaas.cn/call_record/2023/07/06/1564/bf1b017f37d8495d8f824e57949d4fa8..wav" file-name="测试下载录音" btn-name="测试下载按钮自定义名称" />)
