<template>
  <div class="login-container">
    <img src="/logo.svg" alt="Logo" class="logo" />
    <h1>Receitas Challenge</h1>
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from '~/components/LoginForm.vue'
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 450px;
  margin: 0 auto;
  text-align: center;
}
.logo {
  width: 100px;
  margin-bottom: 20px;
}
</style>
