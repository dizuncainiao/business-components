<template>
  <component :is="iconComponent" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BcIcon',
  props: {
    name: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const iconComponent = ref()

    import('blocks-next').then(module => {
      iconComponent.value = module[props.name ?? 'BnIconSetting']
    })

    return {
      iconComponent
    }
  }
})
</script>
