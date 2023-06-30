import { ref } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

export default {
  setup() {
    const message = ref("Hello Vue! 111222");
    return { count: 0, message };
  },
};
