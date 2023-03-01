import type { App } from 'vue'

interface Options {
  greetings: {
    hello: string
  }
}
export default {
  install: (app: App, options: Options) => {
    // 注入一个全局可用的 $translate() 方法
    app.config.globalProperties.$translate = (key: any) => {
      // 获取 `options` 对象的深层属性
      // 使用 `key` 作为索引
      return key.split('.').reduce((o: any, i: any) => {
        if (o) return o[i]
      }, options)
    }
  }
}
