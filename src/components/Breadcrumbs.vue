<template>
  <nav class="breadcrumb">
    <RouterLink
      v-for="(b, i) in items"
      :key="i"
      :to="b.to"
      class="crumb"
      :class="{ active: !b.to }"
    >
      {{ b.label }}
      <span v-if="i < items.length - 1"> / </span>
    </RouterLink>
  </nav>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
})
</script>

<style scoped>
.crumb {
  color: #6b7280;
  text-decoration: none;
}
.crumb.active {
  font-weight: 600;
  color: #111827;
  pointer-events: none;
}
</style>
