<template>
  <div>
    <button @click="changeSrcAndName">change</button>
    <BcAudio
      ref="BcAudioRef"
      :src="src"
      :name="name"
      :showBtn="false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BcAudio } from 'bdsaas-bc'

defineOptions({
  name: 'AudioPlayDemo'
})
const BcAudioRef = ref()
const src = ref('')
const name = ref('')

const changeSrcAndName = () => {
  src.value = 'https://demo.bdsaas.cn/call_record/2023/07/06/1564/bf1b017f37d8495d8f824e57949d4fa8..wav'
  name.value = '金卡跨境电商看见你电脑开机啊苏卡达缴纳卡机奶萨到哪科技'
  BcAudioRef.value.play()
}

</script>
