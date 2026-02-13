import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import betterTailwind from 'eslint-plugin-better-tailwindcss'

export default tseslint.config(
  { ignores: ['dist', '.yarn/releases'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: './src/styles/index.css',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'better-tailwindcss': betterTailwind,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...betterTailwind.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': ['warn'],
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
    },
  },
)
