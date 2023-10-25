<template>
  <div>
    <h3>我是鼠标追踪器组件，我可以实时知道当前鼠标在页面的位置</h3>
    <div>鼠标位置在：{{ x }}---{{ y }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
// 定义两个变量接收实时位置信息
const x = ref(0);
const y = ref(0);

// 定义一个函数实时获取当前位置信息
function update(event) {
  x.value = event.pageX;
  y.value = event.pageY;
}

// 组件挂载完成后、监听window上的鼠标移动事件
onMounted(() => window.addEventListener("mousemove", update));
// 组件卸载时去掉监听事件
onUnmounted(() => window.removeEventListener("mousemove", update));
</script>

<style lang="scss" scoped></style>
