<template>
  <section class="mb-7" :aria-label="title">
    <!-- Section Header -->
    <div class="flex items-center gap-2 mb-[14px]">
      <h2 class="text-[22px] font-bold">{{ title }}</h2>
      <button 
        class="w-6 h-6 rounded-full bg-[#4a4a4a] flex items-center justify-center text-sm hover:bg-[#5a5a5a] transition-colors"
        :aria-label="`Информация о ${title}`"
        :title="infoText || 'Дополнительная информация'"
      >
        <span class="text-white">?</span>
      </button>
    </div>

    <div v-if="infoText" class="mb-[14px]">
      <p class="text-[#1ed760] text-sm">{{ infoText }}</p>
    </div>

    <ul class="flex flex-wrap gap-3 list-none p-0" :aria-label="`Доступные планы для ${title}`">
      <li 
        v-for="plan in plans"
        :key="plan.id"
      >
        <PlanCard :plan="plan" @select="$emit('select', $event)" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
interface Plan {
  id: number
  icon: string
  price: string
  period: string
  name: string
  color: string
  selected: boolean
}

defineProps<{
  title: string
  infoText?: string
  plans: Plan[]
}>()

defineEmits<{
  select: [planId: number]
}>()
</script>