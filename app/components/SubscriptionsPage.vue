<template>
  <main class="min-h-screen bg-[#1a1a1a] text-white p-6 md:p-8">
    <div class="max-w-[722px] mx-auto">

      <!-- Переключение между подписками и гифтами -->
      <div class="mb-8">
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :aria-selected="activeTab === tab.id"
            role="tab"
            :class="[
              'px-8 py-3 rounded-full text-[18px] font-medium transition-all',
              activeTab === tab.id
                ? 'bg-[#e8e8e8] text-black'
                : 'bg-[#2a2a2a] text-[#b3b3b3] hover:bg-[#333333]'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Фильтр по регионам -->
      <section class="mb-7" aria-label="Выбор региона">
        <div class="flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="region in availableRegions"
            :key="region.region_id"
            @click="goodsStore.setSelectedCountry(region.region_id)"
            :aria-label="`Выбрать регион ${region.name}`"
            :aria-pressed="goodsStore.selectedCountry === region.region_id"
            :class="[
              'flex items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0',
              'w-[138px] h-[44px]',
              goodsStore.selectedCountry === region.region_id
                ? 'bg-[#e8e8e8] text-black'
                : 'bg-[#2a2a2a] text-white hover:bg-[#333333]'
            ]"
          >
            <span class="flex items-center justify-center w-5 h-5">
            <img src="/flag.png" alt="" class="w-full h-full" aria-hidden="true" />
          </span>
          <span class="sr-only">{{ regionFlags[region.name] }}</span>
          <span :title="region.name">
            {{ region.name.length > 7 ? region.name.slice(0, 7) + '...' : region.name }}
          </span>
          </button>
        </div>
      </section>

      <!-- Продукты -->
      <div class="space-y-8" role="region" :aria-label="activeTab === 'subscriptions' ? 'Доступные подписки' : 'Доступные подарочные карты'">
        <SubscriptionSection
          v-for="category in categories"
          :key="category.id"
          :title="category.name"
          :plans="category.plans"
          :info-text="category.text_info"
          @select="selectPlan"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGoods } from '../composables/useGoods'

const { goodsStore, getPlansForCategory, getAvailableRegions } = useGoods()

const activeTab = ref('subscriptions')

const tabs = [
  { id: 'subscriptions', label: 'Подписки' },
  { id: 'giftcards', label: 'Подарочные карты' }
]

const regionFlags: Record<string, string> = {
  'Египет': '🇪🇬',
  'Индия': '🇮🇳',
  'Нигерия': '🇳🇬',
  'Нидерланды': '🇳🇱',
  'Бразилия': '🇧🇷'
}

const availableRegions = computed(() => {
  return getAvailableRegions()
})

const categories = computed(() => {
  const productType = activeTab.value === 'subscriptions' ? 'subscription' : 'gift_card'
  const cats = productType === 'subscription' 
    ? goodsStore.subscriptionCategories 
    : goodsStore.giftCardCategories
  return cats.map(category => ({
    ...category,
    plans: getPlansForCategory(category)
  }))
})

const selectPlan = (planId: number) => {
  goodsStore.selectPlan(planId)
}
</script>