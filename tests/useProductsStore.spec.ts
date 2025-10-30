import { setActivePinia, createPinia } from 'pinia'
import { useProductsStore } from '../src/stores/useProducts'
import { vi } from 'vitest'

// mock client axios
vi.mock('../src/api/client', () => ({
  api: {
    get: vi.fn((url:string) => {
      if (url === '/products') return Promise.resolve({ data: [{ id:1, title:'A', category:'electronics', price: 1, rating:{ rate:4, count:10 }, image:'' }] })
      if (url === '/products/categories') return Promise.resolve({ data: ['electronics'] })
      if (url.startsWith('/products/category/')) return Promise.resolve({ data: [] })
      return Promise.resolve({ data: {} })
    })
  }
}))

describe('useProductsStore', () => {
  beforeEach(() => { setActivePinia(createPinia()) })

  it('fetchAll fills products and categories', async () => {
    const store = useProductsStore()
    await store.fetchAll(true)
    expect(store.products.length).toBe(1)
    expect(store.categories).toEqual(['electronics'])
    expect(store.selectedCategory).toBe('')
  })

  it('filters by search (debounced effectiveSearch)', async () => {
    const store = useProductsStore()
    await store.fetchAll(true)
    store.search = 'a'
    await new Promise(r => setTimeout(r, 260)) 
    expect(store.filtered.length).toBe(1)
  })
})
