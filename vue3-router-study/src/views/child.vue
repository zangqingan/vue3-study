<template>
  <div class="child-content">
    <div>{{ title }}</div>
    <div>{{ id }}</div>
    <div>{{ name }}</div>
    <br />
    <el-button
      type="primary"
      @click="handleAdd"
      >子传父+</el-button
    >
    <el-button
      type="primary"
      @click="handleReduce"
      >子传父-</el-button
    >
  </div>
</template>

<script setup lang="ts">
// 运行时声明要接收的props
// const props = defineProps({
//   title: {
//     type: String,
//     default: ''
//   }
// })
// 基于类型的声明,声明要接收的props
interface Props {
  title?: string
  id?: number
  name?: string
}
// defineProps<Props>()
withDefaults(defineProps<Props>(), {
  title: '子组件默认标题'
})

const handleAdd = () => {
  emit('update-age', 10)
}
const handleReduce = () => {
  emit('reduce-age', 20)
}

// 运行时声明要发射的事件-数组格式
// const emit = defineEmits(['update-age', 'reduce-age'])

// 运行时声明要发射的事件-对象格式-可验证
// const emit = defineEmits({
//   // 通过返回值为 `true` 还是为 `false` 来判断验证是否通过
//   // 需要校验
//   'update-age': (age: number) => {
//     // 写一些条件拦截，返回 `false` 表示验证不通过
//     if (age < 18) {
//       console.log('未成年人不允许参与')
//       return false
//     }
//     // 通过则返回 `true`
//     return true
//   },

//   // 一些无需校验的，设置为 `null` 即可
//   'reduce-age': null
// })

// 基于类型的声明,声明要发射的事件
const emit = defineEmits<{
  (e: 'update-age', value: number): void
  (e: 'reduce-age', value: number): void
}>()
</script>

<style lang="scss" scoped>
.child-content {
  border: 1px solid salmon;
  width: 200px;
  height: 200px;
}
</style>
