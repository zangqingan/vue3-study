// 引入子组件
import ChildComponent from "./myComponent.js";
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  onMounted,
} from "https://unpkg.com/vue@3.3.4/dist/vue.esm-browser.prod.js";

export default {
  // 注册子组件
  components: {
    ChildComponent,
  },
  // `setup` 是一个专门用于组合式 API 的特殊钩子函数，当不使用构建工具时就要使用它
  // 在 setup() 函数中手动暴露大量的状态和方法显然非常繁琐。幸运的是，在vue3.2之后我们可以通过使用构建工具来简化该操作。
  // 当使用单文件组件（SFC）时，我们可以使用 setup语法糖 <script setup> 来大幅度地简化代码。
  setup() {
    const author = reactive({
      name: "John Doe",
      books: [
        "Vue 2 - Advanced Guide",
        "Vue 3 - Basic Guide",
        "Vue 4 - The Mystery",
      ],
    });
    // 一个计算属性 ref
    const publishedBooksMessage = computed(() => {
      return author.books.length > 0 ? "Yes" : "No";
    });
    const bookList = ref([
      { author: "赵一", price: 100 },
      { author: "钱二", price: 200 },
      { author: "张三", price: 300 },
      { author: "李四", price: 400 },
      { author: "王五", price: 500 },
      { author: "马六", price: 600 },
    ]);
    const items = ref([{ message: "Foo" }, { message: "Bar" }]);
    const type = ref("A");
    const isRed = ref(true);
    const isActive = ref(true);
    const hasError = ref(false);
    const msg = ref();
    const awesome = ref(true);
    const ok = ref(true);
    const message = ref("我是data中定义的数据11");
    const handleColor = () => {
      isRed.value = !isRed.value;
    };
    const objectOfAttrs = reactive({
      name: "zhangsan",
      age: 25,
    });
    const handleChangeAge = () => {
      objectOfAttrs.age += 10;
    };
    const count = ref(0);

    function increment() {
      count.value++;
    }
    const classObject = reactive({
      objActive: true,
      "obj-text-danger": false,
    });
    const error = ref(null);
    const computedClassObject = computed(() => ({
      active: isActive.value && !error.value,
      "text-danger": error.value && error.value.type === "fatal",
    }));
    const activeClass = ref("active");
    const errorClass = ref("text-danger");
    const activeColor = ref("red");
    const fontSize = ref(30);
    const styleObject = reactive({
      color: "yellow",
      fontSize: "13px",
    });
    const computedStyleObject = computed(() => ({
      color: isActive.value ? "blue" : "red",
      fontSize: "23px",
    }));
    const myObject = reactive({
      title: "How to do lists in Vue",
      author: "Jane Doe",
      publishedAt: "2016-04-10",
    });

    const name = ref("Vue.js");
    function greet(event) {
      alert(`Hello ${name.value}!`);
      // `event` 是 DOM 原生事件
      if (event) {
        alert(event.target.tagName);
      }
    }

    function say(message) {
      alert(message);
    }
    // 双向数据绑定
    const text = ref();
    const modelText = ref();
    const picked = ref();
    const areatext = ref();
    const handleInput = (event) => {
      text.value = event.target.value;
    };
    const handleTextareaInput = (event) => {
      areatext.value = event.target.value;
    };
    const checkedNames = ref([]);
    const checked = ref(false);
    const selected = ref("A");
    const options = ref([
      { text: "One", value: "A" },
      { text: "Two", value: "B" },
      { text: "Three", value: "C" },
    ]);

    const el = ref(null);
    const customDiv = ref(null);
    // 必须和模板里的 ref 同名
    const input = ref(null);
    console.log("1-setup");
    // 生命周期钩子
    onMounted(() => {
      // 通过模板引用访问一个div
      console.log("el.value", el.value);
      console.log("customDiv.value", customDiv.value);
      console.log("1-onMounted");
      // input.value.focus();
    });
    watchEffect(() => {
      console.log("count发生了变化", count.value);
    });
    const question = ref("");
    const answer = ref("Questions usually contain a question mark. ;-)");
    // 可以直接侦听一个 ref
    watch(question, async (newQuestion, oldQuestion) => {
      if (newQuestion.indexOf("?") > -1) {
        answer.value = "Thinking...";
        try {
          const res = await fetch("https://yesno.wtf/api");
          answer.value = (await res.json()).answer;
        } catch (error) {
          answer.value = "Error! Could not reach the API. " + error;
        }
      }
    });

    // 侦听整个reactive对象
    const obj = reactive({ count: 0 });
    watch(obj, (obj) => {
      console.log(`count is: ${obj.count}`);
    });

    //侦听一个 getter 函数
    const x = ref(0);
    const y = ref(0);
    watch(
      () => x.value + y.value,
      (sum) => {
        console.log(`sum of x + y is: ${sum}`);
      }
    );
    return {
      input,
      el,
      customDiv,
      question,
      answer,
      options,
      selected,
      checked,
      checkedNames,
      text,
      picked,
      modelText,
      areatext,
      handleInput,
      handleTextareaInput,
      greet,
      say,
      bookList,
      author,
      publishedBooksMessage,
      type,
      count,
      msg,
      message,
      isRed,
      isActive,
      errorClass,
      activeClass,
      hasError,
      awesome,
      ok,
      myObject,
      items,
      activeColor,
      fontSize,
      classObject,
      computedClassObject,
      styleObject,
      computedStyleObject,
      objectOfAttrs,
      handleColor,
      handleChangeAge,
      increment,
    };
  },
  // 自定义指令
  directives: {},
};
