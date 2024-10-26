
import { defineStore } from 'pinia';
import api from '~/composables/api';
import type { Recipe } from '~/models/recipes';

export const useRecipesStore = defineStore('recipes', {
  state: () => ({
    recipes: [] as Recipe[], 
  }),
  actions: {
    async fetchRecipes(filter = '') {
      const url = filter ? `/recipes?filter=${filter}` : '/recipes'
      const response = await api.get(url)
      this.recipes = response.data; 
    },
    async deleteRecipe(id: number) {
      await api.delete(`/recipes/${id}`);
      await this.fetchRecipes(); 
    },
    async updateRecipe(id: number, updatedData: any) {
      await api.patch(`/recipes/${id}`, updatedData);
      await this.fetchRecipes(); 
    },
    async createRecipe(createdData: any) {
      await api.post('/recipes', createdData);
      await this.fetchRecipes(); 
    },
  },
});
