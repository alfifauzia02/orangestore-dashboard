<template>
  <nav class="pagination" aria-label="Pagination">
    <button
      class="page-btn"
      :disabled="current <= 1"
      @click="go(current - 1)"
      aria-label="Previous page"
    >
      ‹
    </button>

    <template v-for="(p, i) in pagesToShow" :key="i">
      <button
        v-if="p !== 'dots'"
        class="page-btn"
        :class="{ active: p === current }"
        @click="go(p)"
        :aria-current="p === current ? 'page' : null"
      >
        {{ p }}
      </button>

      <span v-else class="dots">…</span>
    </template>

    <button
      class="page-btn"
      :disabled="current >= total"
      @click="go(current + 1)"
      aria-label="Next page"
    >
      ›
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, required: true },
  total: { type: Number, required: true },
})
const emit = defineEmits(['update:modelValue'])

const current = computed(() => props.modelValue)

function go(page) {
  if (page < 1) page = 1
  if (page > props.total) page = props.total
  if (page === props.modelValue) return
  emit('update:modelValue', page)
}

const pagesToShow = computed(() => {
  const total = props.total
  const cur = current.value
  const page = 2
  if (total <= 1) return [1]

  const pages = []

  pages.push(1)

  const left = Math.max(2, cur - page)
  const right = Math.min(total - 1, cur + page)

  if (left > 2) pages.push('dots')

  for (let i = left; i <= right; i++) pages.push(i)

  if (right < total - 1) pages.push('dots')

  if (total > 1) pages.push(total)

  return pages
})
</script>

<style scoped>
.pagination {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
}
.page-btn {
  min-width: 38px;
  height: 38px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #111827;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.page-btn[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
.page-btn.active {
  background: #f97316;
  color: #fff;
  border-color: #f97316;
}
.dots {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  color: #6b7280;
}

@media (max-width: 420px) {
  .page-btn {
    min-width: 32px;
    height: 32px;
  }
}
</style>
