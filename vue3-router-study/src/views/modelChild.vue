<template>
  <div class="model-content">
    父子组件双向绑定的传值
    <div>{{ id }}</div>
    <div>{{ age }}</div>
    <div>{{ name }}</div>
    <el-input v-model="value"></el-input>
    <br />
    <div>下面是依赖注入的值</div>
    <div>其它注入的数据: {{ location }}</div>
  </div>
</template>

<script setup lang="ts">
import emitter from '@/utils/eventBus'
emitter.emit('sayHi', 'Hello')
const hello = ref('中央事件总线传值1111111')
emitter.emit('hello', hello)
interface Props {
  id?: number
  age?: number
  name?: string
  modelValue?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const location = inject('location')
</script>

<style lang="scss" scoped>
.model-content {
  border: 1px solid seagreen;
  width: 200px;
  height: 200px;
}
</style>
