<script setup lang="ts">
import BcChartConfigModalDemo from '@/components/chart-config-modal-demo/BcChartConfigModalDemo.vue'
import DialBarDemo from '@/components/dial-bar-demo/DialBarDemo.vue'
import BcAudioDemo from '@/components/audio-play-demo/index.vue'
</script>

<template>
  <bc-chart-config-modal-demo />
  <dial-bar-demo />
  <BcAudioDemo />
</template>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
