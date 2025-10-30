<template>
  <section>
    <Breadcrumbs :items="breadcrumbs" />
    <ErrorBox :message="error" />
    <Loader v-if="loading" />

    <article v-else-if="product" class="detail-card">
      <div class="media">
        <img loading="lazy" decoding="async" :src="product.image" :alt="product.title" />
      </div>

      <div class="info">
        <div class="title">{{ product.title }}</div>
        <div class="meta">
          <div class="price">${{ product.price?.toFixed(2) }}</div>
          <div class="rating">
            <img src="/src/assets/rating_icon.svg" alt="star" class="rating-icon" />
            <span class="rating-value">{{ product.rating?.rate }}</span>
            <span>({{ product.rating?.count }})</span>
          </div>
        </div>
        <p class="desc">{{ product.description }}</p>
        <button class="btn-disabled">Sold out!</button>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../api/client'
import { useProductsStore } from '../stores/useProducts'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import Loader from '../components/Loader.vue'
import ErrorBox from '../components/ErrorBox.vue'

const route = useRoute()
const router = useRouter()
const store = useProductsStore()

const product = ref(null)
const loading = ref(false)
const error = ref('')

const categoryLabel = computed(() => {
  const c = product.value?.category
  if (!c) return ''
  if (c === "men's clothing") return "Men's"
  if (c === "women's clothing") return "Women's"
  if (c === 'jewelery') return 'Jewelry'
  if (c === 'electronics') return 'Electronics'
  return c.charAt(0).toUpperCase() + c.slice(1)
})

const breadcrumbs = computed(() => {
  console.log('product in breadcrumbs:', product.value)
  if (!product.value) return [{ label: 'Home', to: '/' }]

  return [
    { label: 'Home', to: '/' },
    {
      label: categoryLabel.value,
      to: { name: 'category', params: { category: product.value.category } },
    },
    { label: product.value.title, to: null },
  ]
})

async function fetchOne() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await api.get(`/products/${route.params.id}`)
    product.value = data
  } finally {
    loading.value = false
  }
}

onMounted(fetchOne)
watch(product, (p) => {
  if (p?.title) document.title = `${p.title} – Orange Store`
})

</script>

<style scoped>
.btn-disabled {
  width: 690px;
  height: 44px;
  gap: 8px;
  opacity: 1;
  padding: 12 24 12 24;
  border-radius: 12px;
  border-width: 1px;
  font-size: 16px;
  font-weight: 700;
  color: #6e6e6e;
  background-color: #cacdd2;
}
.detail-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
}

@media (min-width: 768px) {
  .detail-card {
    grid-template-columns: 1.1fr 1.4fr;
    align-items: start;
  }
}

.media {
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  display: grid;
  place-items: center;
  padding: 16px;
  min-height: 260px;
}
.media img {
  width: 100%;
  max-height: 420px;
  object-fit: contain;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.title {
  margin: 0;
  font-weight: 700;
  font-style: Bold;
  font-size: 28px;
  line-height: 100%;
  letter-spacing: 0%;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.link {
  cursor: pointer;
}
.link:hover {
  text-decoration: underline;
}

.price {
  color: #f97316;
  font-weight: 700;
  font-size: 28px;
  line-height: 100%;
  letter-spacing: 0%;
}

.rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
}

.rating-icon {
  width: 14px;
  height: 14px;
  vertical-align: middle;
}

.rating-value {
  font-weight: 700;
  font-style: Bold;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;
}

.desc {
  color: #6b7280;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;
}
</style>
