import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { api } from '../api/client'

let searchTimer

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref('')

  const search = ref('')
  const selectedCategory = ref('')
  const page = ref(1)
  const pageSize = ref(8)

  const effectiveSearch = ref('')
  watch(search, val => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      effectiveSearch.value = val.trim().toLowerCase()
      page.value = 1
    }, 250)
  })

  const filtered = computed(() => {
    let list = products.value
    if (selectedCategory.value) list = list.filter(p => p.category === selectedCategory.value)
    if (effectiveSearch.value) {
      list = list.filter(p => p.title.toLowerCase().includes(effectiveSearch.value))
    }
    return list
  })

  const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize.value)))
  const paged = computed(() =>
    filtered.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
  )

  async function fetchAll(force = false) {
    const cacheKey = 'products_cache_v1'
    const catsKey = 'categories_cache_v1'
    const tsKey = 'products_cache_ts'
    const TTL_MS = 20 * 60 * 1000

    if (!force) {
      const ts = Number(localStorage.getItem(tsKey) || 0)
      const fresh = Date.now() - ts < TTL_MS
      const cached = localStorage.getItem(cacheKey)
      const cachedCats = localStorage.getItem(catsKey)
      if (fresh && cached && cachedCats) {
        products.value = JSON.parse(cached)
        categories.value = JSON.parse(cachedCats)
        selectedCategory.value = ''
        return
      }
    }

    loading.value = true
    error.value = ''
    try {
      const [{ data: all }, { data: cats }] = await Promise.all([
        api.get('/products'),
        api.get('/products/categories'),
      ])
      products.value = all
      categories.value = cats
      selectedCategory.value = ''
      localStorage.setItem(cacheKey, JSON.stringify(all))
      localStorage.setItem(catsKey, JSON.stringify(cats))
      localStorage.setItem(tsKey, String(Date.now()))
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchByCategory(category) {
    loading.value = true
    error.value = ''
    try {
      const [{ data: list }, { data: cats }] = await Promise.all([
        api.get(`/products/category/${encodeURIComponent(category)}`),
        api.get('/products/categories'),
      ])
      products.value = list
      categories.value = cats
      selectedCategory.value = category
      page.value = 1
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    categories,
    loading,
    error,
    search,
    selectedCategory,
    page,
    pageSize,
    effectiveSearch,
    filtered,
    paged,
    totalPages,
    fetchAll,
    fetchByCategory,
  }
})
