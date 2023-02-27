<template>
  <div class="model-content">
    父子组件双向绑定的传值
    <div>{{ id }}</div>
    <div>{{ age }}</div>
    <div>{{ name }}</div>
    <el-input v-model="value"></el-input>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style lang="scss" scoped>
.model-content {
  border: 1px solid seagreen;
  width: 200px;
  height: 200px;
}
</style>
