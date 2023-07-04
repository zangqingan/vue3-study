<script setup>
// 引入 要双向数据绑定的组件
import MyComponent from "./MyComponent.vue";
import { ref, computed, provide, inject } from "vue";
// 定义props
const props = defineProps({
  msg: String,
  componentType: {
    type: String,
    default: "add",
    validator(value) {
      return ["add", "edit", "detail"].includes(value);
    },
  },
});

// 可以通过这个对象访问具体的prop
console.log(props.msg);
const normalizedSize = computed(() => props.msg.trim().toLocaleLowerCase());

// 定义emits
const emits = defineEmits(["submit"]);
const handleClick = () => {
  console.log("send");
  emits("submit", { name: "zhangsan", age: 27 });
};

const title = ref("我是父组件的标题");
const name = ref("我是父组件透传的属性");
const helloText = ref("hello word");

// 依赖注入
const result = inject("app");
provide("hello", helloText);
</script>

<template>
  <h3>{{ msg }}</h3>
  <div>组件类型是：{{ componentType }}</div>
  <div>计算属性基于props: {{ normalizedSize }}</div>
  <hr />
  <div>点击下方按钮发送数据给父组件</div>
  <button @click="handleClick">发送</button>
  <hr />
  <div>下面是子组件</div>
  <div>父组件title：{{ title }}</div>
  <hr />
  <div>下面是依赖注入的值</div>
  <div>{{ result }}</div>
  <hr />
  <MyComponent v-bind="$attrs" v-model:title="title" :name="name">
    <div>我是插槽内容</div>
    <template v-slot:header="headerProps">
      <div>
        <div>我是header插槽的内容</div>
        {{ headerProps }}
      </div>
    </template>
    <template #content="{ flag }">
      <div>我是content插槽的内容，我使用了v-slot语法糖 #</div>
      <div>使用解构读取slot props：{{ flag }}</div>
    </template>
  </MyComponent>
</template>

<style scoped></style>
