# 项目概述

本项目是使用 npm create vite@latest 创建的最简洁 vite+js+vue3 项目。
旨在学习 vue3 setup 语法糖。

# 一、单文件组件

在组件基础里我们已经知道、在不使用构建工具时一个 vue 组件就是一个包含 Vue 特定选项的 JavaScript 对象。而在使用构建工具时一个 vue 组件就是一个单独的 .vue 文件。
一个 Vue 单文件组件 (SFC)，通常使用 \*.vue 作为文件扩展名，它是一种使用了类似 HTML 语法的自定义文件格式，用于定义 Vue 组件使得一个 Vue 组件的模板、逻辑与样式封装在单个文件中。一个 Vue 单文件组件在语法上是兼容 HTML 的。

每一个 \*.vue 文件都由三种顶层语言块构成：template>、script> 和 style>，以及一些其他的自定义块。

## 1.1 template 语言块

它是页面的 html 结构部分、每一个 .vue 文件最多有一个顶层的 template 块。
语块包裹的内容最终将会被提取、传递给 @vue/compiler-dom，预编译为 JavaScript 渲染函数，并附在导出的组件上作为其 render 选项。也就是会被编译器编译为渲染函数、而渲染函数最终返回的是虚拟 DOM。

## 1.2 script 语言块

它是页面的 js 行为部分、每一个 .vue 文件最多有一个。这里编写的脚本代码块将作为 ES 模块执行、它默认导出 vue 组件选项对象、也就是一个 JavaScript 对象。

## 1.2.1 script setup 语言块

它是 vue3.2 之后提供的一个在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖、每一个 .vue 文件最多包含一个。要启用需要在 script 代码块添加 setup attribute。这时在这个脚本块内编写的代码会被构建工具也就是 vite 预处理编译为组件的 setup() 钩子函数的内容、这也意味着每一个组件实例初始化时它都会执行。

## 1.3 style 语言块

它是页面的样式部分、每个 \*.vue 文件可以包含多个 style 标签。如果这个标签添加了 scoped 或 module attribute 则会封装当前组件的样式只对当前组件 template 语言块内的标签起作用。

## 1.4 自定义语言块

在一个 \*.vue 文件中可以为任何项目特定需求使用额外的自定义块。不过自定义块的处理需要依赖工具链。
具体可查看文档。

## 1.5 预处理器

lang attribute 可以在任意块上使用、代码块 script 中可以使用这个 attribute 来声明预处理语言，最常见就是在 script 中使用 TypeScript：lang="ts"。在样式块 style 中用来声明样式预处理器如：lang="scss"。模板块 template 中也是可以使用的如：lang="pug"。
需要注意的是：所使用的工具链不同配置也会有所不同、具体查看相应工具链文档即可。

# 二、setup 语法糖

在 vue3.2 之后 setup 语法糖、它是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。当同时使用 SFC 与组合式 API 时该语法是默认推荐。相比于普通的 script 语法，它具有更多优势：
更少的样板内容，更简洁的代码。
能够使用纯 TypeScript 声明 props 和自定义事件。
更好的运行时性能 (其模板会被编译成同一作用域内的渲染函数，避免了渲染上下文代理对象)。
更好的 IDE 类型推导性能 (减少了语言服务器从代码中抽取类型的工作)。

## 2.1 启用

要启用改语法、需要在 script 代码块上添加 setup attribute，这时在这里面编写的代码将会被编译成组件 setup() 函数的内容。这意味着与普通的 script> 只在组件被首次引入的时候执行一次不同，script setup> 中的代码会在每次组件实例被创建的时候执行。

## 2.2 好处

1. 顶层的绑定会直接暴露给模板使用

任何在 script setup 中声明的顶层的绑定声明(变量、函数)、以及 import 导入的内容都能直接在模板中使用。

2. 响应式声明

响应式状态需要明确使用相适应 API 来创建、而且 ref 在代码块中需要解包使用而在模板中时不需要，它会自动解包。

3. 使用组件等第三方 import 导入

在 setup 中使用 import 导入的第三方资源无论是变量、方法、类、组件等都可以直接在模板和代码块中直接使用。这时的导入应该理解为像是在引用一个变量。

如果要使用动态组件时应该使用 内置元素 component 同时使用动态的 :is 来绑定。

## 2.3 编译宏命令

vue3.2 setup 语法糖之后为了方便定义 props 和 emits，由 vue 官方提供的几个函数、它们都有特定的作用。它们都是只能在 script setup> 中使用的编译器宏。他们不需要导入，且会随着 script setup> 的处理过程一同被编译掉。

### 2.3.1 defineProps 宏

用来声明 props 的工具函数

### 2.3.2 defineEmits 宏

用来声明 emits 的工具函数

### 2.3.1 defineExpose 宏

使用 script setup> 的组件是默认关闭的——即通过模板引用或者 $parent 链获取到的组件的公开实例，不会暴露任何在 script setup> 中声明的绑定。可以通过 defineExpose 编译器宏来显式指定在 script setup> 组件中要暴露出去的属性，这样就可以通过组件实例访问到了。

# 三、组件深入

在组件的基础里我们只学习了组件的声明和注册使用，接下来学习其它知识点。

## 3.1 组件通信

所谓组件通信就是组件之间相互传值。最常见的就是父子组件之间的通信这也是 vue 组件学习里的关键。

### 3.1.1 父传子

#### 1. 概述

父组件向子组件传递数据就是父子组件通信、这时需要使用 props。Props 是一种特别的 attributes,它需要在子组件上显式声明它要接收的 props，声明的 props 就会自动暴露给模板。而当一个 prop 被注册后，父组件就可以像自定义 attribute 的形式传递数据给子组件。

在使用构建工具时、定义 props 需要使用 defineProps() 编译宏命令，它可以接受一个字符串数组、或者一个配置对象，返回一个包含了可以传递给组件的所有的 props 对象。在子组件中通过这个对象就可以访问到父组件传递的某个具体的 prop。

```
// BlogPost 组件上声明注册
数组: 不能指定值得类型和默认值以及校验，用的比较少。
const props = defineProps(['foo','bar'])
对象：一般使用的语法。
const props = defineProps({
prop 名: prop 值类型(预期类型的构造函数),
prop 名: {
type: prop 值类型,
required: true/false 是否必传,
default: 默认值,为对象或数组类型时为函数,
validator:callback 验证
}
foo: String,
bar: {
type: Number, // 显性声明
required: true
}
})

// 使用
<BlogPost foo="My journey with Vue" />

```

在不使用构建工具时，必须使用 props 选项的方式声明, props 对象会作为 setup()函数的第一个参数被传入这样也可以在 setup 中使用了。

无论哪种什么方式，两种声明方式背后其实使用的都是 prop 选项。
一个组件可以有任意多的 props，默认情况下，不指定类型时，所有 prop 都接受任意类型的值。
BlogPost :likes="42" /> 传递一个数字也要使用 v-bind 因为它不是一个字符串而是一个 JavaScript 表达式。
BlogPost :likes="post.likes" /> 根据对象的某个属性值动态传入。
BlogPost is-published />仅写上 prop 但不传值，会隐式转换为 true。

Prop 名字格式：如果一个 prop 的名字很长、要使用 camelCase 形式也就是小驼峰形式。而父组件在传值时为了和 HTML 的 attribute 对齐要将其变成 kebab-case 也就是短横线形式。

除了传递字符串这种静态值形式、也可以使用 v-bind 来传递动态 prop 值。

#### 2.单向数据流

所谓单向数据流表示所有的 props 都遵循单向绑定原则、props 由父组件向下传递，它因父组件的更新而变化自然地将新的状态向下流往子组件。而不会逆向传递。这是为了避免子组件意外地修改了父组件状态的情况，进而造成应用的数据流变得混乱而难以理解。简单说就是 props 只读、子组件只能访问而不能在子组件中修改。

和 vue2 一样的如果需要对 props 进行修改有两种场景：
1.prop 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性。在这种情况下，最好是新定义一个局部数据属性，从 props 上获取初始值即可。
const props = defineProps(['initialCounter'])
// 像下面这样做就使 prop 和后续更新无关了
const counter = ref(props.initialCounter)

2.需要对传入的 prop 值做进一步的转换。在这种情况中，最好是基于该 prop 值定义一个计算属性。
const props = defineProps(['size'])
// 该 prop 变更时计算属性也会自动更新
const normalizedSize = computed(() => props.size.trim().toLowerCase())

#### 3.prop 校验

Vue 组件是可以更细致地声明对传入的 props 的校验要求、需要提供一个带有 props 校验选项的对象。
要注意一点是：对象和数组的默认值必须从一个工厂函数返回，该函数接收组件所接收到的原始 prop 作为参数。
propD：{
// 类型
type: String,
// 是否必传
required: true
// 默认值
default: 100,
// 自定义类型校验函数
validator(value) {
// The value must match one of these strings
return ['success', 'warning', 'danger'].includes(value)
}
}
校验选项中的 type 可以是下列这些原生构造函数
String
Number
Boolean
Array
Object
Date
Function
Symbol
也可以是自定义的类或构造函数 Vue 将会通过 instanceof 来检查类型是否匹配。

一些细节：
所有 prop 默认都是可选的，除非声明了 required: true。
除 Boolean 外的未传递的可选 prop 将会有一个默认值 undefined。也就是说除了布尔类型外其它 prop 在父组件没传递时值为 undefined。而 Boolean 类型的未传递 prop 将被转换为 false。
如果声明了 default 默认值、那无论 prop 是未被传递还是显式指明未了 undefined，值都为 default 中声明的值。

### 3.1.2 子传父

子组件要传递数据给父组件需要使用到组件事件、也就是子组件自己声明要发射出去的事件名，父组件在使用子组件时监听。和原生 DOM 事件不一样，组件触发的事件是没有冒泡机制。你只能监听直接子组件触发的事件。平级组件或是跨越多层嵌套的组件间通信，应使用一个外部的事件总线，或是使用一个全局状态管理方案。

#### 3.1.2.1 声明

在使用构建工具时要显式地通过 defineEmits() 宏来声明它要触发的事件。
和 props 类似，它也可以接受一个字符串数组、一个对象。返回一个函数。
返回的函数接收两个参数，第一个参数时要发射事件的名称必填，第二个参数就是要传递给父组件的数据是一个对象，一版称为 payload 载荷对象。

```
// 数组：定义 emit
const emit = defineEmits(['inFocus', 'submit'])
function buttonClick() {
// 发射事件出去
emit('submit')
}
// 对象：可以添加验证
const emit = defineEmits({
  submit(payload) {
    // 通过返回值为 `true` 还是为 `false` 来判断
    // 验证是否通过
  }
})

// 父组件监听
MyButton @submit="handleSubmit" />
测试 事件处理函数会自动接收到事件所传递的参数
const handleSubmit = payload => {
  // payload 就是子组件传递出来的参数
}

```

没有使用构建工具时则需要通过 emits 选项来定义,它会暴露在 setup()第二个参数 上下文对象上。

#### 3.1.2.2 事件校验

和对 props 添加类型校验的方式类似，所有触发的事件也可以使用对象形式来描述。
这时事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 emit 的内容，返回一个布尔值来表明事件是否合法，也就是是否

```
const emit = defineEmits({
  // 没有校验
  click: null,
  // 校验 submit 事件 ,这里是解构了不然一般使用payload对象标识
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
```

## 3.2 组件 v-model

在学习 v-model 指令时我们知道、v-model 除了用在表单控件元素外还可以用在组件上实现双向绑定。
它本质是 v-bind 指令和 v-on 指令的语法糖，当用在组件上时 v-model 指令会被展开为如下的形式

```
<CustomInput v-model="searchText"/>
实际如下：
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>

<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

它就是将内部原生 <input> 元素的 value attribute 绑定到 modelValue prop
当原生的 input 事件触发时，触发一个携带了新值的 update:modelValue 自定义事件

另一种在组件内实现 v-model 的方式是使用一个可写的，同时具有 getter 和 setter 的 computed 属性。get 方法需返回 modelValue prop，而 set 方法需触发相应的事件。

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <input v-model="value" />
</template>

```

事实上上面是默认情况，v-model 在组件上都是使用 modelValue 作为 prop，并以 update:modelValue 作为对应的事件名。这时父组件在使用时 v-model 是不带参数的。但是如果希望不使用这个变量名、那么可以给 v-model 指定一个参数来更改这些名字。这时 v-model 就带上指定名称的参数即可。

```
子组件应声明一个 title prop，并通过触发 update:title 事件更新父组件值。
<MyComponent v-model:title="bookTitle" />
defineProps(['title'])
defineEmits(['update:title'])
```

## 3.3 组件透传 Attributes

### 3.3.1 概述

“透传 attribute”指的是传递给一个组件，却没有被该组件声明为 props 或 emits 的 attribute 或者 v-on 事件监听器。最常见的例子就是 class、style 和 id。
也就是说一个父组件使用了一个组件并传入了 诸如 id、class 等或其它自定义属性，子组件中却又没有在 props 和 emits 中声明定义，那它就是透传 attribute。

默认情况下当一个组件以单个元素作为根渲染时(单一根节点组件)、透传的 attribute 都会自动被添加到根元素上。而如果此时根元素上已经有了类或样式，它会和从父组件上继承的值合并(不同添加、相同覆盖)。

```
MyComponent class="large" />
这里，<MyComponent> 并没有将 class 声明为一个它所接受的 prop，所以 class 被视作透传 attribute，自动透传到了 <MyComponent> 的根元素上。

```

### 3.3.2 在模板中使用

透传进来的 attribute 可以在模板的表达式中直接用 $attrs 访问到，$attrs 是一个包含了组件所有透传 attributes 的对象。它又通常和 v-bind 指令结合使用 v-bind="$attrs" ，我们知道没有参数的 v-bind 会将一个对象的所有属性都作为 attribute 应用到目标元素上。这个写法常用来对第三方组件的再封装，这时就可以保留第三方组件所有可传递参数了。

不要需要注意的是透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 foo-bar 这样的一个 attribute 需要通过 $attrs['foo-bar'] 来访问。

### 3.3.3 在代码块中使用

在 script setup> 代码块中使用 attrs 的情况应该是相对来说较为罕见的，但是也可以实现。
使用 useAttrs() 辅助函数即可访问一个组件的所有透传 attribute。
import { useAttrs } from 'vue'
const attrs = useAttrs()

## 3.4 组件插槽

### 3.4.1 插槽定义

组件能够接收任意类型的 JavaScript 值作为 props、那如果组件要接收模板内容呢？也就是说在某些场景中，我们可能想要为子组件传递一些模板片段(html 内容)，让子组件在它们的组件中渲染这些片段。作用域插槽在需要同时封装逻辑、组合视图界面时还是很有用
举例说明：

```
这里有一个 <FancyButton> 组件，可以像这样使用
<FancyButton>
  Click me! <!-- 插槽内容 -->
</FancyButton>

而 <FancyButton> 的模板是这样的：
<button class="fancy-btn">
  <slot></slot> <!-- 插槽出口 -->
</button>

<slot> 元素是一个插槽出口 (slot outlet)，标示了父元素提供的插槽内容 (slot content) 将在哪里被渲染。

最终渲染出的 DOM 是这样。
<button class="fancy-btn">Click me!</button>
```

其实就是类似 HTML 标签中的内容、我们之前使用组件时是开始标签和结束标签之间是不传入内容的。
这些要传入的内容就是父元素提供的插槽内容(slot content)、这时子组件中要使用 slot 标签标识插槽出口，也就是插槽内容将在子组件的哪里被渲染出来。注意：插槽内容可以是任意合法的模板内容，不局限于文本,可以是元素的 HTML 元素、组件等等。

### 3.4.2 渲染作用域

插槽内容是可以访问到父组件的数据作用域，这是因为插槽内容本身是在父组件模板中定义的。
插槽内容无法访问子组件的数据。
也就是说父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域。

### 3.4.3 插槽默认内容

在外部没有提供任何插槽内容的情况下，是可以为插槽指定默认内容。
这时在 slot 标签内编写的内容就是默认内容，当父组件在使用子组件且没有提供任何插槽内容时将被渲染出来。而如果提供了插槽内容则会被取代替换掉。

```
 <slot>
    Submit <!-- 默认内容 -->
  </slot>
```

### 3.4.4 具名插槽

其实就是当一个组件中包含多个插槽出口时、通过给 slot 元素的 name 属性添加名字用来给各个插槽分配唯一的 ID 以确认每一处要渲染的内容。
这类带 name 属性的插槽被称为具名插槽 (named slots),没有提供 name 的 slot 出口会隐式地命名为“default”。所以默认写法其实也是具名插槽 name="default",只不过这时一般可省略不写。

1.使用
在父组件要为具名插槽传入插槽内容，我们需要使用一个含 v-slot 指令的 template 元素，并将目标插槽的名字作为指令参数传给该指令。因为 v-slot 指令也是比较常用的所以 vue 也提供了语法糖：v-slot 有对应的简写 #。当一个组件同时接收默认插槽和具名插槽时，所有位于顶级的非 template> 节点都被隐式地视为默认插槽的内容。

```
<BaseLayout>
  <template v-slot:header>
    <!-- 将这部分模板片段传入子组件的 header 插槽中 -->
  </template>
</BaseLayout>

// v-slot指令语法糖简写
<BaseLayout>
  <template #header>
    <!-- 将这部分模板片段传入子组件的 header 插槽中 -->
  </template>
</BaseLayout>

```

### 3.4.5 作用域插槽

从渲染作用域可以知道、插槽的内容是无法访问到子组件的状态的。但是在某些场景下插槽的内容可能想要同时使用父组件域内和子组件域内的数据。这时就需要一种方法来让子组件在渲染时将一部分数据提供给插槽。
这也就是插槽作用域，它的使用也很简单，像对组件传递 props 那样，向一个插槽的出口上传递 attributes，我们把这些 attributes 称之为 插槽 props(slot props)。
也就是在 slot 元素上直接声明 attribute 传递即可，这时父组件在使用 v-slot 指令时就可以接受一个值。这个值就是所有要传递插槽 props 组成的一个对象。也可以在 v-slot 中使用解构。

```
<!-- <MyComponent> 的模板 -->
const greetingMessage = ref('我是子组件中的内容')
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>

接收
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>

```

要注意的一点是：如果你同时使用了具名插槽与默认插槽，则需要为默认插槽使用显式的 template 标签。尝试直接为组件添加 v-slot 指令将导致编译错误。这是为了避免因默认插槽的 props 的作用域而困惑。

## 3.5 组件依赖注入

### 3.5.1 概述

在组件通信里我们知道一般父组件向子组件传递数据时会使用 props。但是如果要传递很多层时就会非常麻烦。
这种逐级传递的问题被称之为“prop 逐级透传”、vue 为此提供了解决方案也就是依赖注入。它也是组件通信的一种方法。
所谓依赖注入会用到 provide 和 inject 两个函数。
其中 provide()函数提供一个值、它可以被任意层级的后代组件注入。
inject()函数用来注入一个由祖先组件或者整个应用 (通过 app.provide()) 提供的值。
它的意思是说：一个父组件相对于其所有的后代组件，在使用 provide()提供一个值后就会作为依赖提供者。之后任何后代的组件树，无论层级有多深，都可以通过 inject()函数注入由父组件提供给整条链路的依赖。

### 3.5.2 Provide (提供)

要为组件后代提供数据，需要使用到 provide() 函数。
它接收两个参数：
第一个参数是注入名也就是要注入的 key，可以是一个字符串或者一个 symbol，后代组件就会用注入名来查找期望注入的值。
第二个参数是要注入的值，值可以是任意类型，包括响应式的状态。

一个组件可以多次调用 provide()，使用不同的注入名，注入不同的依赖值。
除了在一个组件中提供依赖，我们还可以在整个应用层面提供依赖也就是 vue 实例 app、常用在全局方法、属性上。

```
import { ref, provide } from 'vue'
// 提供静态值
provide('foo', '静态字符串值')

// 提供响应式的值
const count = ref(0)
provide('count', count)
```

### 3.5.3 Inject (注入)

要注入上层组件提供的数据，需使用 inject() 函数。
它也接收两个参数：
第一个参数是注入的 key，Vue 会遍历父组件链，通过匹配 key 来确定所提供的值。如果父组件链上多个组件对同一个 key 提供了值，那么离得更近的组件将会“覆盖”链上更远的组件所提供的值。也就是就近原则。
如果没有匹配到值返回 undefined 或者默认值如果提供了的话。
第二个参数是可选的，即在没有匹配到 key 时使用的默认值。
注意：如果提供的值是一个 ref，注入进来的会是该 ref 对象，而不会自动解包为其内部的值。

```
import { inject } from 'vue'
// 注入值的默认方式
const foo = inject('foo')

// 注入响应式的值
const count = inject('count')

// 通过 Symbol 类型的 key 注入
const foo2 = inject(fooSymbol)

// 注入一个值，若为空则使用提供的默认值
const bar = inject('foo', 'default value')

// 注入一个值，若为空则使用提供的工厂函数
const baz = inject('foo', () => new Map())

// 注入时为了表明提供的默认值是个函数，需要传入第三个参数
const fn = inject('function', () => {}, false)
```

### 3.5.4 最佳实践

1.当提供 / 注入响应式的数据时，建议尽可能将任何对响应式状态的变更都保持在供给方组件中。这样可以确保所提供状态的声明和变更操作都内聚在同一个组件内，使其更容易维护。
有的时候，我们可能需要在注入方组件中更改数据。在这种情况下，我们推荐在供给方组件内声明并提供一个更改数据的方法函数。也就是修改响应式状态的方法也依赖注入让后台组件调用即可。
如果你想确保提供的数据不能被注入方的组件更改，你可以使用 readonly() 来包装提供的值。

```
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>

<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>

<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
// 只读不能修改
provide('read-only-count', readonly(count))
</script>

```

2.使用 Symbol 作注入名，建议最好使用 Symbol 来作为注入名以避免潜在的冲突。
通常推荐在一个单独的文件中导出这些注入名 Symbol，保证不会重复。

```
// keys.js
export const myInjectionKey = Symbol()
// 在供给方组件中
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, { /*
  要提供的数据
*/ });
```

## 3.6 动态组件

有些场景会需要在两个组件间来回切换，比如 Tab 界面。这时可以通过 Vue 的特殊元素 component 元素和它特殊的 is attribute 来实现。组件间作切换时，被切换掉的组件会被卸载。如果需要保存切换组件的状态可以通过使用内置组件 keepAlive 强制被切换组件保持“存活”的状态。

```
<!-- currentTab 改变时组件也改变 -->
<component :is="tabs[currentTab]"></component>
const currentTab = ref('tab1')

const tabs = {
  tab1,
  tab2,
  ...
}

```

## 3.7 异步组件

暂时没用过

# 四、逻辑复用

我们知道页面复用通过组件实现、而如果功能逻辑上有复用可以通过：组合式函数(hooks)、自定义指令、插件三者实现。

## 4.1 组合式函数(hooks)

### 4.1.1 概述

在 Vue 应用的概念中，“组合式函数”(Composables) 就是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数。本质也是一个函数，只不过它利用了 vue3 的组合式 api。
比如：当构建前端应用时，我们常常需要复用公共任务的逻辑。例如为了在不同地方格式化时间，我们可能会抽取一个可复用的日期格式化函数。这个函数封装了无状态的逻辑：它在接收一些输入后立刻返回所期望的输出。和在组件中一样，你也可以在组合式函数中使用所有的组合式 API。一个组合式函数也可以调用一个或多个其他的组合式函数。这使得我们可以像使用多个组件组合成整个应用一样，用多个较小且逻辑独立的单元来组合形成复杂的逻辑。而这也是组合式 api 命名的由来。

### 4.1.2 示例

1. 一个鼠标追踪器示例，
   就是如果我们需要知道鼠标在页面的实时位置。在组件中使用组合式 API 实现鼠标跟踪功能它会是如下所示：

```
// mouse.vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

但是，如果我们想在多个组件中复用这个相同的逻辑呢？你可以每个需要的组件都引入一次即可。但是还有更好的方法就是把这个逻辑以一个组合式函数的形式提取到外部文件中 mouse.js 中，然后需要的组件只需要导入这个组合式函数并运行即可得到鼠标在页面的实时位置信息。

```
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // 通过返回值暴露所管理的状态
  return { x, y }
}

// 下面是它在组件中使用的方式：
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>

一个组合式函数是可以调用一个或多个其他的组合式函数。例如上面添加和清除 DOM 事件监听器的逻辑也封装进一个组合式函数中


```

2. 一个异步状态示例

上面的组合式函数没有接收任何参数、但实际上组合式函数也是可以接收任意多个参数的。
在做异步数据请求时，我们常常需要处理不同的状态：加载中、加载成功和加载失败。

```
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    Data loaded:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>

```

如果在每个需要获取数据的组件中都要重复这种模式，那就太繁琐了。让我们把它抽取成一个组合式函数。

```
// fetch.js
import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    // 在请求之前重设状态...
    data.value = null
    error.value = null
    // unref() 解包可能为 ref 的值
    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  if (isRef(url)) {
    // 若输入的 URL 是一个 ref，那么启动一个响应式的请求
    watchEffect(doFetch)
  } else {
    // 否则只请求一次
    // 避免监听器的额外开销
    doFetch()
  }

  return { data, error }
}
```

### 4.1.3 最佳实践

从示例可以看出组合式函数本质就是一个函数、只不过使用了 vue3 的组合是 api。
命名：同时组合式函数约定使用大驼峰命名法，并以“use” 作为开头，它也被称之为 hooks。
传参：组合式函数是可以接收 ref 参数的，不过要处理好输入参数时兼容 ref 而不只是原始的值。这时 unref() 工具函数会对此非常有帮助。如果参数是 ref，则返回内部值(也就是 val.value)，否则直接返回参数本身。
返回值：推荐的约定是组合式函数始终返回一个包含多个 ref 的普通的非响应式对象，这样该对象在组件中被解构为 ref 之后仍可以保持响应性。如下：解构出来是 ref
// x 和 y 是两个 ref
const { x, y } = useXXXX()
副作用：在组合式函数中的确可以执行副作用 (例如：添加 DOM 事件监听器或者请求数据)，但是要确保在 组件 onUnmounted() 时清理副作用。
组件使用：组合式函数只能在 script setup> 或 setup() 钩子中，且应始终被同步地调用。

## 4.2 自定义指令

### 4.2.1 概述

在学习 vue 模板语法时我们就知道，除了 vue 内置的一系列指令之外，Vue 还允许你注册自定义的指令 (Custom Directives)。
到这里我们已经学习了两种在 vue 中重用代码的方式、组件和组合式函数。组件时页面的主要用来构建模块，而组合式函数则侧重于有状态的逻辑。而现在要学的自定义指令主要是为了重用涉及普通元素的底层 DOM 访问的逻辑。
一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数。同时对于自定义指令来说，一个很常见的情况是仅仅需要在 mounted 和 updated 上实现相同的行为，除此之外并不需要其他钩子。

### 4.2.2 语法

由概述可以知道、一个自定义指令其实就是一个 JavaScript 对象。这个对象里有一些类似组件生命周期的钩子函数(都是可选的)。
这些钩子函数能自动接收到自定义指令所绑定的元素对象。具体如下：

```
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```

指令的钩子都可以传递以下 4 种参数:
el：指令绑定到的元素。这可以用于直接操作 DOM。
binding：一个对象，包含以下属性。
value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
instance：使用该指令的组件实例。
dir：指令的定义对象。

vnode：代表绑定元素的底层 VNode。

prevNode：之前的渲染中代表指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。

### 4.2.3 实践

将一个自定义指令全局注册到应用层级也是一种常见的做法所以我们主要学习全局的。
例如：
// 使 v-focus 在所有组件中都可用
app.directive('focus', {
/_ ... _/
})

## 4.3 插件

### 4.3.1 概述

插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码。
要使用 app.use() 注册。
一个插件可以是一个拥有 install() 方法的对象，也可以直接是一个安装函数本身。安装函数会接收到安装它的应用实例和传递给 app.use() 的额外选项作为参数
插件没有严格定义的使用范围，但是插件发挥作用的常见场景主要包括以下几种：

    通过 app.component() 和 app.directive() 注册一到多个全局组件或自定义指令。

    通过 app.provide() 使一个资源可被注入进整个应用。

    向 app.config.globalProperties 中添加一些全局实例属性或方法

    一个可能上述三种都包含了的功能库 (例如 vue-router)。

```
const myPlugin = {
  install(app, options) {
    // 配置此应用
  }
}
```

### 4.3.2 实践

写一个简单的 i18n (国际化 (Internationalization) 的缩写) 插件。
在一个单独的文件中创建并导出一个拥有 install() 方法的插件对象，以保证更好地管理逻辑。
我们希望有一个翻译函数，这个函数接收一个以 . 作为分隔符的 key 字符串，用来在用户提供的翻译字典中查找对应语言的文本。期望的使用方式如下：
这个函数应当能够在任意模板中被全局调用。这一点可以通过在插件中将它添加到 app.config.globalProperties 上来实现

```
<h1>{{ $translate('greetings.hello') }}</h1>
// plugins/i18n.js
export default {
 install: (app, options) => {
    // 注入一个全局可用的 $translate() 方法
    app.config.globalProperties.$translate = (key) => {
      // 获取 `options` 对象的深层属性
      // 使用 `key` 作为索引
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}

```

# 五、内置组件

除了内置指令还有内置组件，它们都是由 vue 原生提供的有特定作用的组件。

## 5.1 KeepAlive 内置组件

KeepAlive 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。
这个我们在动态组件时有学习过，默认情况下，一个组件实例在被替换掉后会被销毁，这会导致它丢失其中所有已变化的状态——当这个组件再一次被显示时，会创建一个只带有初始状态的新实例。如果希望保留被切换组件的状态就要使用 KeepAlive 组件包裹 component 元素。

KeepAlive 组件默认会缓存内部的所有组件实例，但我们可以通过 include 和 exclude prop 来定制该行为。这两个 prop 的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组。它会根据组件的 name 选项进行匹配，所以组件如果想要条件性地被 KeepAlive 缓存，就必须显式声明一个 name 选项。

也可以通过传入 max prop 来限制可被缓存的最大组件实例数，如果缓存的实例数量即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间。

## 5.2 过渡效果和动画内置组件

Vue 提供了两个内置组件，可以帮助你制作基于状态变化的过渡和动画：
Transition 会在一个元素或组件进入和离开 DOM 时应用动画。
TransitionGroup 会在一个 v-for 列表中的元素或组件被插入，移动，或移除时应用动画。

### 5.2.1 Transition 组件

它是一个内置组件，这意味着它在任意别的组件中都可以直接被使用，无需注册。
它可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上。进入或离开可以由以下的条件之一触发：
由 v-if 所触发的切换
由 v-show 所触发的切换
由特殊元素 component 切换的动态组件
改变特殊的 key 属性
Transition 组件仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素。

```
<Transition name="slide-fade">
  <p v-if="show">hello</p>
</Transition>
```

### 5.2.2 TransitionGroup 组件

它是一个内置组件，用于对 v-for 列表中的元素或组件的插入、移除和顺序改变添加动画效果。
渲染的是一组元素。用法和 Transition 组件类似。

# 六、总结

到此 vue 组件的知识大部分已经学习，剩下的就是融会贯通。
但很明显我们现在的项目其实还是非常简单的很多功能都没有。
而 vue 框架渐进式的特点这时候就体现出来了，我们可以根据实际需要把应用的规模不断扩大。


