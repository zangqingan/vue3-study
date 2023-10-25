<script setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const locale = ref(zhCn);
const zIndex = ref(2101);
const size = ref("default");
</script>

<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
