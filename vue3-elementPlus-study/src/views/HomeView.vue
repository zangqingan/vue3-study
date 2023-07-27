<script setup>
const isCollapse = ref(false);
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-menu
        active-text-color="#ffd04b"
        router
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        default-active="2"
        text-color="#fff"
      >
        <el-menu-item index="myTable-study">
          <el-icon>1</el-icon>
          <span>表格组件</span>
        </el-menu-item>
        <el-menu-item index="myForm-study">
          <el-icon>2</el-icon>
          <span>表单组件</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon>3</el-icon>
          <span>弹窗组件</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon>4</el-icon>
          <span>其它组件</span>
        </el-menu-item>
        <el-menu-item index="/lodash-study">
          <el-icon>5</el-icon>
          <span>lodash工具库使用</span>
        </el-menu-item>
      </el-menu>
      <el-container>
        <el-header>
          <div class="collapse">
            <el-button @click="handleCollapse">
              <el-icon>
                <i-ep-expand v-if="isCollapse" />
                <i-ep-fold v-else />
              </el-icon>
            </el-button>
          </div>
        </el-header>
        <el-main class="app-main"><RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
}
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #7c8187;
}
.el-menu {
  height: 100%;
  border-right: 0;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.collapse {
  height: 100%;
  display: flex;
  align-items: center;
  :deep(.el-icon) {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  :deep(.el-icon svg) {
    width: 2em;
    height: 2em;
  }
}
.app-main {
  background-color: #f1f3f5;
}
</style>
