<template>
  <div class="box d-flex jc-around">
    <div>我是父组件中的年龄通过子组件改变:{{ userInfo.age }}</div>
    <Child
      title="父组件传递的普通字符串"
      :id="userInfo.id"
      :name="userInfo.name"
      @update-age="handleUpdate"
      @reduce-age="handleReduce"></Child>
    <div>我是父组件中的定义的输入框字体通过子组件改变:{{ searchText }}</div>
    <ModelChild
      v-model="searchText"
      v-model:id="userInfo.id"
      v-model:name="userInfo.name"
      v-model:age="userInfo.age"></ModelChild>
    <br />
    <div>我是pinia传递的数据：{{ piniaMsg }}</div>
  </div>
</template>

<script setup lang="ts">
import Child from './child.vue'
import ModelChild from './modelChild.vue'

// 引入pinia
import { useUserStore } from '@/stores'
const indexStore = useUserStore()
console.log('indexStore', indexStore)
console.log('indexStore', indexStore.a)
console.log('indexStore', indexStore.msg)
console.log('indexStore', indexStore.double)
console.log('indexStore', indexStore.sum)
// 计算属性接受
const piniaMsg = computed(() => indexStore.msg)
interface Member {
  id: number
  age: number
  name: string
}
// actions执行
// 立即执行
console.log(indexStore.updateMessageSync('New message by sync.'))

// 3s 后执行
indexStore.updateMessage('New message by async.').then(res => console.log(res))

const userInfo: Member = reactive({
  id: 1,
  age: 28,
  name: '我是父组件中定义的名字'
})
const searchText = ref('夫')
const handleUpdate = (newAge: number) => {
  userInfo.age += newAge
}

const handleReduce = (newAge: number) => {
  userInfo.age -= newAge
}
// 声明一个响应性变量并 provide 其自身
// 孙组件获取后可以保持响应性
const msg = ref('Hello World!')
provide('msg', msg)
// 只 provide 响应式变量的值
// 孙组件获取后只会得到当前的值
provide('msgValue', msg.value)

// 声明一个方法并 provide
function printMsg() {
  console.log(msg.value)
}
provide('printMsg', printMsg)

const location = ref('North Pole')
provide('location', location)
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid #333;
  width: 1500px;
  height: 900px;
  margin-left: 500px;
  padding: 30px;
}
</style>
