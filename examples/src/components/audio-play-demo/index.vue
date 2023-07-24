<template>
  <div>
    <BcAudio ref="BcAudioRef" src="https://demo.bdsaas.cn/call_record/2023/07/06/1564/bf1b017f37d8495d8f824e57949d4fa8..wav" name="测试录音" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { BcAudio } from 'bdsaas-bc'

defineComponent({
  name: 'BcAudioDemo'
})

</script>
