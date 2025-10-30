<template>
  <div v-if="message" class="card" style="border-color: #ef4444; background: #fff1f2">
    <div class="card-body" style="color: #b91c1c">
      {{ message }}
    </div>
  </div>
</template>
<script setup>
defineProps({ message: { type: String, default: '' } })
</script>
