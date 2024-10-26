<template>
  <header class="header">
    <div class="header-left">
      <img src="/logo.svg" alt="Logo Receitas" class="logo" />
      <span>Receitas Challenge</span>
    </div>
    <div class="header-right">
      <UDropdown
        :items="dropdownItems"
        mode="click"
        :popper="{ placement: 'bottom-end' }"
      >
        <UButton circle>{{ authStore.getUser().login }}</UButton>
      </UDropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  authStore.clearAuth()
  router.push('/login')
}

const dropdownItems = [
  [
    {
      label: 'Sair da conta',
      click: logout,
    },
  ],
]
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f8f9fa;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.logo {
  width: 32px;
  height: auto;
}
</style>
