<script setup>
// 使用全局注入
const modal = inject("modal");
const other = inject("other");
const handleClick1 = () => {
  modal.msg("我是饿了么UI的弹窗-但是我经过了封装-是通过全局注入的方式使用的");
};
const handleClick2 = () => {
  modal.successMsg("我是全局注入的成功状态的消息提示");
  other.sayHi();
};
const value1 = ref("");
</script>

<template>
  <div>
    <h3>我是首页</h3>
    <el-button @click="handleClick1">我是 ElButton1</el-button>
    <el-button @click="handleClick2">我是 ElButton2</el-button>
    <hr />
    <div>下面是日期选择组件</div>
    <el-date-picker v-model="value1" type="date" placeholder="请选择日期" />
  </div>
</template>
