// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
const ProductList = () => import('../pages/ProductList.vue')
const ProductDetail = () => import('../pages/ProductDetail.vue')
const CategoryPage = () => import('../pages/CategoryPage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: ProductList, meta: { title: 'Orange Store – Home' } },
    { path: '/product/:id', name: 'product-detail', component: ProductDetail, meta: { title: 'Product Detail' } },
    { path: '/category/:category', name: 'category', component: CategoryPage, meta: { title: 'Category' } },
  ],
  scrollBehavior(){ return { top: 0 } }
})

router.afterEach((to) => {
  const base = 'Orange Store'
  document.title = to.meta?.title ? `${to.meta.title}` : base
})

export default router
