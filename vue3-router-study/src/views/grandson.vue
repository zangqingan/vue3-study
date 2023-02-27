<template>
  <div class="content">
    <div>这是孙子组件</div>
    <div>我是依赖注入的ref {{ msg }}</div>
    <div>我是依赖注入ref解包后的值 {{ msgValue }}</div>
    <el-button
      type="primary"
      @click="handClick"
      >点击我打印msg</el-button
    >
    <br />
  </div>
</template>

<script setup lang="ts">
const handClick = () => {
  const printMsg = inject<() => void>('printMsg')
  if (typeof printMsg === 'function') {
    printMsg()
  }
}
// 依赖注入获取响应式变量
const msg = inject<Ref<string>>('msg')
// 依赖注入获取普通的字符串
const msgValue = inject<string>('msgValue')
</script>

<style lang="scss" scoped>
.content {
  border: 1px solid gold;
  margin-left: 20px;
  margin-top: 10px;
}
</style>
