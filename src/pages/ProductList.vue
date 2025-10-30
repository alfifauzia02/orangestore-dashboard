<template>
  <section>
    <div class="top-image">
      <img src="/src/assets/header.svg" alt="Header Image" class="top-image img" />
    </div>
    <div
      class="row"
      style="align-items: center; justify-content: space-between; margin-bottom: 12px"
    >
      <div class="row" style="flex: 1; min-width: 240px; align-items: center; gap: 8px">
        <span style="font-size: 24px; font-weight: 700;">{{ categoryLabel }}</span>
      </div>
      <div style="width: 220px">
        <CategoryFilter v-model="store.selectedCategory" :categories="store.categories" />
      </div>
    </div>

    <ErrorBox :message="store.error" />
    <Loader v-if="store.loading" />

    <div v-else class="grid sm-2 lg-4">
      <ProductCard v-for="p in store.paged" :key="p.id" :product="p" />
    </div>

    <div style="margin-top: 16px">
      <Pagination v-model="store.page" :total="store.totalPages" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useProductsStore } from '../stores/useProducts'
import ProductCard from '../components/ProductCard.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import Pagination from '../components/Pagination.vue'
import Loader from '../components/Loader.vue'
import ErrorBox from '../components/ErrorBox.vue'

const store = useProductsStore()

onMounted(() => {
  store.fetchAll()
})

const categoryLabel = computed(() => {
  const c = store.selectedCategory
  if (!c) return 'All Category'
  if (c === "men's clothing") return 'Men'
  if (c === "women's clothing") return 'Women'
  if (c === 'jewelery') return 'Jewelry'
  if (c === 'electronics') return 'Electronics'
  return c.charAt(0).toUpperCase() + c.slice(1)
})
</script>

<style scoped>
.top-image {
  text-align: center;
  margin-bottom: 16px;
}
.top-image img {
  display: block;
  width: 100%;
  height: auto;
}
</style>
