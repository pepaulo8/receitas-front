<template>
  <Header />
  <div class="container">
    <div class="header">
      <h1>Minhas receitas</h1>

      <UButton
        icon="i-heroicons-book-open"
        @click="createRecipe"
        target="_blank"
      >
        Cadastrar receita
      </UButton>

      <UModal v-model="showModal" title="Cadastro de Receita">
        <UCard>
          <UForm :schema="schema" :state="form" @submit="onSubmit">
            <UFormGroup label="Nome" name="nome">
              <UInput v-model="form.nome" />
            </UFormGroup>

            <UFormGroup label="Categoria" name="categoria">
              <USelect
                v-model="form.id_categorias"
                :options="
                  categories.map((category) => ({
                    label: category.nome,
                    value: category.id,
                  }))
                "
              />
            </UFormGroup>

            <UFormGroup
              label="Tempo de Preparo (minutos)"
              name="tempo_preparo_minutos"
            >
              <UInput type="number" v-model="form.tempo_preparo_minutos" />
            </UFormGroup>

            <UFormGroup label="Porções" name="porcoes">
              <UInput type="number" v-model="form.porcoes" />
            </UFormGroup>

            <UFormGroup label="Ingredientes" name="ingredientes">
              <UTextarea v-model="form.ingredientes" />
            </UFormGroup>

            <UFormGroup label="Modo de Preparo" name="modo_preparo">
              <UTextarea v-model="form.modo_preparo" />
            </UFormGroup>
            <UButton type="submit">Salvar</UButton>
          </UForm>
        </UCard>
      </UModal>
      <div></div>
    </div>

    <SearchInput @updateSearch="fetchFilteredRecipes" />

    <div v-if="recipesStore.recipes.length === 0">
      <p>Nenhuma receita encontrada.</p>
    </div>

    <div class="recipe-list">
      <RecipeItem
        v-for="recipe in recipesStore.recipes"
        :key="recipe.id"
        :recipe="recipe"
        @edit="editRecipe"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { onMounted, ref } from 'vue'
import { number, object, string, type InferType } from 'yup'
import RecipeItem from '~/components/RecipeItem.vue'
import SearchInput from '~/components/SearchInput.vue'
import type { Recipe } from '~/models/recipes'
import { useAuthStore } from '~/stores/authStore'
import { useRecipesStore } from '~/stores/recipesStore'

type Schema = InferType<typeof schema>

const authStore = useAuthStore()
const recipesStore = useRecipesStore()
const showModal = ref(false)
const isEditing = ref(false)
const toast = useToast()
const selectedRecipeId = ref<number | null>(null)
const categories = ref<{ id: number; nome: string }[]>([])
const form = ref<Partial<Recipe>>({
  nome: '',
  id_categorias: 0,
  tempo_preparo_minutos: 0,
  porcoes: 0,
  ingredientes: '',
  modo_preparo: '',
})
const schema = object({
  nome: string().required('Nome é obrigatório'),
  id_categorias: number().required('Categoria é obrigatória'),
  tempo_preparo_minutos: number()
    .min(1, 'Tempo de preparo deve ser maior que zero')
    .required('Tempo de preparo é obrigatório'),
  ingredientes: string().required('Ingredientes são obrigatórios'),
  modo_preparo: string().required('Modo de preparo é obrigatório'),
})

onMounted(async () => {
  await recipesStore.fetchRecipes()

  try {
    const response = await api.get('/categories')
    if (!response) {
      throw new Error('Erro ao buscar categorias')
    }
    const data = await response.data
    categories.value = data.map((category: { id: number; nome: string }) => ({
      id: category.id,
      nome: category.nome,
    }))
  } catch (error) {
    console.error(error)
  }
})

const fetchFilteredRecipes = (filter: string) => {
  recipesStore.fetchRecipes(filter)
}

const createRecipe = () => {
  isEditing.value = false
  resetForm()
  showModal.value = true
}

const resetForm = () => {
  form.value = {
    nome: '',
    id_categorias: undefined,
    tempo_preparo_minutos: 0,
    porcoes: 0,
    ingredientes: '',
    modo_preparo: '',
  }
}

const editRecipe = (recipe: Recipe) => {
  selectedRecipeId.value = recipe.id
  isEditing.value = true
  form.value = {
    nome: recipe.nome,
    id_categorias: recipe.id_categorias,
    tempo_preparo_minutos: recipe.tempo_preparo_minutos,
    porcoes: recipe.porcoes,
    ingredientes: recipe.ingredientes,
    modo_preparo: recipe.modo_preparo,
  }
  showModal.value = true
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const payload = { ...event.data, id_usuarios: authStore.user?.id }
  try {
    if (isEditing.value && selectedRecipeId.value) {
      await recipesStore.updateRecipe(selectedRecipeId.value, payload)
      toast.add({ title: 'Receita atualizada' })
    } else {
      await recipesStore.createRecipe(payload)
      toast.add({ title: 'Receita cadastrada' })
    }
    showModal.value = false
  } catch (error) {
    console.error('Erro ao salvar receita:', error)
  }
}
</script>

<style scoped>
.modal-padding {
  padding: 20px;
  margin: 20px;
}
.container {
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.recipe-list {
  margin-top: 20px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

h1 {
  font-size: 24px;
  margin: 0;
}

p {
  text-align: center;
}
</style>
