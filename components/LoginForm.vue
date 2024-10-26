<template>
  <div class="auth-container">
    <h1>{{ isRegistering ? 'Cadastrar-se' : 'Bem-vindo!' }}</h1>

    <form @submit.prevent="handleSubmit">
      <UField v-if="isRegistering" label="Nome" required>
        <UInput v-model="form.nome" placeholder="Digite seu nome" />
      </UField>

      <UField label="Login" required>
        <UInput v-model="form.login" placeholder="Digite seu login" />
      </UField>

      <UField label="Senha" required>
        <UInput
          v-model="form.senha"
          type="password"
          placeholder="Digite sua senha"
        />
      </UField>

      <UField v-if="isRegistering" label="Confirmação de Senha" required>
        <UInput
          v-model="form.confirmarSenha"
          type="password"
          placeholder="Confirme sua senha"
        />
      </UField>

      <div class="button-group">
        <UButton
          v-if="isRegistering"
          variant="outline"
          label="Cancelar"
          @click="toggleRegister"
        />
        <UButton type="submit" label="Cadastrar" v-if="isRegistering" />
        <UButton
          v-if="!isRegistering"
          variant="outline"
          label="Fazer cadastro"
          @click="toggleRegister"
        />
        <UButton type="submit" label="Entrar" v-if="!isRegistering" />
      </div>
    </form>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'
import api from '~/composables/api'
import * as yup from 'yup'

const form = ref({
  nome: '',
  login: '',
  senha: '',
  confirmarSenha: '',
})
const isRegistering = ref(false)
const errorMessage = ref('')

const { login } = useAuth()

const toggleRegister = () => {
  isRegistering.value = !isRegistering.value
  form.value = { nome: '', login: '', senha: '', confirmarSenha: '' }
  errorMessage.value = ''
}

const handleSubmit = async () => {
  const schema = isRegistering.value
    ? yup.object({
        nome: yup.string().required('Nome é obrigatório'),
        login: yup.string().required('Login é obrigatório'),
        senha: yup.string().required('Senha é obrigatória'),
        confirmarSenha: yup
          .string()
          .oneOf([yup.ref('senha')], 'As senhas devem coincidir')
          .required('Confirmação de senha é obrigatória'),
      })
    : yup.object({
        login: yup.string().required('Login é obrigatório'),
        senha: yup.string().required('Senha é obrigatória'),
      })

  try {
    await schema.validate(form.value)
    if (isRegistering.value) {
      await api.post('/users', {
        nome: form.value.nome,
        login: form.value.login,
        senha: form.value.senha,
      })
      await login(form.value.login, form.value.senha)
      toggleRegister()
    } else {
      await login(form.value.login, form.value.senha)
    }
  } catch (error: any) {
    errorMessage.value = error.errors ? error.errors[0] : 'Ocorreu um erro'
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
