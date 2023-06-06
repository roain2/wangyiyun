/// <reference types="vite/client" />

// 申明一下vue是个模块，ts可以导入
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
