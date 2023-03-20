<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
const handleClick = () => {
  isCollapse.value = !isCollapse.value
}
const isCollapse = ref(false)
</script>

<template>
  <el-header class="d-flex jc-between ai-center">
    <div class="d-flex ai-center">
      <el-icon
        class="pointer"
        @click="handleClick"
        ><IEpExpand v-if="isCollapse" /> <IEpFold v-else
      /></el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown class="pointer">
      <span class="el-dropdown-link d-flex jc-center ai-center">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style scoped lang="scss">
.el-header {
  width: 100%;
  height: 60px;
  color: #fff;
  background-color: #545c64;
  .el-icon {
    width: 60px;
    height: 60px;
    svg {
      width: 30px;
      height: 30px;
    }
  }
  :deep(.el-breadcrumb__inner) {
    color: #fff;
  }
  .el-icon--right {
    margin-left: -10px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
