<template>
  <select class="select" :value="modelValue" @change="onChange($event)">
    <option value="">All categories</option>
    <option v-for="c in categories" :key="c" :value="c">
      {{ c }}
    </option>
  </select>
</template>

<script setup>
import { useProductsStore } from '../stores/useProducts'

const props = defineProps({
  modelValue: { type: String, default: '' },
  categories: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue'])
const store = useProductsStore()

async function onChange(e) {
  const value = e.target.value
  emit('update:modelValue', value)
  store.page = 1
  store.search = ''
  store.selectedCategory = value

  if (!value) {
    await store.fetchAll(true)
  } else {
    await store.fetchByCategory(value)
  }
}
</script>
