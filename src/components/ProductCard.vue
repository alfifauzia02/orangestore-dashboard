<template>
  <article class="product-card">
    <img
      loading="lazy"
      decoding="async"
      :src="product.image"
      :alt="product.title"
      class="thumb"
      @click="$router.push({ name: 'product-detail', params: { id: product.id } })"
    />

    <div class="card-body">
      <div class="info-top">
        <span>{{ formattedCategory }}</span>
        <span class="rating">
          <img src="/src/assets/rating_icon.svg" alt="star" class="rating-icon" />
          <span class="rating-value">{{ product.rating?.rate }}</span>
          <span>({{ product.rating?.count }})</span>
        </span>
      </div>

      <div class="info-title">
        <span class="title" :title="product.title">{{ product.title }}</span>
      </div>

      <div class="info-bottom">
        <span class="price">${{ product.price.toFixed(2) }}</span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ product: { type: Object, required: true } })

const formattedCategory = computed(() => {
  const category = props.product.category
  if (category === "men's clothing") return 'Men'
  if (category === "women's clothing") return 'Women'
  if (category === 'jewelery') return 'Jewelry'
  return category.charAt(0).toUpperCase() + category.slice(1)
})
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  width: 282px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.thumb {
  width: 100%;
  height: 200px;
  object-fit: contain;
  background: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
  border-radius: 12px 12px 0 0;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 12px;
}

.info-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: 16px;
}

.info-title {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 6px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.info-bottom {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}

.price {
  font-weight: 600;
  font-size: 16px;
  color: #111827;
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
  font-weight: 600;
}
</style>
