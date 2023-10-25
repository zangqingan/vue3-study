<template>
  <div>
    <h1>我是编程式导航</h1>
    <div>下面是按钮点击跳转路由</div>
    <button @click="handleHome">跳转首页</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const handleHome = () => {
  console.log("back home");
  router.push("/");
};
</script>

<style lang="scss" scoped></style>
