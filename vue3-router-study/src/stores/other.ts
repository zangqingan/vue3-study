import { defineStore } from 'pinia'

export const useOtherStore = defineStore('other', {
  // 先定义一个最基本的 message 数据
  state: () => ({
    message: 'Hello World'
  })
})
