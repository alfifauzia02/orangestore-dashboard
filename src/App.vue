<template>
  <div class="layout">
    <Topbar />
    <GlobalLoader />

    <main class="main">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-left">
        <small>© 2025 Orange Store. All rights reserved.</small>
      </div>
      <div class="footer-right">
        <small><a href="#" class="footer-link">Privacy Policy</a></small>
        <small><a href="#" class="footer-link">Terms of Service</a></small>
        <small><a href="#" class="footer-link">Contact Us</a></small>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Topbar from './components/Topbar.vue'
import GlobalLoader from './components/GlobalLoader.vue'
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 10;
}
.brand {
  cursor: pointer;
  margin: 0;
  font-size: 24px;
  color: #ff7a00;
  font-weight: 700;
}
.nav a {
  margin-left: 12px;
}
.main {
  padding: 16px;
  min-height: calc(100vh - 120px);
}
.footer {
  padding: 16px 120px;
  border-top: 1px solid #3c3c3c;
  color: #ffffff;
  background: #2c2c2c;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-right {
  display: flex;
  gap: 24px;
}

.footer-link {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #f97316;
}
</style>
