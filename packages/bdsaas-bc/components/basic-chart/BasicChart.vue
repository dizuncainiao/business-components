<template>
  <VChart :option="$props.options" autoresize />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import VChart from 'vue-echarts'

export default defineComponent({
  name: 'BasicChart',
  components: { VChart },
  props: {
    options: {
      type: Object as PropType<any>,
      required: true
    }
  },
  setup() {}
})
</script>
