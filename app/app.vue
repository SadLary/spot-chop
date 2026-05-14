<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
 
<script setup lang="ts">
useHead({
  title: 'Spotify Подписки',
  htmlAttrs: {
    lang: 'ru'
  },
  meta: [
    { name: 'description', content: 'Выбор подписки Spotify' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>