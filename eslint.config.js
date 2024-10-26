import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // Regras de indentação e formatação
      indent: ['error', 2], // Define 2 espaços de indentação
      quotes: ['error', 'single'], // Define aspas simples
      semi: ['error', 'always'], // Define ponto e vírgula ao final das instruções
      'comma-dangle': ['error', 'always-multiline'], // Vírgula final em arrays/objetos multiline
    },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'vue/html-indent': ['error', 2], // Indentação de 2 espaços em templates Vue
      'vue/multi-word-component-names': 'off', // Permite nomes de componentes de uma palavra
    },
  },
]
k
