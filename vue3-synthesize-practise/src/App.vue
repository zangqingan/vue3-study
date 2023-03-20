<template>
  <el-config-provider :locale="zhCn">
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

<style lang="scss" scoped></style>
