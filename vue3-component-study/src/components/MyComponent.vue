<template>
  <div>我是mycomponent组件我将使用双向数据绑定</div>
  <div>点击下方按钮修改双向绑定的标题</div>
  <div>标题：{{ title }}</div>
  <button @click="handleClick">修改</button>
  <br />
  <div>透传属性：{{ $attrs.name }}</div>
  <div>app透传的属性：{{ $attrs.flag }}</div>
  <hr />
  <div>下面是插槽渲染的内容</div>
  <slot></slot>
  <slot name="header" :count="10" :msg="customMsg"></slot>
  <slot name="content" flag="detail"></slot>
  <hr />
  <div>下面是依赖注入的值</div>
  <div>
    {{ helloText }}
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
const props = defineProps({
  title: {
    type: String,
  },
});
const emits = defineEmits(["update:title"]);
const handleClick = () => {
  console.log("修改");
  emits("update:title", "我是修改后的标题");
};

const customMsg = ref("子组件作用域的名字：张三");

// 响应式状态不会自动解包
const helloText = inject("hello");
console.log("helloText", helloText);
console.log("helloText", helloText.value);
</script>

<style lang="scss" scoped></style>
