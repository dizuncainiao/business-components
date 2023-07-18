---
BI Chart Advanced Use
---

# 源码共建

我们正在寻找志同道合的开发者，一起为开源社区做出贡献。如果你对我们的项目感兴趣，欢迎你加入我们的团队，一起创造更多的精彩！

<script>
import {component as Viewer} from 'v-viewer'
import { withBase, useData } from 'vitepress'

export default {
    components: {
      Viewer,
    },
    data() {
      return {
        images: [
          withBase('../step-1.png'),
          withBase('../step-2.png'),
          withBase('../step-3.png'),
          withBase('../step-4.png'),
          withBase('../step-5.png'),
          withBase('../step-6.png'),
          withBase('../step-7.png'),
          withBase('../step-8.png'),
          withBase('../step-9.png'),
          withBase('../step-10.png'),
        ]
      };
    },
    methods: {
      inited (viewer) {
        this.$viewer = viewer
      },
      show () {
        this.$viewer.show()
      }
    }
  }
</script>

## 步骤

<div>
  <viewer
    :options="options"
    :images="images"
    @inited="inited"
    class="viewer"
    ref="viewer"
  >
    <template #default="scope">
      <img v-for="src in scope.images" :src="src" :key="src">
    </template>
  </viewer>

[//]: # '  <button type="button" @click="show">Show</button>'

</div>

<style>
.viewer img {
  display: block;
  margin-bottom: 20px;
  cursor: zoom-in;
}
</style>
