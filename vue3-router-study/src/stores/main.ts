import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  // 先定义一个最基本的 message 数据
  state: () => ({
    message: 'Hello World'
  })
})
