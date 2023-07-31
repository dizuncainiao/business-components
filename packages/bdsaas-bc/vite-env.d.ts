/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 解决：无法解析模块 'aplayer' 的定义 问题
declare module 'aplayer' {
  const APlayer: any
  export default APlayer
}
