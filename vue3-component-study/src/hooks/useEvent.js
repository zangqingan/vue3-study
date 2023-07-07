import { onMounted, onBeforeUnmount } from "vue";
export function useEventListener(target, event, callback) {
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback));
  onBeforeUnmount(() => target.removeEventListener(event, callback));
}
