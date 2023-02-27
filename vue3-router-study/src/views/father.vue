<template>
  <div class="box d-flex jc-around">
    <div>我是父组件中的年龄通过子组件改变:{{ userInfo.age }}</div>
    <Child
      title="父组件传递的普通字符串"
      :id="userInfo.id"
      :name="userInfo.name"
      @update-age="handleUpdate"
      @reduce-age="handleReduce"></Child>
    <ModelChild
      v-model="searchText"
      v-model:id="userInfo.id"
      v-model:name="userInfo.name"
      v-model:age="userInfo.age"></ModelChild>
  </div>
</template>

<script setup lang="ts">
import Child from './child.vue'
import ModelChild from './modelChild.vue'

interface Member {
  id: number
  age: number
  name: string
}

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
