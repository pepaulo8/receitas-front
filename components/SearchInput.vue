<template>
  <div class="search">
    <UInput
      v-model="searchText"
      size="lg"
      color="primary"
      icon="i-heroicons:magnifying-glass"
      placeholder="Pesquisar receita"
      type="text"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from 'lodash'

const searchText = ref('')
const emit = defineEmits(['updateSearch'])

const onInput = debounce(() => {
  emit('updateSearch', searchText.value)
}, 500)
</script>
