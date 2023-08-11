<template>
 <div class="self-d">
  <div>
    自定义指令
  </div>
  <h3>v-inputNumber</h3>
  <el-input v-model="inputValue1" v-inputNumber />
  <el-input v-model="inputValue2" v-inputNumber="{ decimal: 3 }" />
 </div>
 
 
</template>
 
<script setup>
const inputValue1 = ref()
const inputValue2 = ref()
 
 
</script>
 
<style lang="scss" scoped>
.self-d {
  background-color: #fff;
}
</style>
