<template>
  <transition name="fade">
    <div v-if="loading" class="global-loader" aria-hidden="false">
      <div class="spinner" aria-hidden="true" />
      <div class="label">Loading...</div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
import { useProductsStore } from '../stores/useProducts'

const store = useProductsStore()
const loading = computed(() => store.loading)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.global-loader {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(17, 24, 39, 0.45);
  z-index: 1000;
}

.spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 6px solid rgba(255, 255, 255, 0.15);
  border-top-color: #f97316;
  animation: spin 1s linear infinite;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.label {
  margin-top: 12px;
  color: #fff;
  font-weight: 600;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
