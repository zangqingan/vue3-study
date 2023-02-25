<script setup lang="ts">
import { RouterView } from "vue-router"
const handleClick = () => {
  ElMessageBox.alert("This is a message", "Title", {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: "OK",
    callback: (action: Action) => {
      ElMessage({
        type: "info",
        message: `action: ${action}`
      })
    }
  })
}
</script>

<template>
  <el-button type="primary" @click="handleClick">按需导入按钮</el-button>
  <RouterView />
</template>

<style scoped></style>
