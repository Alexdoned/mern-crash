import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react' //  Added missing React plugin
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,    // Added React recommended rules
      react.configs.flat['jsx-runtime'], //  Recommended for modern React
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      //  Turn off prop-types here
      'react/prop-types': 'off', 
    },
  },
])
