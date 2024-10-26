<template>
  <UContainer class="container">
    <div class="header">
      <h3>{{ recipe.nome }}</h3>
      <div class="icons">
        <UButton
          variant="link"
          icon="i-heroicons:eye"
          color="primary"
          @click="viewRecipe"
        />
        <UButton
          variant="link"
          icon="i-heroicons:pencil-square"
          color="primary"
          @click="onEdit"
        />
        <UButton
          variant="link"
          icon="i-heroicons:trash"
          color="primary"
          @click="onDelete"
        />
      </div>
    </div>
  </UContainer>
  <UModal
    v-model="showViewModal"
    title="Visualização da Receita"
    class="modal-center"
  >
    <UCard>
      <div class="recipe-view-details">
        <UDivider size="xl" />
        <div style="margin-bottom: 10px"></div>
        <UDivider
          size="xl"
          label="Receitas Challenge"
          :ui="{ label: 'text-primary-500 dark:text-primary-400' }"
        />
        <div style="margin-bottom: 10px"></div>
        <p><strong>Nome:</strong> {{ recipe.nome }}</p>
        <div style="margin-top: 10px"></div>
        <hr />
        <!-- <p><strong>Categoria:</strong> {{ recipe.categoria }}</p> -->

        <div style="margin-bottom: 10px"></div>
        <p>
          <strong>Tempo de Preparo:</strong>
          {{ recipe.tempo_preparo_minutos }} minutos
        </p>
        <div style="margin-top: 10px"></div>
        <hr />

        <div style="margin-bottom: 10px"></div>
        <p><strong>Porções:</strong> {{ recipe.porcoes }}</p>
        <div style="margin-top: 10px"></div>
        <hr />

        <div style="margin-bottom: 10px"></div>
        <p><strong>Ingredientes:</strong> {{ recipe.ingredientes }}</p>
        <div style="margin-top: 10px"></div>
        <hr />

        <div style="margin-bottom: 10px"></div>
        <p><strong>Modo de Preparo:</strong> {{ recipe.modo_preparo }}</p>
        <div style="margin-top: 10px"></div>
        <hr />
      </div>
      <div class="footer">
        <UButton color="primary" variant="outline" @click="onClose"
          >Fechar</UButton
        >
        <UButton color="primary" icon="i-heroicons:printer" @click="downloadPDF"
          >Imprimir</UButton
        >
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import type { Recipe } from '~/models/recipes'
import jsPDF from 'jspdf'
import { useRecipesStore } from '~/stores/recipesStore'
const recipesStore = useRecipesStore()
const showViewModal = ref(false) // Controla a exibição do modal de visualização

const props = defineProps<{
  recipe: Recipe
}>()

const emit = defineEmits<{
  (e: 'edit', recipe: Recipe): void
}>()

const toast = useToast()

// Função para abrir o modal de visualização da receita
const viewRecipe = () => {
  showViewModal.value = true
}

const onEdit = () => {
  emit('edit', props.recipe)
}

const onClose = () => {
  showViewModal.value = false
}

const onDelete = async () => {
  try {
    await recipesStore.deleteRecipe(props.recipe.id)
    toast.add({ title: 'Receita deletada' })
  } catch (error) {
    console.error('Erro ao deletar a receita:', error)
  }
}

const downloadPDF = () => {
  const element = document.querySelector('.recipe-view-details')
  if (!element) {
    console.error('Elemento não encontrado para gerar o PDF.')
    return
  }

  const pdf = new jsPDF('p', 'pt', 'a4')
  pdf.html(element as HTMLElement, {
    callback: (pdfInstance) => {
      pdfInstance.save(`${props.recipe.nome}.pdf`)
    },
    margin: [20, 20, 20, 20], // Margens do PDF
    autoPaging: 'text', // Paginação automática se o conteúdo exceder uma página
    x: 10,
    y: 10,
    width: 500, // Largura do conteúdo no PDF
    windowWidth: 800, // Largura da janela de renderização
  })
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.container {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 1em;
  max-height: 80px;
  overflow: hidden;
  position: relative;
}

.details {
  margin-top: 10px;
}

.recipe-view-details {
  padding: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.icons button {
  margin-left: 10px;
}

.modal-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
