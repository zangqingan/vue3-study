import { ref, isRef, unref, watchEffect } from "vue";

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);

  async function doFetch() {
    // 请求前重置值
    data.value = null;
    error.value = null;

    // unref() 解包可能为 ref 的值
    const urlValue = unref(url);

    try {
      // 人为地设置了延迟和随机报错
      await timeout();
      // unref() will return the ref value if it's a ref
      // otherwise the value will be returned as-is
      const res = await fetch(urlValue);
      console.log('res')
      data.value = await res.json();
    } catch (e) {
      error.value = e;
    }
  }

  if (isRef(url)) {
    // 若输入的 URL 是一个 ref，那么启动一个响应式的请求
    watchEffect(doFetch);
  } else {
    // 否则只请求一次,避免监听器的额外开销
    doFetch();
  }

  // 返回管理的响应式状态
  return { data, error, retry: doFetch };
}

// 人为地设置了延迟和随机报错
function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve();
      } else {
        reject(new Error("Random Error"));
      }
    }, 300);
  });
}
