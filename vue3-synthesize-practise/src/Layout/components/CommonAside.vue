<script setup lang="ts">
import { Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-aside width="200px">
    <div class="head-title">青安后台管理系统</div>
    <el-scrollbar>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        active-text-color="#ffd04b"
        background-color="#545c64"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose">
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span class="menu-title">Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><setting /></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped lang="scss">
.el-aside {
  height: 100%;
  width: auto;
  background-color: #545c64;
  color: #fff;
  :deep(.el-icon) {
    color: #fff;
  }
}
.head-title {
  text-align: center;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
}
.el-menu {
  background-color: #545c64;
  border-right: none;
  .el-menu-item {
    color: #fff;
  }
  .menu-title {
    color: #fff;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-scrollbar {
  height: auto;
}
</style>
