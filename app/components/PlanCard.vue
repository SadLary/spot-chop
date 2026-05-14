<template>
  <div
    :class="[
      'relative rounded-3xl p-5 cursor-pointer transition-all hover:scale-105',
      'w-[171px] h-[130px]',
      plan.color,
      plan.selected && 'ring-4 ring-[#1ed760]'
    ]"
    :aria-label="`${plan.name} - ${plan.period} - ${plan.price}`"
    @click="handleClick"
    role="button"
    tabindex="0"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
  >
  
    <img
      src="/spotify.png"
      alt="Spotify"
      class="w-[30px] h-[30px] mb-7"
      aria-hidden="true"
    />

    <div
      v-if="plan.selected"
      class="absolute top-3 right-3 bg-[#1ed760] text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full"
      aria-label="Выбрано"
    >
      Выбрано
    </div>

    
    <div class="space-y-0.5">
      <p class="text-xs text-gray-700">
        <span class="font-semibold">{{ plan.name }}</span> • <time>{{ plan.period }}</time>
      </p>
      <p class="text-xl font-bold text-black">{{ plan.price }}</p>
    </div>
  </div>
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

const props = defineProps<{
  plan: Plan
}>()

const emit = defineEmits<{
  select: [planId: number]
}>()

const handleClick = () => {
  emit('select', props.plan.id)
}
</script>