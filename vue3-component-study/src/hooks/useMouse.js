import { ref, onMounted, onUnmounted } from "vue";

// 事件添加删除使用hooks
import { useEventListener } from "./useEvent";

// 导出组合式函数-按照惯例，组合式函数名以 “use” 开头
export function useMouseTrack() {
  // 被组合式函数封装和管理的响应式状态
  const x = ref(0);
  const y = ref(0);

  // 更新状态函数
  // function update(event) {
  //   x.value = event.pageX;
  //   y.value = event.pageY;
  // }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上的
  // 启动和卸载副作用
  // onMounted(() => window.addEventListener("mousemove", update));
  // onUnmounted(() => window.removeEventListener("mousemove", update));

  // 使用hooks
  useEventListener(window, "mousemove", (event) => {
    x.value = event.pageX;
    y.value = event.pageY;
  });

  // 通过返回值暴露所管理的响应式状态
  return { x, y };
}
