import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import goodsMock from '../../shared/mocks/goods.mock'

export type GoodsStore = ReturnType<typeof useGoodsStore>

interface Plan {
  id: number
  icon: string
  price: string
  period: string
  name: string
  state: 'selected' | 'not_selected'
}

interface Category {
  id: number
  name: string
  text_info: string
  plans: Plan[]
}

interface Product {
  type: 'subscription' | 'gift_card'
  categories: Category[]
}

interface Region {
  region: string
  region_id: number
  products: Product[]
}

export const useGoodsStore = defineStore('goods', () => {
  // State
  const goods = ref<Region[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedCountry = ref<number>(123)

  // Computed
  const regions = computed(() => goods.value)

  const currentRegionData = computed(() => {
    return goods.value.find(r => r.region_id === selectedCountry.value)
  })

  const subscriptionCategories = computed(() => {
    const product = currentRegionData.value?.products.find(p => p.type === 'subscription')
    return product?.categories || []
  })

  const giftCardCategories = computed(() => {
    const product = currentRegionData.value?.products.find(p => p.type === 'gift_card')
    return product?.categories || []
  })

  // Actions
  const fetchGoods = async () => {
    loading.value = true
    error.value = null
    try {
      // Имитация async запроса
      goods.value = await Promise.resolve(goodsMock as unknown as Region[])
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load goods'
    } finally {
      loading.value = false
    }
  }

  const setSelectedCountry = (regionId: number) => {
    selectedCountry.value = regionId
  }

  const selectPlan = (planId: number) => {
    const products = currentRegionData.value?.products
    if (!products) return
    
    for (const product of products) {
      for (const category of product.categories) {
        for (const plan of category.plans) {
          plan.state = plan.id === planId ? 'selected' : 'not_selected'
        }
      }
    }
  }

  return {
    // State
    goods,
    loading,
    error,
    selectedCountry,
    
    // Computed
    regions,
    currentRegionData,
    subscriptionCategories,
    giftCardCategories,
    
    // Actions
    fetchGoods,
    setSelectedCountry,
    selectPlan
  }
})
