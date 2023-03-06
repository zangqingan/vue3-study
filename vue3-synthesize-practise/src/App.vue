<template>
  <el-config-provider :locale="zhCn">
    <el-button type="primary">点击</el-button>
    <div class="box bg-light d-flex text-white jc-center">
      <div class="item bg-primary mr-1 text-warning border-t">盒子1</div>
      <div class="item bg-info mx-1 fs-lg">盒子2</div>
      <div class="item bg-warning mx-1 px-1 text-center">盒子3</div>
      <div class="item bg-success mx-1 text-black">盒子4</div>
      <div class="item bg-danger ml-1 pr-2 text-right">盒子5</div>
    </div>
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { getTest } from '@/api/index'
onMounted(async () => {
  const res = await getTest()
  console.log('res', res)
})
</script>

<style lang="scss" scoped>
.box {
  width: 1000px;
}
.item {
  width: 100px;
  height: 100px;
}
</style>
