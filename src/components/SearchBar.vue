<template>
  <div class="search-bar">
    <img src="/src/assets/search_icon.svg" alt="search" class="search-icon" />
    <input
      class="input"
      type="search"
      :value="modelValue"
      placeholder="Cari di Orange Store"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({ modelValue: { type: String, default: '' } })
defineEmits(['update:modelValue'])
</script>

<style scoped>
.search-bar {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  pointer-events: none;
  opacity: 0.5;
}

.input {
  width: 100%;
  padding: 8px 12px 8px 40px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s;
}

.input:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.1);
}

.input::placeholder {
  color: #9CA3AF;
}
</style>
