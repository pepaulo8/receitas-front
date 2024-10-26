<!-- layouts/default.vue -->
<template>
  <div>
    <NuxtPage />
    <UNotifications />

    <NuxtRouteAnnouncer />
  </div>
</template>

<script setup>
useHead({
  title: 'Receitas Challenge',
})
</script>
