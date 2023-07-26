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
