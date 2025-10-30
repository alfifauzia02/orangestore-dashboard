<template>
  <header class="topbar">
    <div class="topbar-inner">
      <h1 class="brand" @click="goHome">
        <span class="accent">Orange Store</span>
      </h1>

      <nav class="menu">
        <a class="menu-link" href="" @click.prevent="goCategory(`men's clothing`)">Men</a>
        <a class="menu-link" href="" @click.prevent="goCategory(`women's clothing`)">Women</a>
        <a class="menu-link" href="" @click.prevent="goCategory('jewelery')">Jewelry</a>
        <a class="menu-link" href="" @click.prevent="goCategory('electronics')">Electronic</a>
      </nav>

      <div style="display:flex;align-items:center;gap:12px;min-width:240px;">
        <SearchBar v-model="store.search" />
        <!-- <button class="icon-btn" @click="toggleTheme">
          <span v-if="theme.theme==='dark'">🌙</span>
          <span v-else>☀️</span>
        </button> -->
    </div>
    </div>
    <div v-if="store.loading"></div>
  </header>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useProductsStore } from '../stores/useProducts'
import { useThemeStore } from '../stores/useTheme'
import SearchBar from './SearchBar.vue'

const theme = useThemeStore()
const router = useRouter()
const store = useProductsStore()

const toggleTheme = () => {
  theme.toggle()
}

function goHome() {
  store.selectedCategory = ''
  store.search = ''
  store.page = 1
  router.push({ name: 'home' })
  store.fetchAll(true)
}

function goCategory(cat) {
  store.search = ''
  store.page = 1
  router.push({ name: 'category', params: { category: cat } })
  store.fetchByCategory(cat)
}
</script>

<style scoped>
.menu-link {
  color: #000000;
  text-decoration: none;
}
.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}
.topbar-inner {
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  padding: 12px 16px;
}
.brand {
  margin: 0;
  cursor: pointer;
  font-size: 1.1rem;
  white-space: nowrap;
}
.accent {
  color: #f97316;
  font-weight: 700;
  font-style: Bold;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0%;
}

.menu {
  display: none;
  gap: 16px;
  align-items: center;
}
.menu-link {
  color: #111827;
  text-decoration: none;
}
.menu-link.router-link-active {
  text-decoration: underline;
}

.searchbox {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 6px 10px;
  background: #fff;
}
.searchbox .icon {
  font-size: 14px;
  opacity: 0.7;
}
.input.bare {
  border: none;
  outline: none;
  padding: 0;
  width: 220px;
  background: transparent;
}

@media (min-width: 768px) {
  .menu {
    display: flex;
  }
  .input.bare {
    width: 280px;
  }
}
</style>
