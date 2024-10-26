<template>
  <div class="recipe-card">
    <h2>Detalhes da Receita</h2>
    <UButton color="primary" @click="downloadPDF">Imprimir</UButton>
    <UCard>
      <div class="recipe-details">
        <p><strong>Nome:</strong> {{ recipe.nome }}</p>
        <p><strong>Categoria:</strong> {{ recipe.categoria }}</p>
        <p>
          <strong>Tempo de Preparo:</strong> {{ recipe.tempoPreparo }} minutos
        </p>
        <p><strong>Porções:</strong> {{ recipe.porcoes }}</p>
        <p><strong>Ingredientes:</strong> {{ recipe.ingredientes }}</p>
        <p><strong>Modo de Preparo:</strong> {{ recipe.modoPreparo }}</p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import jsPDF from 'jspdf'

const recipe = ref({
  nome: 'Bolo de Chocolate',
  categoria: 'Sobremesa',
  tempoPreparo: 60,
  porcoes: 8,
  ingredientes: 'Farinha, açúcar, chocolate, ovos, manteiga',
  modoPreparo: 'Misture os ingredientes e asse em forno médio por 40 minutos.',
})

const downloadPDF = () => {
  const element = document.querySelector('.recipe-card')
  if (!element) {
    console.error('Elemento não encontrado para gerar o PDF.')
    return
  }

  const pdf = new jsPDF('p', 'pt', 'a4')
  pdf.html(element as HTMLElement, {
    callback: (pdfInstance) => {
      pdfInstance.save('receita.pdf')
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
.recipe-card {
  max-width: 600px;
  margin: 0 auto;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
