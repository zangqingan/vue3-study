<script setup>
import { ref, computed, provide } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import MouseTrack from "./components/MouseTrack.vue";
import { useMouseTrack } from "./hooks/useMouse.js";
import { useFetch } from "./hooks/useFetch.js";
// 监听子组件发射事件
const dataList = ref({});
const handleSubmit = (payload) => {
  console.log("payload", payload);
  dataList.value = payload;
};

// 依赖注入
provide("app", "app组件依赖注入的值");

// hooks
const { x, y } = useMouseTrack();

const baseUrl = "https://www.kuaikanmanhua.com/v2/pweb/daily/topics?pos=";
const pos = ref(1);
const url = computed(() => baseUrl + pos.value);

const { data, error, retry } = useFetch(url);

const show = ref(true);
</script>

<template>
  <div>
    <div>
      Load post id:
      <button v-for="i in 6" @click="pos = i">{{ i }}</button>
      <div v-if="error">
        <p>Oops! Error encountered: {{ error.message }}</p>
        <button @click="retry">Retry</button>
      </div>
      <div v-else-if="data">
        Data loaded:
        <pre>{{ data }}</pre>
      </div>
      <div v-else>Loading...</div>
    </div>
    <h3>我是父组件的内容</h3>
    <div>
      我是子组件传递出来的数据：姓名---{{ dataList.name }}---年龄{{
        dataList.age
      }}
    </div>
  </div>
  <hr />
  <h3>下面是使用组件形式获取的鼠标位置信息</h3>
  <MouseTrack></MouseTrack>
  <br />
  <h3>下面是通过组合式函数的形式获取的鼠标位置</h3>
  <div>鼠标位置是：{{ x }} ---{{ y }}</div>
  <hr />
  <HelloWorld
    msg="Vite + Vue"
    component-type="detail"
    flag="haha"
    @submit="handleSubmit"
  />
  <hr />
  <div>下面是内置组件</div>
  <button @click="show = !show">Toggle</button>
  <Transition>
    <p v-if="show">hello</p>
  </Transition>
</template>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
