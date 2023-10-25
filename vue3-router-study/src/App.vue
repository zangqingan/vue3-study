<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app-content">
    <router-link class="link" to="/">首页</router-link>
    <router-link class="link" to="/about/zhangsan">动态路由</router-link>
    <router-link class="link" to="/program">编程式导航</router-link>
    <router-link
      class="link"
      :to="{ name: 'nameProp', query: { username: 'nameProp' } }"
      >命名路由</router-link
    >
    <router-link class="link" to="/guide">导航守卫</router-link>
  </div>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <RouterView />
</template>

<style scoped>
.app-content {
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: aliceblue;
  font-size: 20px;
  line-height: 70px;
}
.link {
  padding: 0 20px;
  height: 100%;
}
</style>
