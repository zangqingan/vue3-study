// 引入定义仓库方法
import { defineStore } from 'pinia'
// 导出定义的仓库
export const useUserStore = defineStore('userStore', {
  state: () => {
    return { a: 10, msg: 'hello pinia', id: 20 }
  },
  getters: {
    double: state => state.a * 2,
    sum(): number {
      return this.double + 2
    }
  },
  actions: {
    increment() {
      this.a++
    },
    // 异步更新 msg
    async updateMessage(newMessage: string): Promise<string> {
      return new Promise(resolve => {
        setTimeout(() => {
          // 这里的 this 是当前的 Store 实例
          this.msg = newMessage
          resolve('Async done.')
        }, 3000)
      })
    },
    // 同步更新 msg
    updateMessageSync(newMessage: string): string {
      // 这里的 this 是当前的 Store 实例
      this.msg = newMessage
      return 'Sync done.'
    }
  }
})
