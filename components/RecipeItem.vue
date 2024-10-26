<template>
  <div class="recipe-item">
    <div class="header">
      <h3>{{ recipe.nome }}</h3>
      <div class="icons">
        <UButton icon="i-heroicons:printer" color="gray" @click="onPrint" />
        <UButton
          icon="i-heroicons:pencil-square"
          color="gray"
          @click="onEdit"
        />
        <UButton icon="i-heroicons:trash" color="gray" @click="onDelete" />
      </div>
    </div>
    <div class="details">
      <p>Tempo de preparo: {{ recipe.tempo_preparo_minutos }}</p>
      <p>Ingredientes: {{ recipe.ingredientes }}</p>
      <p>Modo de preparo: {{ recipe.modo_preparo }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '~/models/recipes'
import { useRecipesStore } from '~/stores/recipesStore'
const recipesStore = useRecipesStore()

const props = defineProps<{
  recipe: Recipe
}>()

const emit = defineEmits<{
  (e: 'edit', recipe: Recipe): void
}>()

const toast = useToast()

const onPrint = () => {
  console.log('Imprimir receita')
}

const onEdit = () => {
  emit('edit', props.recipe)
}

const onDelete = async () => {
  try {
    await recipesStore.deleteRecipe(props.recipe.id)
    toast.add({ title: 'Receita deletada' })
  } catch (error) {
    console.error('Erro ao deletar a receita:', error)
  }
}
</script>

<style scoped>
.recipe-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 1em;
  max-height: 100px;
  overflow: hidden;
  position: relative;
}

.recipe-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to bottom, transparent, white);
}

.header {
  display: flex;
  justify-content: space-between;
}

.details {
  margin-top: 10px;
}

.icons button {
  margin-left: 10px;
}
</style>
