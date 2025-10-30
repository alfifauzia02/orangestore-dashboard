<template>
  <section>
    <Breadcrumbs :items="breadcrumbs" />
    <span
      style="
        font-weight: 700;
        font-style: Bold;
        font-size: 24px;
        line-height: 100%;
        letter-spacing: 0%;
      "
      >{{ formattedCategory }} Product</span
    >

    <div
      class="row"
      style="
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
        margin-top: 8px;
      "
    >
      <span
        style="
          font-weight: 400;
          font-style: Regular;
          font-size: 16px;
          line-height: 100%;
          letter-spacing: 0%;
        "
        >See all new in from {{ category }} product here</span
      >
    </div>

    <ErrorBox :message="store.error" />
    <Loader v-if="store.loading" />

    <div v-else class="grid sm-2 lg-4">
      <ProductCard v-for="p in store.paged" :key="p.id" :product="p" />
    </div>

    <div style="margin-top: 32px">
      <Pagination v-model="store.page" :total="store.totalPages" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '../stores/useProducts'
import ProductCard from '../components/ProductCard.vue'
import Pagination from '../components/Pagination.vue'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import Loader from '../components/Loader.vue'
import ErrorBox from '../components/ErrorBox.vue'

const store = useProductsStore()
const route = useRoute()
const category = computed(() => route.params.category)

onMounted(() => {
  store.fetchByCategory(category.value)
})

watch(
  () => category.value,
  val => {
    store.fetchByCategory(val)
  }
)

const formattedCategory = computed(() => {
  const currentCategory = category.value
  if (currentCategory === "men's clothing") return "Men's"
  if (currentCategory === "women's clothing") return "Women's"
  if (currentCategory === 'jewelery') return 'Jewelry'
  return currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)
})

const breadcrumbs = computed(() => [
  { label: 'Home', to: '/' },
  { label: formattedCategory, to: null },
])
</script>
