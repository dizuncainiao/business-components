<template>
  <div>
    <button class="extra-class" @click="changeSrcAndName">播放</button>
    <BcAudio
      ref="BcAudioRef"
      :src="src"
      :name="name"
      :showBtn="false"
      unCloseClass="extra-class"
      closeOnClickOutside
      showClose
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
  name.value = '测试'
  BcAudioRef.value.play()
}

</script>
